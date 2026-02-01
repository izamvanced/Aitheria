
import React from 'react';
import type { PageData } from '../types';

interface CTAProps {
    data: PageData['cta'];
}

const CTA: React.FC<CTAProps> = ({ data }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[var(--subtle-bg)] rounded-lg p-10 md:p-16 border border-[var(--border)]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        <div
          className="max-w-2xl mx-auto text-lg text-[var(--subtext)] mb-8 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        />
        <button className="inline-block bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity">
          {data.buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTA;
