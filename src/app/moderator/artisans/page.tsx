'use client';

import LoadingScreen from '@/components/common/loading-screen';
import { artisanApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModeratorSearch from '../../../components/features/moderator/moderator-search';
import ModeratorTable from '../../../components/features/moderator/moderator-table';
import ModeratorTitle from '../../../components/features/moderator/moderator-title';

type Artisan = {
  id: string;
  artisanName: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';
};

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchArtisans = async () => {
    try {
      setIsLoading(true);
      const result = await artisanApi.getApplications();
      setArtisans(result.artisanApplications);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      router.replace('/');
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

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
      <ModeratorSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <ModeratorTable
        searchTerm={searchTerm}
        activeFilter={activeFilter}
        artisans={artisans}
        onRefresh={fetchArtisans}
      />
    </div>
  );
}

export default Page;
