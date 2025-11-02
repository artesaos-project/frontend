'use client';

import LoadingScreen from '@/components/common/loading-screen';
import Pagination from '@/components/common/pagination';
import ArtisansTable from '@/components/features/moderator/artisans/artisans-table';
import ModerationSearchBar from '@/components/features/moderator/moderation-searchbar';
import ModeratorTitle from '@/components/features/moderator/moderation-title';
import { useSearch } from '@/context/SearchContext';
import { useArtisanFilters } from '@/hooks/use-artisan-filters';
import { useDebounce } from '@/hooks/use-debounce';
import {
  buildArtisanParams,
  useFetchArtisans,
} from '@/hooks/use-fetch-artisans';
import { ArtisanFilterType } from '@/types/moderator-artisan';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ArtisansPage() {
  const { query: searchQuery, setQuery: setSearchQuery } = useSearch();
  const { activeFilter, setActiveFilter } = useArtisanFilters();
  const { artisans, isLoading, error, pagination, fetchArtisans } =
    useFetchArtisans();
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const router = useRouter();

  useEffect(() => {
    const params = buildArtisanParams(
      activeFilter,
      debouncedSearchQuery,
      currentPage,
      15,
    );
    fetchArtisans(params);
  }, [activeFilter, debouncedSearchQuery, currentPage, fetchArtisans]);

  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, debouncedSearchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter as ArtisanFilterType);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  if (isLoading && artisans.length === 0) {
    return <LoadingScreen />;
  }

  if (error) {
    return router.push('/');
  }

  return (
    <div className="overflow-x-hidden">
      <ModeratorTitle title="Artesãos" />
      <div className="mx-auto w-2/3">
        <ModerationSearchBar
          variant="artisans"
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <ArtisansTable
        artisans={artisans}
        isLoading={isLoading || isSearching}
        activeFilter={activeFilter}
      />

      <div className="my-8">
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ArtisansPage;
