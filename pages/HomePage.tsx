
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import { usePageData } from '../hooks/usePageData';
import { useMockData } from '../hooks/useMockData';

const HomePage: React.FC = () => {
  const { pageData } = usePageData();
  const { products } = useMockData();

  if (!pageData) {
    return <div>Loading page content...</div>;
  }
  
  return (
    <div>
      <Hero data={pageData.hero} />
      <Features data={pageData.features} />

      <section id="products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{pageData.products.title}</h2>
            <div
              className="mt-4 text-lg text-[var(--subtext)] max-w-2xl mx-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.products.subtitle }}
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Pricing data={pageData.pricing} />
      <FAQ data={pageData.faq} />
      <CTA data={pageData.cta} />
    </div>
  );
};

export default HomePage;
