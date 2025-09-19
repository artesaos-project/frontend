'use client';

import { artisanApi } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModeratorHeader from '../../../components/features/moderator/moderator-header';
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const fetchArtisans = async () => {
    try {
      setIsLoading(true);
      const result = await artisanApi.getApplications();
      setArtisans(result.artisanApplications);
      setIsAuthorized(true);
    } catch (error: any) {
      if (error.message === 'UNAUTHORIZED') {
        router.replace('/');
        return;
      }
      console.error('Erro ao buscar artesãos: ', error);
      router.replace('/');
    } finally {
      setIsLoading(false);
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

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight mx-auto mb-4" />
          <p className="text-midnight font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não autorizado, não renderiza nada (já redirecionou)
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="overflow-x-hidden">
      <ModeratorHeader />
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
