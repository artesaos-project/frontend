import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

type User = {
  id: string;
  userName: string;
  email: string;
};

function UsersTable({ data }: { data: User[] }) {
  return (
    <div className="w-72 sm:w-2/3 mx-auto my-20 h-fit rounded-md border border-neutral-300 text-midnight">
      <div className="bg-midnight w-full rounded-t-sm py-2 px-4 text-sm flex items-center text-white font-semibold">
        <label>Lista de usuários</label>
      </div>
      <div className="flex flex-col">
        {data.map((user) => (
          <Link
            key={user.id}
            href={`/moderator/users/${user.id}`}
            className="hover:bg-gray-200 hover:font-semibold transition group"
          >
            <div className="flex text-sm">
              <div className="flex items-center">
                <div className="border-r py-2.5 text-center w-9">{user.id}</div>
              </div>
              <div className="grid grid-cols-3 items-center px-3 w-full">
                <p className="truncate text-left">{user.userName}</p>
                <p className="hidden md:inline text-center whitespace-nowrap">
                  {user.email}
                </p>
                <div className="flex items-center justify-end">
                  <FiChevronRight
                    className="md:mr-3 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UsersTable;
