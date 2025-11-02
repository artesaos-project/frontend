//import { artisanApi } from '@/services/api';
import { useEffect, useState } from 'react';

type Artisan = {
  id: string;
  artisanName: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

export function useDebouncedSearch(searchTerm: string, delay: number = 2000) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState<Artisan[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        //const results = await artisanApi.search(debouncedTerm);
        //setSearchResults(results);
      } catch (error) {
        console.error('Erro na busca:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedTerm]);

  return { searchResults, isSearching };
}
