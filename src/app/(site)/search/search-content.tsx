'use client';
import { Pagination } from '@/components/pagination';
import ProductsList from '@/components/products-list';
import SectionStructure from '@/components/section-structure';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5); // Mock: será substituído por dados reais do backend

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await productApi.search(`title=${query}`);
        setSearchResults(res);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <div className="flex flex-col w-full px-4 mt-7">
        <div className="flex flex-row items-center gap-2 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-300 rounded-full transition-colors"
          >
            <GoArrowLeft size={30} />
          </button>
          <h1 className="font-bold text-2xl text-midnight">
            Resultados da Busca
          </h1>
          {query && (
            <span className="text-gray-500">({searchResults.length})</span>
          )}
        </div>
        <SectionStructure title="">
          {query ? (
            <>
              <ProductsList
                products={searchResults}
                loading={loading}
                emptyStateMessage={'Nenhum produto encontrado para: ' + query}
                showAll={true}
              />
              {!loading && searchResults.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    // TODO: Quando o backend implementar paginação, fazer nova requisição aqui
                    console.log('Página selecionada:', page);
                  }}
                />
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 py-10">
              Digite algo na busca para ver os resultados
            </p>
          )}
        </SectionStructure>
      </div>
    </main>
  );
}
