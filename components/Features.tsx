
import React from 'react';
import type { PageData } from '../types';

interface FeaturesProps {
  data: PageData['features'];
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  return (
    <section id="features" className="py-16 bg-[var(--subtle-bg)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{data.title}</h2>
          <div
            className="mt-4 text-lg text-[var(--subtext)] max-w-2xl mx-auto prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: data.subtitle }}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((feature, index) => (
            <div key={index} className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-[var(--subtext)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
