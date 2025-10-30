import ProductsList from '@/components/products-list';
import SectionStructure from '@/components/section-structure';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useEffect, useState } from 'react';

function SearchResults({ query }: { query: string }) {
  const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const search = async () => {
      try {
        const res = await productApi.search(`title=${query}`);
        setSearchResults(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    search();
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
