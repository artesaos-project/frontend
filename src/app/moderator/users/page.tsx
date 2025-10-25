'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ModerationSearchBar from '@/components/features/moderator/moderation-searchbar';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching reports:', error.message);
      }
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <ModerationTitle title={'Denúncias'} />
      <div className="w-2/3 mx-auto">
        <ModerationSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          variant="users"
        />
      </div>
    </div>
  );
}

export default Page;
