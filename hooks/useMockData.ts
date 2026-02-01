
import { useState, useEffect } from 'react';
import type { Product } from '../types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'QuantumLeap AI',
    description: '<p>A revolutionary AI that predicts market trends with 99% accuracy. Perfect for financial analysts and traders.</p>',
    imageUrl: 'https://picsum.photos/seed/QuantumLeap/600/400',
  },
  {
    id: '2',
    name: 'SynthArt Pro',
    description: '<p>Generate stunning, high-resolution artwork from simple text prompts. Unleash your inner artist without picking up a brush.</p>',
    imageUrl: 'https://picsum.photos/seed/SynthArt/600/400',
  },
  {
    id: '3',
    name: 'CodeScribe AI',
    description: '<p>Your personal AI pair programmer. It completes code, finds bugs, and writes documentation, boosting your productivity by 5x.</p>',
    imageUrl: 'https://picsum.photos/seed/CodeScribe/600/400',
  },
];

const DATA_KEY = 'aetheria_products';

const resetProducts = () => {
  localStorage.setItem(DATA_KEY, JSON.stringify(initialProducts));
  return initialProducts;
};

export const useMockData = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(DATA_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
            setProducts(parsedData);
        } else {
            setProducts(resetProducts());
        }
      } else {
        setProducts(resetProducts());
      }
    } catch (error) {
      console.error("Failed to load products from localStorage", error);
      setProducts(resetProducts());
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    try {
        localStorage.setItem(DATA_KEY, JSON.stringify(newProducts));
        setProducts(newProducts);
    } catch (error) {
        console.error("Failed to save products to localStorage", error);
    }
  };

  return { products, saveProducts };
};