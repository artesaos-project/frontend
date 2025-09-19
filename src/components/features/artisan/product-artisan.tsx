import { BaseCard, ProductCardBody } from '@/components/card';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useEffect, useState } from 'react';

function ProductArtisan({
  artistId,
  visibleCount = 25,
  onTotalChange,
}: {
  artistId?: string;
  visibleCount?: number;
  onTotalChange?: (total: number) => void;
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
  }, [artistId, onTotalChange]);

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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center gap-4 lg:w-6/12">
      {products.slice(0, visibleCount).map((product, i) => (
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
          />
        </BaseCard>
      ))}
    </div>
  );
}

export default ProductArtisan;
