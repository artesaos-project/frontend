import { ArtisanFilterType } from '@/types/moderator-artisan';
import { useState } from 'react';

interface UseArtisanFiltersReturn {
  activeFilter: ArtisanFilterType;
  setActiveFilter: (filter: ArtisanFilterType) => void;
}

export function useArtisanFilters(
  initialFilter: ArtisanFilterType = 'all',
): UseArtisanFiltersReturn {
  const [activeFilter, setActiveFilter] =
    useState<ArtisanFilterType>(initialFilter);

  return {
    activeFilter,
    setActiveFilter,
  };
}
