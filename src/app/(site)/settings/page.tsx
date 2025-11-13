'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ExcludeUserDialog from '@/components/features/settings/exclude-user-dialog';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiLock, FiUser } from 'react-icons/fi';
import { MdPersonOff } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function SettingItem({ icon, label, onClick }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group"
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center gap-4 text-midnight">
        <span className="text-lg md:text-xl">{icon}</span>
        <span className="text-sm md:text-base font-normal">{label}</span>
      </div>
      <FiChevronRight className="text-midnight text-lg md:text-xl group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { hasHydrated, user } = useAuthGuard();
  const [isOpen, setIsOpen] = useState(false);

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-gray-100 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        {/* Header com título e botão voltar */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Voltar"
          >
            <FiChevronLeft size={28} className="text-midnight" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-midnight italic">
            Configurações
          </h1>
        </div>

        {/* Card de opções */}
        <ExcludeUserDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200">
          <SettingItem
            icon={<FiUser />}
            label="Meu perfil"
            onClick={() => {
              // Navegar para página de perfil
              router.push(`/artisan/${user.artisanUserName}`);
            }}
          />
          <SettingItem
            icon={<MdPersonOff />}
            label="Excluir conta"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <Link href="/settings/change-password">
            <SettingItem icon={<FiLock />} label="Trocar senha de acesso" />
          </Link>
          <SettingItem
            icon={<RiFileList3Line />}
            label="Dados do perfil"
            onClick={() => {
              // Navegar para página de dados do perfil
              router.push(`/artisan/edit-profile`);
            }}
          />
        </div>
      </div>
    </main>
  );
}
