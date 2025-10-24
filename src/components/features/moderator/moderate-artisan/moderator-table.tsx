'use client';

import Link from 'next/link';
import { useMemo } from 'react';

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModeratorTable;
