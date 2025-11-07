import { reviewsApi } from '@/services/api';
import { Review } from '@/types/review';
import { useCallback, useEffect, useState } from 'react';

export function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const reviews = await reviewsApi.getByProductId(productId);
      setReviews(reviews);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao carregar os dados.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { reviews, isLoading, error };
}
