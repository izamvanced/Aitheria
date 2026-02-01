
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageManagement } from '../context/PageContext';

const CustomPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pages } = usePageManagement();

  const page = pages.find(p => p.slug === slug);

  if (!page) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-[var(--subtext)] mb-8">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <Link to="/" className="inline-block bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity">
          Go back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <article className="bg-[var(--card)] p-6 md:p-10 rounded-lg border border-[var(--border)]">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center">{page.title}</h1>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </div>
  );
};

export default CustomPage;
