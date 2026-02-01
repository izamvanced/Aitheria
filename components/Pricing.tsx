
import React from 'react';
import type { PageData } from '../types';

interface PricingProps {
  data: PageData['pricing'];
}

const CheckIcon: React.FC = () => (
    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const Pricing: React.FC<PricingProps> = ({ data }) => {
  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{data.title}</h2>
           <div
            className="mt-4 text-lg text-[var(--subtext)] max-w-2xl mx-auto prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: data.subtitle }}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {data.tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative bg-[var(--card)] p-8 rounded-lg border ${
                tier.isFeatured ? 'border-[var(--accent)] scale-105' : 'border-[var(--border)]'
              }`}
            >
              {tier.isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Paling Populer
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-4xl font-extrabold mb-6">{tier.price}<span className="text-lg font-normal text-[var(--subtext)]">/bulan</span></p>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-[var(--subtext)]">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                tier.isFeatured
                  ? 'bg-[var(--accent)] text-white hover:opacity-90'
                  : 'bg-[var(--subtle-bg)] text-[var(--fg)] hover:bg-[var(--border)]'
              }`}>
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
