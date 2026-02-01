
import React from 'react';
import type { PageData } from '../types';

interface HeroProps {
  data: PageData['hero'];
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
          {data.title}
        </h1>
        <div
          className="max-w-3xl mx-auto text-lg md:text-xl text-[var(--subtext)] mb-8 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        />
        <a
          href="#products"
          className="inline-block bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity"
        >
          {data.cta}
        </a>
      </div>
    </section>
  );
};

export default Hero;
