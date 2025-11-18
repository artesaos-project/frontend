import { Button } from '@/components/ui/button';
import useStoreUser from '@/hooks/use-store-user';
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';

export function UserProfile() {
  const user = useStoreUser((state) => state.user);

  return (
    <div className="w-full mb-5 bg-white shadow-md shadow-black/40 rounded-lg p-4 flex gap-2">
      <Image
        src={user.userPhoto ?? '/default-avatar.webp'}
        alt="User Avatar"
        width={110}
        height={110}
        className="rounded-full sm:w-30 sm:h-30 w-20 h-20"
      />
      {user.isAuthenticated && (
        <div
          className={
            user.isArtisan
              ? 'sm:ml-auto mr-2'
              : 'flex justify-center items-center ml-auto mr-auto'
          }
        >
          <h2 className="font-bold text-2xl text-midnight mb-1 line-clamp-2">
            {user.userName}
          </h2>
          {user.isArtisan && (
            <Button asChild variant={'outline'} className="rounded-full">
              <Link
                href={`/artisan/${user.artisanUserName}`}
                className="bg-[#FAFAFA] text-sakura border-sakura border-2 border-b-4 shadow-sakura hover:bg-sakura hover:text-white sm:w-42 mt-2 text-sm"
              >
                Ver meu perfil
                <IoChevronForward />
              </Link>
            </Button>
          )}
        </div>
      )}
      {!user.isAuthenticated && (
        <div className="flex justify-center items-center pl-auto">
          <Button asChild variant={'outline'} className="rounded-full p-5">
            <Link
              href={'/auth'}
              className="bg-[#FAFAFA] text-sakura border-sakura border-2 border-b-4 shadow-sakura hover:bg-sakura hover:text-white sm:w-40 mt-2 text-sm"
            >
              Entre ou Cadastre-se
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
