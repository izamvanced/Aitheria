
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-[var(--card)] rounded-lg shadow-md overflow-hidden border border-[var(--border)] transition-transform hover:scale-105 duration-300">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <div 
            className="text-[var(--subtext)] prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <button className="mt-4 w-full bg-[var(--accent)] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
