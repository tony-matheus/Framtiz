'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOneTimeAnimation } from '@/hooks/use-one-time-animations';
import { Blog } from '@/lib/services/blog-service';
import BlogPost from './blog-post';

interface BlogPostsProps {
  blogs: Blog[];
}

export default function BlogPosts({ blogs }: BlogPostsProps) {
  const { ref, shouldAnimate } = useOneTimeAnimation(0.2);
  const carouselRef = useRef<HTMLDivElement>(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [canScrollLeft, setCanScrollLeft] = useState(false);
  // const [canScrollRight, setCanScrollRight] = useState(true);

  // const updateScrollButtons = () => {
  //   if (carouselRef.current) {
  //     const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
  //     setCanScrollLeft(scrollLeft > 0);
  //     setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  //   }
  // };

  // const scrollToIndex = (index: number) => {
  //   if (carouselRef.current) {
  //     const cardWidth = 400 + 32; // card width + gap
  //     carouselRef.current.scrollTo({
  //       left: index * cardWidth,
  //       behavior: 'smooth',
  //     });
  //     setCurrentIndex(index);
  //   }
  // };

  // const scrollLeft = () => {
  //   const newIndex = Math.max(0, currentIndex - 1);
  //   scrollToIndex(newIndex);
  // };

  // const scrollRight = () => {
  //   const newIndex = Math.min(blogPosts.length - 1, currentIndex + 1);
  //   scrollToIndex(newIndex);
  // };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // carousel.addEventListener('scroll', updateScrollButtons);
      // updateScrollButtons();
      // return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <section
      ref={ref}
      className='w-full border-y border-slate-800 bg-slate-950'
      id='blog'
    >
      <div className='overflow-hidden py-24'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
            className='mb-16 text-center'
          >
            <h2 className='mb-6 text-4xl font-light text-slate-100 md:text-6xl'>
              Latest Insights
            </h2>
            <p className='mx-auto max-w-2xl text-xl font-light text-slate-400'>
              Thoughts on technology, development, and innovation.
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className='relative'>
          {/* Navigation Buttons
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={cn(
              'absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110',
              canScrollLeft
                ? 'text-slate-300 hover:bg-slate-700/90 hover:text-white hover:border-slate-600'
                : 'text-slate-600 cursor-not-allowed opacity-50'
            )}
          >
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              canScrollRight
                ? 'text-slate-300 hover:bg-slate-700/90 hover:text-white hover:border-slate-600'
                : 'text-slate-600 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronRight className='w-6 h-6' />
          </button> */}

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={
              shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            ref={carouselRef}
            className='scrollbar-hide flex gap-8 overflow-x-auto scroll-smooth px-16'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            // onScroll={updateScrollButtons}
          >
            {blogs.map((post) => (
              <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.updated_at ?? ''}
                image={post.image_url ?? '/placeholder.svg'}
              />
            ))}
          </motion.div>

          {/* Pagination Dots
          <div className='flex justify-center mt-12 gap-2'>
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-slate-600 hover:bg-slate-500 w-2'
                }`}
              />
            ))}
          </div> */}
        </div>

        {/* Simple View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mt-16 text-center'
        >
          <a
            href='/blog'
            className='font-light text-slate-400 underline-offset-4 transition-colors duration-300 hover:text-slate-300 hover:underline'
          >
            View all articles
          </a>
        </motion.div>
      </div>
    </section>
  );
}
