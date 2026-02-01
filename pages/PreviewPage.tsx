
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import type { PageData, Product } from '../types';

interface PreviewData {
  pageData: PageData;
  products: Product[];
}

const PreviewPage: React.FC = () => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedPreview = sessionStorage.getItem('aetheria_preview');
      if (storedPreview) {
        setPreviewData(JSON.parse(storedPreview));
      } else {
        setError("No preview data found. Please generate a preview from the admin panel.");
      }
    } catch (e) {
      setError("Failed to parse preview data. It might be corrupted.");
      console.error(e);
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Preview Error</h1>
        <p className="text-[var(--subtext)]">{error}</p>
        <Link to="/admin" className="mt-4 inline-block bg-[var(--accent)] text-white font-bold py-2 px-6 rounded-lg hover:opacity-90">
          Back to Admin
        </Link>
      </div>
    );
  }

  if (!previewData) {
    return <div className="text-center p-8">Loading Preview...</div>;
  }

  const { pageData, products } = previewData;

  return (
    <>
      <div className="sticky top-0 z-50 bg-yellow-400 text-black text-center p-2 font-semibold shadow-lg">
        PREVIEW MODE 
        <a href="/#/admin" className="ml-4 underline">(Back to Admin Panel)</a>
      </div>
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
    </>
  );
};

export default PreviewPage;