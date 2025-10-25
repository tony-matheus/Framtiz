'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

type ProfilePicProps = {
  size?: 'lg' | 'md' | 'sm';
  circular?: boolean;
};

const sizeMap = {
  lg: 'size-80',
  md: 'size-60',
  sm: 'size-32',
};

export default function ProfilePic({
  size = 'md',
  circular = false,
}: ProfilePicProps) {
  const [hp, setHp] = useState(100);
  const [damageAnim, setDamageAnim] = useState(false);
  const [showHeal, setShowHeal] = useState(false);

  const handleClick = () => {
    if (damageAnim || hp <= 0) return; // prevent spam

    setHp((prev) => {
      const nextHp = prev < 0 ? 0 : prev - 10;

      // Trigger damage animation
      setDamageAnim(true);

      // Heal logic if < 50
      if (nextHp < 50 && Math.random() > 0.8) {
        const healed = Math.floor(Math.random() * 10) + 5;

        setTimeout(() => {
          setHp((afterHit) => Math.min(100, afterHit + healed));
          setShowHeal(true);
          setTimeout(() => setShowHeal(false), 1000);
        }, 300);
      }

      return nextHp;
    });

    // End damage animation
    setTimeout(() => setDamageAnim(false), 300);
  };

  const healthColor =
    hp <= 30 ? 'from-purple-600 to-red-500' : 'from-purple-600 to-green-400';

  return (
    <CyberCard
      className={cn(
        'mb-8 inline-flex overflow-hidden',
        circular ? 'rounded-full' : 'rounded-md'
      )}
      withCornerAccents={false}
    >
      <CyberCardContent className={cn('relative p-0', sizeMap[size])}>
        {/* HP Bar */}
        <motion.div
          layout
          className={cn(
            'absolute w-full bg-gradient-to-b bottom-0 transition-all duration-300',
            healthColor
          )}
          style={{ height: hp < 0 ? 0 : `${hp}%` }}
        />

        {/* Healing Effect */}
        <AnimatePresence>
          {showHeal && (
            <>
              {/* Flash Gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-green-400/60 to-transparent'
              />

              {/* Healing Bubbles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-20 - i * 5, -60 - i * 10],
                    scale: [0.5, 1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                  className={cn(
                    'absolute bottom-4 left-1/2 z-20 size-2 rounded-full bg-green-400',
                    circular ? 'rounded-full' : 'rounded-md'
                  )}
                  style={{
                    marginLeft: `${Math.random() * 60 - 30}px`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
        {/* Clickable image with damage animation */}
        <button
          onClick={handleClick}
          className={cn('size-full bg-transparent p-1 md:p-2')}
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🗡️</text></svg>") 16 0,auto`,
          }}
        >
          <motion.div
            animate={damageAnim ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.3 }}
            className={cn(
              'relative size-full overflow-hidden bg-white',
              circular ? 'rounded-full' : 'rounded-[4px]'
            )}
          >
            <Image
              src='/will.png'
              alt='Willian Frantz'
              className='object-cover'
              priority
              fill
            />
          </motion.div>
        </button>
        {hp <= 0 && (
          <button
            className='absolute bottom-4 right-4 rounded-full bg-black/30 p-1 transition-all hover:bg-green-400 hover:text-purple-900'
            onClick={() => setHp(100)}
          >
            <RotateCcw size={14} />
          </button>
        )}
      </CyberCardContent>
    </CyberCard>
  );
}
