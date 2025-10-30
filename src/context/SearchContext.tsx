'use client';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type SearchContextType = {
  query: string;
  setQuery: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setQuery('');
  }, [pathname]);

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch deve ser usado dentro de SearchProvider');
  }
  return context;
};
