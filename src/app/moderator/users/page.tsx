'use client';

import LoadingScreen from '@/components/common/loading-screen';
import Pagination from '@/components/common/pagination';
import ModerationSearchBar from '@/components/features/moderator/moderation-searchbar';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import UsersTable from '@/components/features/moderator/users/users-table';
import { useModeratorGuard } from '@/hooks/use-moderator-guard';
import { adminUsersApi } from '@/services/api';
import { AdminListedUser } from '@/types/admin-user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasHydrated } = useModeratorGuard();

  const [users, setUsers] = useState<AdminListedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 15,
    total: 0,
  });

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchUsers = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const response = await adminUsersApi.getUsers({
        page,
        limit: 15,
      });

      setUsers(response.users);
      setPagination(response.pagination);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching users:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      fetchUsers(currentPage);
    }
  }, [currentPage, hasHydrated, fetchUsers]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    router.push(`/moderator/users?page=${page}`);
  };

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <ModerationTitle title={'Usuários'} />
      <div className="w-2/3 mx-auto">
        <ModerationSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          variant="users"
        />
      </div>
      <UsersTable users={users} isLoading={isLoading} />
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex justify-center mb-8">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Page;
