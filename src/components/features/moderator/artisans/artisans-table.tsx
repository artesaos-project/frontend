'use client';

import {
  ArtisanApplication,
  ArtisanFilterType,
} from '@/types/moderator-artisan';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';
import { MdHourglassEmpty } from 'react-icons/md';

interface ArtisansTableProps {
  artisans: ArtisanApplication[];
  isLoading?: boolean;
  activeFilter?: ArtisanFilterType;
}

const STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  REJECTED: 'Recusado',
  POSTPONED: 'Incompleto',
};

interface StatusLabelProps {
  artisan: ArtisanApplication;
  isPostponed?: boolean;
}

function StatusLabel({ artisan, isPostponed }: StatusLabelProps) {
  if (isPostponed || artisan.formStatus === 'POSTPONED') {
    return (
      <div className="flex items-center gap-2.5">
        <MdHourglassEmpty className="text-midnight" size={16} />
        <p className="p-1 hidden md:inline">Incompleto</p>
      </div>
    );
  }

  const statusConfig = {
    PENDING: {
      icon: <GoClockFill className="text-amber-400" size={16} />,
      label: STATUS_TRANSLATIONS.PENDING,
    },
    APPROVED: {
      icon: <FaCheck className="text-green-600" size={16} />,
      label: STATUS_TRANSLATIONS.APPROVED,
    },
    REJECTED: {
      icon: <FiX className="text-red-600 font-bold" size={18} />,
      label: STATUS_TRANSLATIONS.REJECTED,
    },
  };

  const config = statusConfig[artisan.status as keyof typeof statusConfig];

  if (!config) return null;

  return (
    <div className="flex items-center gap-2.5">
      {config.icon}
      <p className="p-1 hidden md:inline">{config.label}</p>
    </div>
  );
}

function ArtisansTable({
  artisans,
  isLoading,
  activeFilter,
}: ArtisansTableProps) {
  const isPostponedFilter = activeFilter === 'POSTPONED';

  if (isLoading) {
    return (
      <div className="w-72 sm:w-2/3 mx-auto my-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight" />
          <p className="text-midnight">Buscando artesãos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 sm:w-2/3 mx-auto my-20 h-fit rounded-md border border-neutral-300 text-midnight">
      <div className="bg-midnight w-full rounded-t-sm py-2 px-4 text-sm flex items-center text-white font-semibold">
        <label>Lista de Aplicações</label>
      </div>
      <div className="flex flex-col">
        {artisans.length === 0 ? (
          <p className="text-center py-4 text-sm text-neutral-400">
            Nenhum artesão encontrado.
          </p>
        ) : (
          artisans.map((artisan, index) => (
            <Link
              key={artisan.id}
              href={`/moderator/artisans/${artisan.id}`}
              className="hover:bg-gray-200 hover:font-semibold transition group"
            >
              <div className="flex text-sm">
                <div className="flex items-center">
                  <div className="border-r py-2.5 text-center w-9">
                    {index + 1}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 items-center px-3 w-full">
                  <p className="truncate text-left">{artisan.artisanName}</p>
                  <p className="hidden md:inline text-center whitespace-nowrap">
                    {artisan.email}
                  </p>
                  <div className="flex gap-2 md:gap-7 items-center justify-end">
                    <StatusLabel
                      artisan={artisan}
                      isPostponed={isPostponedFilter}
                    />
                    <FiChevronRight
                      className="md:mr-3 group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ArtisansTable;
