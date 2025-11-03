'use client';

import { Report } from '@/types/moderator-report';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { FiChevronRight, FiX } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';

interface ReportsTableProps {
  reports: Report[];
  isLoading?: boolean;
}

const STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  MODERATED: 'Moderado',
  ARCHIVED: 'Arquivado',
};

function StatusLabel({ status }: { status: string }) {
  const statusConfig = {
    PENDING: {
      icon: <GoClockFill className="text-amber-400" size={16} />,
      label: STATUS_TRANSLATIONS[status],
    },
    MODERATED: {
      icon: <FiX className="text-red-600 font-bold" size={18} />,
      label: STATUS_TRANSLATIONS[status],
    },
    ARCHIVED: {
      icon: <FaCheck className="text-green-600" size={16} />,
      label: STATUS_TRANSLATIONS[status],
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  if (!config) {
    return (
      <div className="flex items-center justify-center">
        <p className="font-semibold text-xs sm:text-sm">
          {STATUS_TRANSLATIONS[status]}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      {config.icon}
      <p className="p-1 hidden md:inline">{config.label}</p>
    </div>
  );
}

function ReportsTable({ reports, isLoading }: ReportsTableProps) {
  if (isLoading) {
    return (
      <div className="w-72 sm:w-2/3 mx-auto my-20 text-center">
        <p className="text-midnight">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-72 sm:w-2/3 mx-auto my-20 h-fit rounded-md border border-neutral-300 text-midnight">
      <div className="bg-midnight w-full rounded-t-sm py-2 px-4 text-sm flex items-center text-white font-semibold">
        <label>Lista de Denúncias</label>
      </div>
      <div className="flex flex-col">
        {reports.length === 0 ? (
          <p className="text-center py-4 text-sm text-neutral-400">
            Nenhum relatório encontrado.
          </p>
        ) : (
          reports.map((report) => (
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
                    <StatusLabel status={report.status} />
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

export default ReportsTable;
