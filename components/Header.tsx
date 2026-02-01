
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { usePageManagement } from '../context/PageContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { pages } = usePageManagement();

  if (!authContext) {
    return null; 
  }

  const { isAuthenticated, logout } = authContext;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-[var(--accent)]'
        : 'text-[var(--subtext)] hover:text-[var(--fg)]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-sm border-b border-[var(--border)]">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[var(--accent)]">
              Aetheria AI
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass}>Beranda</NavLink>
                {pages.map(page => (
                  <NavLink key={page.id} to={`/pages/${page.slug}`} className={navLinkClass}>
                    {page.title}
                  </NavLink>
                ))}
                <a href="/#products" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--subtext)] hover:text-[var(--fg)]">Produk</a>
                <a href="/#pricing" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--subtext)] hover:text-[var(--fg)]">Harga</a>
                <a href="/#faq" className="px-3 py-2 rounded-md text-sm font-medium text-[var(--subtext)] hover:text-[var(--fg)]">FAQ</a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <NavLink to="/admin" className={navLinkClass}>Panel Admin</NavLink>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Keluar
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-opacity"
              >
                Masuk
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
