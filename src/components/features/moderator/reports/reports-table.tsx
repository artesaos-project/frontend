'use client';

import { Report } from '@/types/moderator-report';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';

interface ReportsTableProps {
  reports: Report[];
  isLoading?: boolean;
}

const REASON_TRANSLATIONS: Record<string, string> = {
  COPYRIGHT_VIOLATION: 'Violação de Direitos Autorais',
  OFFENSIVE_CONTENT: 'Conteúdo Ofensivo',
  INAPPROPRIATE_LANGUAGE: 'Linguagem Inapropriada',
  OTHER: 'Outro',
  FALSE_OR_MISLEADING_INFORMATION: 'Informação Falsa ou Enganosa',
  OFF_TOPIC_OR_IRRELEVANT: 'Fora do Tópico ou Irrelevante',
  PROHIBITED_ITEM_SALE_OR_DISCLOSURE: 'Venda ou Divulgação de Item Proibido',
  INAPPROPRIATE_CONTENT: 'Conteúdo Inapropriado',
};

function getReportedName(report: Report): string {
  if (report.product) {
    const productName = report.product.ProductEntity?.name;
    const artisanName = report.product.ProductEntity?.artisan?.user?.name;
    return productName || artisanName || 'Produto Desconhecido';
  }

  return 'Produto Desconhecido';
}

function StatusLabel({ isSolved }: { isSolved: boolean }) {
  if (isSolved) {
    return (
      <div className="flex items-center gap-2.5">
        <FaCheck className="text-green-600" size={16} />
        <p className="p-1 hidden md:inline">Resolvido</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <GoClockFill className="text-amber-400" size={16} />
      <p className="p-1 hidden md:inline">Pendente</p>
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
      <div className="bg-midnight w-full rounded-t-sm py-2 px-3 flex gap-4 text-sm text-white font-semibold">
        <p>Nº</p>
        <div className="grid grid-cols-2 md:grid-cols-3 items-center px-3 w-full">
          <p>Denunciado</p>
          <p className="hidden md:inline text-center">Motivo</p>
          <p className="text-end md:mr-15">Status</p>
        </div>
      </div>

      <div className="flex flex-col">
        {reports.length === 0 ? (
          <p className="text-center py-4 text-sm text-neutral-400">
            Nenhuma denúncia encontrada.
          </p>
        ) : (
          reports.map((report, index) => (
            <Link
              key={report.id}
              href={`/moderator/reports/${report.id}`}
              className="hover:bg-gray-200 hover:font-semibold transition group"
            >
              <div className="flex text-sm">
                <div className="flex items-center">
                  <div className="border-r py-2.5 text-center w-9 truncate px-1">
                    {index}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 items-center px-3 w-full">
                  <p className="truncate text-left">
                    {getReportedName(report)}
                  </p>
                  <p className="hidden md:inline text-center whitespace-nowrap truncate">
                    {REASON_TRANSLATIONS[report.reason] || report.reason}
                  </p>
                  <div className="flex gap-2 md:gap-7 items-center justify-end">
                    <StatusLabel isSolved={report.isSolved} />
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
