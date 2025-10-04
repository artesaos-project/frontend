'use client';

import { artisanApi } from '@/services/api';
import Link from 'next/link';
import { useMemo } from 'react';
import ModerateArtisanButton from './moderate-artisan-button';
import ModerateArtisanButtonWithDialog from './moderate-artisan-button-with-dialog';

type Artisan = {
  id: string;
  artisanName: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';
};

interface ModeratorTableProps {
  searchTerm: string;
  activeFilter: string;
  artisans: Artisan[];
  onRefresh: () => void;
  searchResults?: Artisan[];
  isSearching?: boolean;
}

const STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  REJECTED: 'Recusado',
  INACTIVE: 'Inativo',
};

function ModeratorTable({
  searchTerm,
  activeFilter,
  artisans,
  onRefresh,
  searchResults = [],
  isSearching = false,
}: ModeratorTableProps) {
  const filteredArtisans = useMemo(() => {
    const dataToFilter = searchTerm.trim() ? searchResults : artisans;

    let filtered = dataToFilter;

    if (!searchTerm.trim() && activeFilter !== 'all') {
      filtered = filtered.filter((artisan) => artisan.status === activeFilter);
    }

    return filtered;
  }, [artisans, searchResults, searchTerm, activeFilter]);

  const handleAction = async (
    action: 'approve' | 'reject',
    artisanId: string,
    reason?: string,
  ) => {
    try {
      if (action === 'approve') {
        await artisanApi.approve(artisanId);
        console.log('Artesão aprovado');
      } else {
        await artisanApi.reject(artisanId, reason);
        console.log('Artesão rejeitado', reason ? `- Motivo: ${reason}` : '');
      }
      onRefresh();
    } catch (error) {
      console.error(`Erro ao moderar artesão`, error);
    }
  };

  const handleReject = async (artisanId: string, reason?: string) => {
    await handleAction('reject', artisanId, reason);
  };

  const handleApprove = async (artisanId: string) => {
    await handleAction('approve', artisanId);
  };

  const renderActionButtons = (artisan: Artisan) => {
    switch (artisan.status) {
      case 'PENDING':
        return (
          <div className="flex py-1 justify-center items-center gap-2.5">
            <ModerateArtisanButton
              variant="approve"
              onClick={() => handleApprove(artisan.id)}
            />
            <ModerateArtisanButton variant="edit" />
            <ModerateArtisanButtonWithDialog
              variant="reject"
              artisanName={artisan.artisanName}
              onAction={(reason) => handleReject(artisan.id, reason)}
            />
          </div>
        );

      case 'APPROVED':
        return (
          <div className="flex justify-center items-center gap-2.5">
            <ModerateArtisanButton variant="edit" />
            <ModerateArtisanButton variant="deactivate" />
          </div>
        );

      case 'REJECTED':
        return (
          <div className="flex justify-center items-center gap-2.5">
            <ModerateArtisanButton
              variant="approve"
              onClick={() => handleApprove(artisan.id)}
            />
            <ModerateArtisanButton variant="edit" />
          </div>
        );

      case 'INACTIVE':
        return (
          <div className="flex justify-center items-center gap-2.5">
            <ModerateArtisanButton variant="activate" />
            <ModerateArtisanButton variant="edit" />
          </div>
        );

      default:
        return null;
    }
  };

  if (isSearching) {
    return (
      <div className="w-2/3 mx-auto mt-10 text-center">
        <p className="text-midnight">Buscando...</p>
      </div>
    );
  }

  return (
    <div>
      <table className="w-2/3 mx-auto mt-10 text-center text-midnight border-b border-midnight text-sm mb-20">
        <thead className="bg-baby-blue">
          <tr>
            <th className="font-semibold p-2 text-sm rounded-tl-md ring-[0.5px]">
              Nome
            </th>
            <th className="font-semibold text-sm ring-[0.5px] hidden md:table-cell">
              Email
            </th>
            <th className="font-semibold px-6 text-sm ring-[0.5px] hidden md:table-cell">
              Status
            </th>
            <th className="font-semibold text-sm rounded-tr-md ring-[0.5px]">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredArtisans.map((artisan) => (
            <tr key={artisan.id} className="h-9">
              <td className="ring-[0.5px]">
                <Link
                  href={`/moderator/artisans/${artisan.id}`}
                  className="hover:font-semibold transition underline"
                >
                  {artisan.artisanName}
                </Link>
              </td>
              <td className="ring-[0.5px] hidden md:table-cell">
                {artisan.email}
              </td>
              <td className="font-semibold ring-[0.5px] hidden md:table-cell">
                {STATUS_TRANSLATIONS[artisan.status]}
              </td>
              <td className="ring-[0.5px]">{renderActionButtons(artisan)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModeratorTable;
