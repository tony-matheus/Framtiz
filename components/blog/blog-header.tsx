export default function BlogHeader() {
  return (
    <>
      <div className='mb-2 flex items-center'>
        <div className='mr-2 size-2 animate-pulse bg-green-400'></div>
        <div className='font-mono text-sm text-green-400'>BLOG_TERMINAL</div>
      </div>
      <h1 className='mb-4 bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl'>
        DIGITAL_INSIGHTS
      </h1>
      <p className='max-w-3xl text-slate-300'>
        Exploring the intersection of technology, development, and innovation.
        Deep dives into modern web development, AI, and emerging technologies.
      </p>
    </>
  );
}
