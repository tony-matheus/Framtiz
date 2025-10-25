'use client';

import { useOneTimeAnimation } from '@/hooks/use-one-time-animations';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/willianfrantz/',
    color: 'hover:text-blue-400 hover:border-blue-400/50',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://x.com/frantz_willian',
    color: 'hover:text-sky-400 hover:border-sky-400/50',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/WLSF',
    color: 'hover:text-purple-400 hover:border-purple-400/50',
  },
];

export default function ContactSection() {
  const { ref, shouldAnimate } = useOneTimeAnimation(0.3);

  const handleEmailClick = () => {
    window.location.href =
      'mailto:willianluigii@gmail.com?subject=Contact from Framtiz';
  };

  return (
    <section
      id='contact'
      ref={ref}
      className=' relative border-t border-slate-700/50 bg-slate-900/50 py-16 font-mono'
    >
      {/* Grid Background */}
      <div className='absolute inset-0 opacity-20'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
                 linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className='absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-purple-500/20 via-transparent to-transparent' />
      <div className='absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-green-500/20 via-transparent to-transparent' />

      <div className='container relative z-10 mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='mx-auto max-w-4xl text-center'
        >
          {/* Header */}
          <div className='mb-12'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                shouldAnimate
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mb-6 inline-flex items-center gap-2 border border-slate-600/50 bg-slate-800/50 px-4 py-2'
            >
              <div className='size-2 animate-pulse bg-green-400' />
              <span className='font-mono text-sm text-green-400'>
                CONTACT_AVAILABLE
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className='mb-4 font-mono text-3xl font-bold text-slate-100 md:text-4xl'
            >
              LET&apos;S CONNECT
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
              className='mx-auto max-w-2xl font-mono text-lg text-slate-400'
            >
              Found something interesting? Have a question or want to
              collaborate? I&apos;d love to hear from you.
            </motion.p>
          </div>

          {/* Contact Options */}
          <div className='grid items-start gap-8 md:grid-cols-2'>
            {/* Email Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={
                shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.6, delay: 0.5 }}
              className='order-2 md:order-1'
            >
              <Button
                size='xl'
                className='w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all duration-300 hover:scale-105  hover:from-purple-500 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25'
                onClick={handleEmailClick}
              >
                <Mail className='size-5 transition-transform duration-300 group-hover:rotate-12' />
                <span>Send Email</span>
                <ExternalLink className='size-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100' />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.6, delay: 0.6 }}
              className='order-1 md:order-2'
            >
              <div className='flex justify-center gap-4'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      shouldAnimate
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className={`group relative border border-slate-600/50 bg-slate-800/50 p-4 transition-all duration-300 hover:scale-110 hover:bg-slate-700/50 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon className='size-6 text-slate-400 transition-colors duration-300 group-hover:text-current' />

                    {/* Tooltip */}
                    <div className='pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 font-mono text-sm text-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      {social.name}
                    </div>

                    {/* Cyber glow effect */}
                    <div className='group-hover:opacity-1 absolute inset-0 rounded-lg bg-current opacity-0 blur-md transition-opacity duration-300' />
                  </motion.a>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className='mt-4 font-mono text-sm text-slate-500'
              >
                Follow me on social media
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className='mt-12 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent'
          />
        </motion.div>
      </div>
    </section>
  );
}
