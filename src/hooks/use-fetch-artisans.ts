import { artisanApi } from '@/services/api';
import {
  ArtisanApplication,
  ArtisanFilterType,
  GetAllArtisanApplicationsParams,
} from '@/types/moderator-artisan';
import { useCallback, useState } from 'react';

interface UseFetchArtisansReturn {
  artisans: ArtisanApplication[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  };
  fetchArtisans: (params: GetAllArtisanApplicationsParams) => Promise<void>;
}

export function useFetchArtisans(): UseFetchArtisansReturn {
  const [artisans, setArtisans] = useState<ArtisanApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  }>({
    page: 1,
    totalPages: 1,
    limit: 15,
    total: 0,
  });

  const fetchArtisans = useCallback(
    async (params: GetAllArtisanApplicationsParams) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await artisanApi.getApplications(params);

        setArtisans(response.artisanApplications);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao buscar artesãos';
        setError(errorMessage);
        console.error('Error fetching artisans:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    artisans,
    isLoading,
    error,
    pagination,
    fetchArtisans,
  };
}

export function buildArtisanParams(
  filter: ArtisanFilterType,
  searchQuery: string,
  page: number = 1,
  limit: number = 20,
): GetAllArtisanApplicationsParams {
  const params: GetAllArtisanApplicationsParams = {
    type: 'BE_ARTISAN',
    page,
    limit,
  };

  if (searchQuery.trim()) {
    params.search = searchQuery.trim();
  }

  if (filter === 'POSTPONED') {
    params.formStatus = 'POSTPONED';
  } else if (filter !== 'all') {
    params.status = filter as 'PENDING' | 'APPROVED' | 'REJECTED';
    params.formStatus = 'SUBMITTED';
  } else if (searchQuery.trim()) {
    params.formStatus = 'SUBMITTED';
  } else {
    params.formStatus = 'SUBMITTED';
  }

  return params;
}
