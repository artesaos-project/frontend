'use client';

import ModerationCard from '@/components/features/moderator/moderation-card';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import { artisanApi, reportApi } from '@/services/api';
import { useEffect, useState } from 'react';

function Page() {
  const [artisansStats, setArtisansStats] = useState({
    pending: 0,
    finished: 0,
  });
  const [reportsStats, setReportsStats] = useState({
    pending: 0,
    finished: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);

        // Buscar artesãos pendentes (PENDING com formStatus SUBMITTED)
        const pendingArtisans = await artisanApi.getApplications({
          type: 'BE_ARTISAN',
          status: 'PENDING',
          formStatus: 'SUBMITTED',
          limit: 1,
        });

        // Buscar artesãos finalizados (APPROVED ou REJECTED)
        const [approvedArtisans, rejectedArtisans] = await Promise.all([
          artisanApi.getApplications({
            type: 'BE_ARTISAN',
            status: 'APPROVED',
            limit: 1,
          }),
          artisanApi.getApplications({
            type: 'BE_ARTISAN',
            status: 'REJECTED',
            limit: 1,
          }),
        ]);

        setArtisansStats({
          pending: pendingArtisans.pagination?.total || 0,
          finished:
            (approvedArtisans.pagination?.total || 0) +
            (rejectedArtisans.pagination?.total || 0),
        });

        // Buscar denúncias pendentes e resolvidas
        const [pendingReports, solvedReports] = await Promise.all([
          reportApi.listReports({ isSolved: false, limit: 1 }),
          reportApi.listReports({ isSolved: true, limit: 1 }),
        ]);

        setReportsStats({
          pending: pendingReports.pagination?.total || 0,
          finished: solvedReports.pagination?.total || 0,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <ModerationTitle title={'Moderação'} />
      <div className="w-2/3 mx-auto grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-3 gap-10 mb-20 mt-16">
        <ModerationCard
          href="/moderator/artisans"
          title={'Artesãos'}
          description={'Aprovar ou rejeitar aplicações de artesãos'}
          pending={isLoading ? 0 : artisansStats.pending}
          finished={isLoading ? 0 : artisansStats.finished}
        />

        <ModerationCard
          href="/moderator/users"
          title={'Usuários'}
          description={'Gerenciar usuários da plataforma'}
        />
        <ModerationCard
          href="/moderator/reports"
          title={'Denúncias'}
          description={'Analisar denúncias feitas por usuários'}
          pending={isLoading ? 0 : reportsStats.pending}
          finished={isLoading ? 0 : reportsStats.finished}
        />
      </div>
    </div>
  );
}

export default Page;
