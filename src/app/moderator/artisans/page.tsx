'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ModeratorTable from '@/components/features/moderator/moderation-table';
import { artisanApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ModerationSearchBar from '../../../components/features/moderator/moderation-searchbar';
import ModeratorTitle from '../../../components/features/moderator/moderation-title';

type Artisan = {
  id: string;
  artisanName: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';
};

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('PENDING');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  const fetchArtisans = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await artisanApi.getApplications();
      setArtisans(result.artisanApplications);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching artisans:', error.message);
      }
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    fetchArtisans();
  }, [fetchArtisans]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="overflow-x-hidden">
      <ModeratorTitle title={'Artesãos'} />
      <div className="mx-auto w-2/3">
        <ModerationSearchBar
          variant="artisans"
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <ModeratorTable
        type="artisans"
        searchTerm={searchTerm}
        activeFilter={activeFilter}
        data={artisans}
      />
    </div>
  );
}

export default Page;
