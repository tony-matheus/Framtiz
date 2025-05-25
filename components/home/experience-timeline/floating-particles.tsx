import { motion } from 'framer-motion';

export default function FloatingParticles() {
  return (
    <motion.div className='absolute inset-0'>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute size-1 rounded-full bg-purple-400'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}
