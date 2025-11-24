import { Button } from '@/components/ui/button';
import { AdminListedUser } from '@/types/admin-user';
import Link from 'next/link';

interface UsersTableProps {
  users: AdminListedUser[];
  isLoading?: boolean;
}

function UsersTable({ users, isLoading }: UsersTableProps) {
  if (isLoading) {
    return (
      <div className="w-72 sm:w-2/3 mx-auto my-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight" />
          <p className="text-midnight">Buscando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 sm:w-2/3 mx-auto my-20 h-fit rounded-md border border-neutral-300 text-midnight">
      <div className="bg-midnight w-full rounded-t-sm py-2 px-4 text-sm flex items-center text-white font-semibold">
        <label>Lista de usuários</label>
      </div>
      <div className="flex flex-col">
        {!users || users.length === 0 ? (
          <p className="text-center py-4 text-sm text-neutral-400">
            Nenhum usuário encontrado.
          </p>
        ) : (
          users.map((user, index) => (
            <div
              key={user.id}
              className="hover:bg-gray-200 transition"
            >
              <div className="flex text-sm items-center">
                <div className="flex items-center">
                  <div className="border-r py-2.5 text-center w-9">
                    {index + 1}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 items-center px-3 w-full gap-2 py-2">
                  <p className="truncate text-left font-medium">
                    {user.name || user.socialName || 'Sem nome'}
                  </p>
                  <p className="truncate text-left md:text-center text-gray-600">
                    {user.email}
                  </p>
                  <div className="flex items-center justify-end">
                    <Link href={`/moderator/users/${user.id}/change-password`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs md:text-sm"
                      >
                        Alterar senha
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UsersTable;
