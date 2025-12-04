'use client';
import AlertDialog from '@/components/common/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useStoreUser from '@/hooks/use-store-user';
import { authApi } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { LuDoorOpen } from 'react-icons/lu';
import { toast } from 'sonner';
import { MainMenu } from './sidebar/main-menu';
import { ModerationMenu } from './sidebar/moderation-menu';
import { UserProfile } from './sidebar/user-profile';

function SideBarMenu() {
  const resetStoreUser = useStoreUser((state) => state.resetStore);
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isModerationRoute = pathname.startsWith('/moderator');

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('artisan-register');
      localStorage.removeItem('loginStore');
      resetStoreUser();
      setIsLogoutModalOpen(false);

      toast.success('Logout realizado com sucesso!');

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    },
    onError: (error) => {
      console.error('Erro ao fazer logout:', error);

      localStorage.removeItem('artisan-register');
      localStorage.removeItem('loginStore');
      resetStoreUser();
      setIsLogoutModalOpen(false);

      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Erro ao fazer logout.';
        toast.error(message);
      } else {
        toast.error('Erro ao fazer logout. Sua sessão foi limpa localmente.');
      }

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoMenu size={30} color="white" className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[#FAFAFA] p-5 w-[90%] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle asChild>
            <Image
              src="/horizontal-logo-azul 3.svg"
              alt="User Avatar"
              width={180}
              height={90}
              className="w-40 mx-auto sm:mx-0 sm:w-60"
            />
          </SheetTitle>
        </SheetHeader>

        <UserProfile />

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            {isModerationRoute ? (
              <ModerationMenu onLogoutClick={handleOpenLogoutModal} />
            ) : (
              <MainMenu onLogoutClick={handleOpenLogoutModal} />
            )}
          </ScrollArea>
        </div>

        <AlertDialog
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
          icon={<LuDoorOpen size={40} color="midnight" />}
          dialogTitle="Tem certeza que deseja sair?"
          textButton1="Sair"
          textButton2="Voltar"
          isLoading={logoutMutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}

export default SideBarMenu;
