'use client';
import { Pagination } from '@/components/pagination';
import ProductsList from '@/components/products-list';
import { Input } from '@/components/ui/input';
import chunkArray from '@/lib/utils/chunkArray';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

function page() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Mock: será substituído por dados reais do backend
  const [searchQuery, setSearchQuery] = useState('');
  const params = useParams();
  const categoryId = params.id as string;
  //TODO: implementar paginação real com backend
  const limit = 20;

  const slicedProducts = useMemo(
    () => chunkArray(products, limit),
    [products, limit],
  );
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        let query = `title=`;
        if (searchQuery.trim()) {
          query += searchQuery.trim();
        }
        const response = await productApi.search(query);
        setProducts(response);
        setTotalPages(Math.ceil(response.length / limit));
      } catch (err: unknown) {
        if (err instanceof Error)
          console.error('Erro ao buscar produtos', err.message);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, categoryId]);
  return (
    <main className="flex flex-col overflow-x-hidden justify-items-center min-h-screen px-6 sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <h1 className="text-xl text-sakura font-bold mb-8 text-center">
        Todos os Produtos
      </h1>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      {/* Todo: implementar controles de ordernar por e filtrar (componentes já visualmente prontos) */}
      <ProductsList
        products={slicedProducts[currentPage - 1]}
        loading={loading}
        emptyStateMessage={'Nenhum produto encontrado'}
        showAll={true}
      />
      {!loading && products.length > 0 && (
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
    </main>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Pesquisar produto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 py-5 text-sm border-gray-400 focus-visible:border-gray-600 focus-visible:ring-0"
      />
      <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default page;
