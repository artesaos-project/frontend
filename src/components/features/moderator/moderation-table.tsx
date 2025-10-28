'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';
import { TbCancel } from 'react-icons/tb';

type Artisan = {
  id: string;
  artisanName: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';
};

type Report = {
  id: number;
  reportType: string;
  target: string;
  denunciator: string;
  reason: string;
  status: 'PENDING' | 'MODERATED' | 'ARCHIVED';
};

// Discriminated union for table type
type ModerationTableProps =
  | {
      type: 'artisans';
      searchTerm: string;
      activeFilter: string;
      data: Artisan[];
      searchResults?: Artisan[];
      isSearching?: boolean;
    }
  | {
      type: 'reports';
      searchTerm: string;
      activeFilter: string;
      data: Report[];
      searchResults?: Report[];
      isSearching?: boolean;
    };

const ARTISAN_STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  REJECTED: 'Recusado',
  INACTIVE: 'Inativo',
};

const REPORT_STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  MODERATED: 'Moderado',
  ARCHIVED: 'Arquivado',
};

function ModerationStatusLabel({ status }: { status: string }) {
  if (status === 'PENDING')
    return (
      <div className="flex items-center gap-2.5">
        <GoClockFill className="text-amber-400" size={16} />
        <p className="p-1 hidden md:inline">
          {ARTISAN_STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  if (status === 'APPROVED')
    return (
      <div className="flex items-center gap-2">
        <FaCheck className="text-green-600" size={16} />
        <p className="p-1 hidden md:inline">
          {ARTISAN_STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  if (status === 'REJECTED')
    return (
      <div className="flex items-center gap-2">
        <FiX className="text-red-600 font-bold" size={18} />
        <p className="p-1 hidden md:inline">
          {ARTISAN_STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  if (status === 'INACTIVE')
    return (
      <div className="flex items-center gap-2">
        <TbCancel size={16} />
        <p className="p-1 hidden md:inline">
          {ARTISAN_STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  if (status === 'MODERATED')
    return (
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xs sm:text-sm">
          {REPORT_STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  if (status === 'ARCHIVED')
    return (
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xs sm:text-sm">
          {REPORT_STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  return null;
}

function ModerationTable(props: ModerationTableProps) {
  const {
    searchTerm,
    activeFilter,
    searchResults = [],
    isSearching = false,
  } = props;

  // Compute filtered data based on type - hooks must be called unconditionally
  const filteredData = useMemo(() => {
    const dataToFilter = searchTerm.trim() ? searchResults : props.data;

    if (!searchTerm.trim() && activeFilter !== 'all') {
      return dataToFilter.filter((item) => item.status === activeFilter);
    }

    return dataToFilter;
  }, [props.data, searchResults, searchTerm, activeFilter]);

  if (isSearching) {
    return (
      <div
        className={
          props.type === 'artisans'
            ? 'w-2/3 mx-auto mt-10 text-center'
            : 'w-full px-4 sm:w-11/12 md:w-5/6 lg:w-2/3 mx-auto mt-10 text-center'
        }
      >
        <p className="text-midnight">Buscando...</p>
      </div>
    );
  }

  // Render artisans table
  if (props.type === 'artisans') {
    return (
      <div className="w-72 sm:w-2/3 mx-auto my-20 h-fit rounded-md border border-neutral-300 text-midnight">
        <div className="bg-midnight w-full rounded-t-sm py-2 px-4 text-sm flex items-center text-white font-semibold">
          <label>Lista de Aplicações</label>
        </div>
        <div className="flex flex-col">
          {filteredData.length === 0 ? (
            <p className="text-center py-4 text-sm text-neutral-400">
              Nenhum artesão encontrado.
            </p>
          ) : (
            (filteredData as Artisan[]).map((artisan, index) => (
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
                      <ModerationStatusLabel status={artisan.status} />
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

  // Render reports table
  return (
    <div className="w-72 sm:w-2/3 mx-auto my-20 h-fit rounded-md border border-neutral-300 text-midnight">
      <div className="bg-midnight w-full rounded-t-sm py-2 px-4 text-sm flex items-center text-white font-semibold">
        <label>Lista de Denúncias</label>
      </div>
      <div className="flex flex-col">
        {filteredData.length === 0 ? (
          <p className="text-center py-4 text-sm text-neutral-400">
            Nenhum relatório encontrado.
          </p>
        ) : (
          (filteredData as Report[]).map((report) => (
            <Link
              key={report.id}
              href={`/moderator/reports/${report.id}`}
              className="hover:bg-gray-200 hover:font-semibold transition group"
            >
              <div className="flex text-sm">
                <div className="flex items-center">
                  <div className="border-r py-2.5 text-center w-9">
                    {report.id}
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center px-3 w-full">
                  <p className="truncate text-left">{report.target}</p>
                  <p className="hidden md:inline text-center whitespace-nowrap">
                    {report.reportType}
                  </p>
                  <div className="flex gap-2 md:gap-7 items-center justify-end">
                    <ModerationStatusLabel status={report.status} />
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

export default ModerationTable;
