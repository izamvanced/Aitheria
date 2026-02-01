
import { useState, useEffect } from 'react';
import type { PageData } from '../types';

const initialPageData: PageData = {
  hero: {
    title: 'Masa Depan AI Ada di Sini',
    subtitle: '<p>Aetheria AI menyediakan solusi AI canggih untuk mempercepat inovasi dan mendorong pertumbuhan bisnis Anda.</p>',
    cta: 'Jelajahi Produk Kami',
  },
  features: {
    title: 'Mengapa Memilih Aetheria AI?',
    subtitle: '<p>Kami menggabungkan teknologi mutakhir dengan desain yang intuitif untuk memberikan hasil yang tak tertandingi.</p>',
    items: [
      { icon: '🚀', title: 'Performa Cepat', description: 'Model kami dioptimalkan untuk kecepatan, memberikan hasil dalam hitungan detik.' },
      { icon: '🔒', title: 'Aman & Terpercaya', description: 'Keamanan data Anda adalah prioritas utama kami dengan enkripsi end-to-end.' },
      { icon: '💡', title: 'Solusi Inovatif', description: 'Terus-menerus mendorong batas-batas dari apa yang mungkin dilakukan oleh AI.' },
    ],
  },
  products: {
    title: 'Produk Unggulan Kami',
    subtitle: '<p>Temukan alat yang tepat untuk mengubah alur kerja Anda dan membuka potensi baru.</p>',
  },
  pricing: {
    title: 'Paket Harga Fleksibel',
    subtitle: '<p>Pilih paket yang paling sesuai dengan kebutuhan Anda, mulai dari proyek pribadi hingga skala perusahaan.</p>',
    tiers: [
      { name: 'Pemula', price: 'Rp 150k', features: ['Akses 1 Produk', '100 Request/Bulan', 'Dukungan Komunitas'], isFeatured: false },
      { name: 'Pro', price: 'Rp 500k', features: ['Akses 5 Produk', '1000 Request/Bulan', 'Dukungan Email Prioritas', 'Akses API'], isFeatured: true },
      { name: 'Enterprise', price: 'Hubungi Kami', features: ['Akses Semua Produk', 'Request Tanpa Batas', 'Dukungan Khusus', 'SLA'], isFeatured: false },
    ],
  },
  faq: {
    title: 'Pertanyaan yang Sering Diajukan',
    items: [
      { question: 'Apa itu Aetheria AI?', answer: 'Aetheria AI adalah platform yang menyediakan berbagai produk digital berbasis kecerdasan buatan untuk membantu berbagai industri.' },
      { question: 'Bagaimana cara memulai?', answer: 'Cukup pilih produk yang Anda minati, pilih paket harga, dan Anda bisa langsung menggunakannya setelah pembayaran.' },
      { question: 'Apakah ada masa percobaan gratis?', answer: 'Saat ini kami tidak menawarkan masa percobaan gratis, namun kami memiliki paket Pemula yang terjangkau untuk Anda coba.' },
    ],
  },
  cta: {
    title: 'Siap untuk Mengubah Bisnis Anda?',
    subtitle: '<p>Bergabunglah dengan ribuan pengguna yang telah merasakan kekuatan AI bersama Aetheria.</p>',
    buttonText: 'Mulai Sekarang',
  },
};

const DATA_KEY = 'aetheria_page_data';

const resetData = () => {
  localStorage.setItem(DATA_KEY, JSON.stringify(initialPageData));
  return initialPageData;
}

export const usePageData = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(DATA_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Validasi dasar untuk memastikan struktur data tidak rusak total
        if (parsedData && typeof parsedData === 'object' && parsedData.hero && parsedData.features && parsedData.pricing) {
          setPageData(parsedData);
        } else {
          setPageData(resetData());
        }
      } else {
        setPageData(resetData());
      }
    } catch (error) {
      console.error("Failed to load page data from localStorage", error);
      setPageData(resetData());
    }
  }, []);

  const updatePageData = (newData: PageData) => {
    try {
        localStorage.setItem(DATA_KEY, JSON.stringify(newData));
        setPageData(newData);
    } catch (error) {
        console.error("Failed to save page data to localStorage", error);
    }
  };

  return { pageData, updatePageData };
};