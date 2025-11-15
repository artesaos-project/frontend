import ProductsList from '@/components/products-list';
import SectionStructure from '@/components/section-structure';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useEffect, useState } from 'react';

function SearchResults({ query }: { query: string }) {
  const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await productApi.search(`title=${query}`);
        // Only update if not aborted
        if (!controller.signal.aborted) {
          setSearchResults(res);
        }
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);
  return (
    <SectionStructure title="Resultados da Busca">
      <ProductsList
        products={searchResults}
        loading={loading}
        emptyStateMessage={'Nenhum produto encontrado para: ' + query}
      />
    </SectionStructure>
  );
}

export default SearchResults;
