import { BaseCard, ProductCardBody } from '@/components/card';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useEffect, useState } from 'react';

function ProductArtisan({
  artistId,
  visibleCount = 5,
  isEdit,
  onTotalChange,
  search,
}: {
  artistId?: string;
  visibleCount?: number;
  isEdit?: boolean;
  onTotalChange?: (total: number) => void;
  search?: string;
}) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!artistId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await productApi.getByArtisan(artistId);
        setProducts(data);

        if (onTotalChange) {
          onTotalChange(data.length);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar produtos',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // onTotalChange removido das dependências - deve ser memoizado pelo componente pai se necessário
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 anim">Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-salmon">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">
          Nenhum produto encontrado para este artista.
        </p>
      </div>
    );
  }

  const filteredProducts = search
    ? products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center gap-4 lg:w-6/12">
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          Nenhum produto corresponde à busca.
        </div>
      )}
      {filteredProducts.slice(0, visibleCount).map((product, i) => (
        <BaseCard key={product.id || i}>
          <div className="w-full h-40 overflow-hidden">
            <img
              src={product.coverPhoto}
              alt={product.title}
              className="rounded-lg object-cover h-40 w-full"
            />
          </div>
          <ProductCardBody
            id={product.id}
            price={product.priceInCents / 100}
            title={product.title}
            author={product.authorName}
            isEdit={isEdit}
          />
        </BaseCard>
      ))}
    </div>
  );
}

export default ProductArtisan;
