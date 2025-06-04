'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useOneTimeAnimation } from '@/hooks/use-one-time-animations';
import FloatingParticles from './floating-particles';
import ExperienceCard from './experience-card';

const experiences = [
  {
    id: 1,
    company: 'Universidade de Fortaleza',
    position: 'Full Stack Developer',
    location: 'Fortaleza, BR',
    period: 'Apr 2013 - Apr 2015',
    description:
      'Worked as a Full Stack Developer creating and maintaining web applications, main technologies:',
    type: 'full-time',
  },
  {
    id: 2,
    company: 'Deway',
    position: 'Full Stack Developer',
    location: 'Fortaleza, BR',
    period: 'Mar 2025 - May 2017',
    description: `I've been able to work well under pressure and with short deadlines, manage projects and work alongside colleagues and clients.`,
    type: 'full-time',
  },
  {
    id: 3,
    company: 'OsBox',
    position: 'Software Engineer',
    location: 'Fortaleza, BR',
    period: 'Jul 2017 - Oct 2018',
    description:
      'Worked designing, building and maintaining Back-end applications and DevOps',
    type: 'full-time',
  },
  {
    id: 4,
    company: 'Quero Educação',
    position: 'Software Engineer',
    location: 'Fortaleza, BR',
    period: 'Oct 2018 - Aug 2019',
    description:
      "Bachelor's degree in Computer Science with focus on software engineering. Graduated Magna Cum Laude.",
    type: 'full-time',
  },
  {
    id: 5,
    company: 'Resolvvi',
    position: 'Head Of Engineering',
    location: 'Fortaleza, Brazil',
    period: 'Aug 2019 - Apr 2020',
    description:
      'We manage to grow the headcount from 11 to around 40 in less than 5 months, also scaling the amount of users engaging into the platform by constantly adding new features and improving the usability at all.',
    type: 'full-time',
  },
  {
    id: 6,
    company: 'Magnetis Investimentos',
    position: 'Senior Software Engineer',
    location: 'São Paulo, Brazil',
    period: 'Apr 2020 - Apr 2021',
    description:
      'I was directly responsible for design, create and maintain 2 of the main services used for releasing the Magnetis Broker service.',
    type: 'full-time',
  },
  {
    id: 7,
    company: 'Trybe',
    position: 'Senior Software Engineer',
    location: 'São Paulo, Brazil',
    period: 'Apr 2021 - Jan 2022',
    description:
      'Trybe is a web development school that has a genuine commitment to the professional success of its students. With the Shared Success Model, those who study at Trybe have the option of paying only when they are already working.',
    type: 'full-time',
  },
  {
    id: 7,
    company: 'Riot Games',
    position: 'Senior Software Engineer',
    location: 'Loas Angeles California, United States',
    period: 'Apr 2021 - Jan 2022',
    description:
      'Working as a Software Engineer on the AntiCheat team to improve how Vanguard and the whole environment can detect and classify suspects in order to keep our games safe and sound.',
    type: 'full-time',
  },
].reverse();

const CARD_HEIGHT = 166;
const SPACING = 32;

const getBlockHeight = (cardNumbers: number) => {
  return cardNumbers * (CARD_HEIGHT + SPACING * 2);
};

const getCardTopPosition = (cardNumber: number) => {
  return cardNumber * (CARD_HEIGHT + SPACING * (4 / 3));
};

// SVG path generator for curved connections
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateCurvePath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  containerWidth: number,
  containerHeight: number
) => {
  const startX = (start.x / 100) * containerWidth;
  const startY = (start.y / 100) * containerHeight;
  const endX = (end.x / 100) * containerWidth;
  const endY = (end.y / 100) * containerHeight;

  // Control points for smooth curves
  const midX = (startX + endX) / 2;
  const controlOffset = Math.abs(endY - startY) * 0.3;

  return `M ${startX} ${startY} Q ${midX} ${
    startY - controlOffset
  } ${endX} ${endY}`;
};

export default function ExperienceTimeline() {
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

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      const coords = cardRefs.current.map((ref) => {
        console.log({ ref });
        if (!ref) return { x: 0, y: 0 };
        const rect = ref.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();

        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });
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
            <motion.div className='absolute inset-0 opacity-20'>
              <div
                className='size-full'
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                  backgroundSize: '40px 40px',
                }}
              />
            </motion.div>

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
                      stroke='url(#connectionGradient)'
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
                    id='connectionGradient'
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
                  className='group absolute cursor-pointer'
                  style={{
                    left: cardPositions[index].left,
                    right: cardPositions[index].right,
                    top: getCardTopPosition(index),
                    transform: 'translate(-50%, -50%)',
                  }}
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
                >
                  {/* Connection Node */}
                  <div className='absolute -left-2 -top-2 size-4 rounded-full border-2 border-slate-900 bg-gradient-to-br from-purple-500 to-green-400 transition-transform duration-300 group-hover:scale-125' />

                  {/* Card */}
                  <ExperienceCard {...experience} />

                  {/* Floating Timeline Indicator */}
                  <motion.div
                    className='absolute right-0 whitespace-nowrap border border-slate-600 bg-slate-900/80 px-2 py-1 text-xs text-slate-300'
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      shouldAnimate
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {experience.period.split(' - ')[0]}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
