
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--subtle-bg)] border-t border-[var(--border)]">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-[var(--subtext)]">
        <p>&copy; {new Date().getFullYear()} Aetheria AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
