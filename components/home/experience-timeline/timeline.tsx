import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useOneTimeAnimation } from '@/hooks/use-one-time-animations';
import FloatingParticles from './floating-particles';
import { Experience } from '@/lib/schemas/experience-schemas';
import { getFormattedDate } from '@/lib/helpers/daytime';
import GridBackground from './grid-background';
import ExperienceCard from './experience-card/experience-card';

const CARD_HEIGHT = 166;
const SPACING = 32;

const getBlockHeight = (cardNumbers: number) => {
  return cardNumbers * (CARD_HEIGHT + SPACING * 2);
};

const getCardTopPosition = (cardNumber: number) => {
  return cardNumber * (CARD_HEIGHT + SPACING * (4 / 3));
};

const getPeriod = (experience: Experience) => {
  return `${getFormattedDate(experience.startDate)} - ${getFormattedDate(
    experience.endDate ?? new Date()
  )}`;
};

export default function Timeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { ref, shouldAnimate } = useOneTimeAnimation(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [cardCoords, setCardCoords] = useState<{ x: number; y: number }[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const cardPositions = useMemo(() => {
    const used: { left: number[]; right: number[] } = { left: [], right: [] };

    const getOffset = (side: 'left' | 'right') => {
      let offset = Math.floor(Math.random() * 15 + 5); // 5% - 20%
      let attempts = 0;

      while (
        used[side].some((o) => Math.abs(o - offset) < 10) &&
        attempts < 20
      ) {
        offset = Math.floor(Math.random() * 15 + 5);
        attempts += 1;
      }

      used[side].push(offset);
      return `${offset}%`;
    };

    return experiences.map((_, index) => {
      const isLeft = index % 2 === 0;
      const offset = getOffset(isLeft ? 'left' : 'right');

      return {
        left: isLeft ? offset : undefined,
        right: !isLeft ? offset : undefined,
      };
    });
  }, []);

  // Parallax transforms for different layers
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  const onDragCard = (ref: HTMLDivElement | null, index: number) => {
    const coord = getCardPosition(ref);

    setCardCoords((prev) => {
      const next = [...prev];
      next[index] = coord;
      return next;
    });
  };

  const getCardPosition = (ref: HTMLDivElement | null) => {
    if (!ref) return { x: 0, y: 0 };
    const rect = ref.getBoundingClientRect();
    const containerRect = containerRef.current!.getBoundingClientRect();

    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2,
    };
  };

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const coords = cardRefs.current.map(getCardPosition);
      setCardCoords(coords);
      setContainerDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  return (
    <section
      ref={ref}
      className='w-full overflow-hidden border-y border-slate-800 bg-slate-900'
      id='experience'
    >
      <div className='py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='mb-16 text-center'
          >
            <h2 className='mb-6 text-4xl font-light text-slate-100 md:text-6xl'>
              Experience Journey
            </h2>
            <p className='mx-auto max-w-3xl text-xl font-light text-slate-400'>
              A timeline of professional growth, technical mastery, and
              impactful contributions.
            </p>
          </motion.div>
        </div>

        {/* Game Field Container */}

        <div>
          <div
            ref={containerRef}
            className='relative mx-4 overflow-hidden p-0 md:mx-8 md:px-8 md:py-12 lg:mx-16'
            style={{
              height: `${getBlockHeight(experiences.length)}px`,
              background: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)
            `,
            }}
          >
            {/* Background Grid Pattern */}
            <GridBackground />

            {/* Floating Particles */}
            <FloatingParticles />

            {cardCoords.length === experiences.length && (
              <motion.svg
                style={{ y: foregroundY }}
                className='pointer-events-none absolute inset-0 size-full'
                viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
              >
                {/* Render connecting paths between each card */}
                {cardCoords.map((start, index) => {
                  const end = cardCoords[index + 1];
                  if (!end) return null;

                  const midX = (start.x + end.x) / 2;
                  const controlY = start.y - Math.abs(end.y - start.y) * 0.3;

                  const pathData = `M ${start.x} ${start.y} Q ${midX} ${controlY} ${end.x} ${end.y}`;

                  return (
                    <motion.path
                      key={`connection-path-${index}`}
                      d={pathData}
                      stroke='url(#cardConnectionGradient)'
                      strokeWidth={2}
                      fill='none'
                      strokeDasharray='5,5'
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={
                        shouldAnimate
                          ? { pathLength: 1, opacity: 0.6 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      transition={{
                        duration: 1.5,
                        delay: 0.5 + index * 0.3,
                      }}
                    />
                  );
                })}

                {/* Gradient Definition */}
                <defs>
                  <linearGradient
                    id='cardConnectionGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop offset='0%' stopColor='#8b5cf6' stopOpacity='0.8' />
                    <stop offset='50%' stopColor='#06b6d4' stopOpacity='0.6' />
                    <stop offset='100%' stopColor='#10b981' stopOpacity='0.8' />
                  </linearGradient>
                </defs>
              </motion.svg>
            )}

            {/* Experience Cards */}
            <motion.div className='relative size-full'>
              {experiences.map((experience, index) => (
                <motion.div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  key={experience.id}
                  className='group absolute cursor-grab'
                  style={{
                    left: cardPositions[index].left,
                    right: cardPositions[index].right,
                    top: getCardTopPosition(index),
                    transform: 'translate(-50%, -50%)',
                  }}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.2}
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={
                    shouldAnimate
                      ? {
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }
                      : {
                          opacity: 0,
                          scale: 0,
                          rotate: -10,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.2 },
                  }}
                  onDrag={() => onDragCard(cardRefs.current[index], index)}
                >
                  <ExperienceCard
                    period={getPeriod(experience)}
                    indicatorDelay={index * 0.2 + 0.5}
                    shouldAnimate={shouldAnimate}
                    {...experience}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
