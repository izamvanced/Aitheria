
export interface Product {
  id: string;
  name: string;
  description: string; // HTML content from React Quill
  imageUrl: string;
}

export interface FeatureItem {
  icon: string; // Emoji or SVG string
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isFeatured: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string; // URL-friendly identifier
  content: string; // HTML content from React Quill
}

export interface PageData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  products: {
    title: string;
    subtitle: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    tiers: PricingTier[];
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}
