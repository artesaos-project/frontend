'use client';
import AlertDialog from '@/components/common/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useStoreUser from '@/hooks/use-store-user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { LuDoorOpen } from 'react-icons/lu';
import SideBarMenu from './sidebar-menu';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function Header() {
  const user = useStoreUser((state) => state.user);
  const resetStoreUser = useStoreUser((state) => state.resetStore);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleLogoutConfirm = () => {
    localStorage.removeItem('artisan-register');
    localStorage.removeItem('loginStore');
    resetStoreUser();
    setIsLogoutModalOpen(false);
    window.location.reload();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-midnight pt-16 pb-8 px-4 sm:px-12 lg:px-54 grid gap-6 md:grid-cols-12 lg:gap-8 items-center">
      <div className="flex items-center md:col-span-8">
        <SideBarMenu />
        <Link
          href={'/'}
          className="mx-auto md:mx-0 md:ml-8 md:mr-auto cursor-pointer"
        >
          <Image
            src="/horizontal-logo.svg"
            alt="Criarte Logo"
            className="md:w-36"
            width={120}
            height={60}
            priority
          />
        </Link>
        {!user.isAuthenticated && (
          <Link href="/auth">
            <Button
              onClick={() => {}}
              variant="outline"
              className={`bg-transparent cursor-pointer hover:bg-white/20 hover:text-white border-white text-white inset-shadow-black/50 inset-shadow-sm p-6 rounded-full underline underline-offset-2 text-xs`}
            >
              Entre ou cadastre-se
            </Button>
          </Link>
        )}
        {user.isAuthenticated && (
          <Dialog>
            {(user.applicationStatus === 'NOT_ARTISAN' ||
              user.applicationStatus === 'NOT_FINISHED') && (
              <Button
                variant={'outlineSakura'}
                onClick={() => router.push('auth/register')}
                className="hidden md:flex mr-2 text-xs mt-2"
              >
                TORNAR-SE ARTESÃO
              </Button>
            )}
            <DialogTrigger asChild>
              <DialogHeader>
                <DialogTitle>
                  <Image
                    src={user.userPhoto ?? '/placeholder-avatar.svg'}
                    alt="User Avatar"
                    width={60}
                    height={60}
                    className="rounded-full h-15 user-select-none cursor-pointer bg-gray-300"
                  />
                </DialogTitle>
              </DialogHeader>
            </DialogTrigger>
            {!isLogoutModalOpen && (
              <DialogContent className="sm:max-w-[350px] py-10 rounded-3xl">
                <div className="flex flex-col items-center justify-center text-midnight">
                  <Image
                    src={user.userPhoto ?? '/placeholder-avatar.svg'}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className="rounded-full h-30 mb-4 bg-gray-300"
                  />
                  <h2 className="text-2xl font-bold">{user.userName}</h2>
                  {user.artisanUserName && <p>@{user.artisanUserName}</p>}
                  {user.isModerator && (
                    <div className="w-fit">
                      <Separator className="my-2" />
                      <Link href="/moderator" className="text-xl">
                        Moderação
                      </Link>
                      <Separator className="my-2" />
                    </div>
                  )}
                  {user.isArtisan && (
                    <Button
                      variant={'outlineSakura'}
                      onClick={() =>
                        router.push(`/artisan/${user.artisanUserName}`)
                      }
                      className="text-xl mt-2"
                    >
                      Meu Perfil
                    </Button>
                  )}
                  <Button
                    variant={'ghost'}
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="text-xl text-red-500 hover:text-red-600 mt-2"
                  >
                    Sair
                  </Button>
                </div>
              </DialogContent>
            )}
            <AlertDialog
              isOpen={isLogoutModalOpen}
              onClose={() => setIsLogoutModalOpen(false)}
              onConfirm={handleLogoutConfirm}
              icon={<LuDoorOpen size={40} className="midnight" />}
              dialogTitle="Confirmação de Logout"
              dialogMessage={{
                text: 'Tem certeza de que deseja sair da sua conta?',
                color: 'text-midnight',
              }}
            />
          </Dialog>
        )}
      </div>
      <div className="relative md:col-span-4">
        <Input
          type="text"
          value={searchQuery}
          placeholder="Pesquise aqui..."
          className="bg-white rounded-3xl pl-10 pr-14 py-7 drop-shadow-lg shadow-black/40"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-200 rounded-full p-2 ${
            searchQuery.trim()
              ? 'bg-midnight text-white hover:bg-midnight/90 cursor-pointer'
              : 'text-gray-400 cursor-default'
          }`}
          aria-label="Buscar"
          disabled={!searchQuery.trim()}
        >
          <IoIosSearch size={28} />
        </button>
      </div>
    </header>
  );
}

export default Header;
