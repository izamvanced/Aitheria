
import React, { useState } from 'react';
import type { PageData } from '../types';

interface FAQProps {
  data: PageData['faq'];
}

const FAQItem: React.FC<{ item: PageData['faq']['items'][0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-[var(--border)]">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center py-5 text-left text-lg font-medium"
            >
                <span>{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-5 pr-10 text-[var(--subtext)]">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};

const FAQ: React.FC<FAQProps> = ({ data }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-16 bg-[var(--subtle-bg)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">{data.title}</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    {data.items.map((item, index) => (
                        <FAQItem 
                            key={index} 
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
