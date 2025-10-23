'use client';

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight, FiUser, FiLock } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
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
        <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200">
          <SettingItem
            icon={<FiUser />}
            label="Meu perfil"
            onClick={() => {
              // Navegar para página de perfil
              console.log('Meu perfil');
            }}
          />
          <SettingItem
            icon={<MdPersonOff />}
            label="Inativar conta"
            onClick={() => {
              // Abrir modal de confirmação
              console.log('Inativar conta');
            }}
          />
          <SettingItem
            icon={<FiLock />}
            label="Trocar senha de acesso"
            onClick={() => {
              // Navegar para página de trocar senha
              console.log('Trocar senha');
            }}
          />
          <SettingItem
            icon={<RiFileList3Line />}
            label="Dados do perfil"
            onClick={() => {
              // Navegar para página de dados do perfil
              console.log('Dados do perfil');
            }}
          />
        </div>
      </div>
    </main>
  );
}
