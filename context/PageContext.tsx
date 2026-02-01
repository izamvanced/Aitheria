
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import type { CustomPage } from '../types';

interface PageContextType {
  pages: CustomPage[];
  savePages: (newPages: CustomPage[]) => void;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

const DATA_KEY = 'aetheria_custom_pages';

const resetPages = () => {
  localStorage.setItem(DATA_KEY, JSON.stringify([]));
  return [];
};

export const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<CustomPage[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(DATA_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
            setPages(parsedData);
        } else {
            setPages(resetPages());
        }
      } else {
        setPages(resetPages());
      }
    } catch (error) {
      console.error("Failed to load custom pages from localStorage", error);
      setPages(resetPages());
    }
  }, []);

  const savePages = (newPages: CustomPage[]) => {
    try {
        localStorage.setItem(DATA_KEY, JSON.stringify(newPages));
        setPages(newPages);
    } catch (error) {
        console.error("Failed to save custom pages to localStorage", error);
    }
  };

  return (
    <PageContext.Provider value={{ pages, savePages }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageManagement = () => {
    const context = useContext(PageContext);
    if (context === undefined) {
        throw new Error('usePageManagement must be used within a PageProvider');
    }
    return context;
}
