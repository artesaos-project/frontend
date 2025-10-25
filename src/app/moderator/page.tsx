'use client';

import ModerationCard from '@/components/features/moderator/moderation-card';
import ModerationNotification from '@/components/features/moderator/moderation-notification';
import ModerationTitle from '@/components/features/moderator/moderation-title';

function page() {
  return (
    <div className="overflow-x-hidden">
      <ModerationTitle title={'Moderação'} />
      <div className="w-2/3 mx-auto grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-4 gap-10 mb-20 mt-16">
        <ModerationCard
          title={'Artesãos'}
          description={'Aprovar, editar, desativar contas...'}
          pending={0}
          finished={56}
        />
        <ModerationCard
          title={'Produtos'}
          description={'Visualizar, excluir produtos.'}
          pending={0}
          finished={56}
        />
        <ModerationCard
          title={'Denúncias'}
          description={'Gerenciar denúncias'}
          pending={0}
          finished={56}
        />
        <ModerationCard
          title={'Documentação'}
          description={'Acessar documentos importantes.'}
          pending={0}
          finished={56}
        />
      </div>
      <ModerationNotification />
    </div>
  );
}

export default page;
