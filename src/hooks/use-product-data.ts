import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import { useCallback, useEffect, useState } from 'react';

const MAX_RELATED_PRODUCTS = 12;

export function useProductData(productId: string) {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [artistProducts, setArtistProducts] = useState<ApiProduct[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<ApiProduct[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const productData = await productApi.getById(productId);
      setProduct(productData);

      await Promise.all([
        (async () => {
          if (productData.authorId) {
            const products = await productApi.getByArtisan(
              productData.authorId,
            );
            setArtistProducts(products.filter((p) => p.id !== productId));
          }
        })(),
        (async () => {
          const allProducts = await productApi.getAll();
          setRelatedProducts(
            allProducts
              .filter((p) => p.id !== productId)
              .slice(0, MAX_RELATED_PRODUCTS),
          );
        })(),
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao carregar os dados.',
      );
      console.error('Data fetching error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { product, artistProducts, relatedProducts, isLoading, error };
}
