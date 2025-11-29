'use client';

import AlertDialog from '@/components/common/alert-dialog';
import SideBarMenu from '@/components/sidebar-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import useStoreUser from '@/hooks/use-store-user';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { LuDoorOpen } from 'react-icons/lu';

function ModerationHeader() {
  const user = useStoreUser((state) => state.user);
  const resetStore = useStoreUser((state) => state.resetStore);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleLogoutConfirm = () => {
    resetStore();
    localStorage.removeItem('artisan-register');
    setIsLogoutModalOpen(false);
    router.push('/');
  };
  return (
    <>
      <header className="invisible max-w-screen flex justify-center bg-midnight md:visible">
        <nav className="pb-11 pt-17 flex gap-10 text-white font-semibold">
          <Button
            asChild
            className="text-sm py-7 md:w-30 xl:w-40 bg-black/30 rounded-xl hover:bg-baby-blue/80 cursor-pointer"
          >
            <Link href="/">
              <FiChevronLeft />
              VOLTAR
            </Link>
          </Button>
          <Button
            asChild
            className={`${pathName.endsWith('/moderator') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40 hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator">INÍCIO</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/artisans') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40 hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/artisans">ARTESÃOS</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/users') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40 hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/users">USUÁRIOS</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/reports') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40  hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/reports">DENUNCIAS</Link>
          </Button>
        </nav>
      </header>
      <div className="w-screen md:hidden absolute top-0">
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
              <>
                <Dialog>
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
                </Dialog>
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
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
}

export default ModerationHeader;
