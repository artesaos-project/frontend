import { productApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const MAX_RELATED_PRODUCTS = 12;

export function useProductData(productId: string) {
  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const artistProductsQuery = useQuery({
    queryKey: ['artist-products', productQuery.data?.authorId, productId],
    queryFn: async () => {
      if (!productQuery.data?.authorId) return [];
      const products = await productApi.getByArtisan(
        productQuery.data.authorId,
      );
      return products.filter((p) => p.id !== productId);
    },
    enabled: !!productQuery.data?.authorId,
    staleTime: 1000 * 60 * 5,
  });

  const relatedProductsQuery = useQuery({
    queryKey: ['related-products', productId],
    queryFn: async () => {
      const allProducts = await productApi.getAll();
      return allProducts
        .filter((p) => p.id !== productId)
        .slice(0, MAX_RELATED_PRODUCTS);
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading =
    productQuery.isLoading ||
    (productQuery.isSuccess &&
      (artistProductsQuery.isLoading || relatedProductsQuery.isLoading));

  const error =
    productQuery.error ||
    artistProductsQuery.error ||
    relatedProductsQuery.error;

  return {
    product: productQuery.data ?? null,
    artistProducts: artistProductsQuery.data ?? [],
    relatedProducts: relatedProductsQuery.data ?? [],
    isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : 'Ocorreu um erro ao carregar os dados.'
      : null,
  };
}
