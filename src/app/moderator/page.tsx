'use client';

import ModeratorCard from '@/components/features/moderator/moderator-card';
import ModeratorNotification from '@/components/features/moderator/moderator-notification';
import ModeratorTitle from '@/components/features/moderator/moderator-title';

function page() {
  return (
    <div className="overflow-x-hidden">
      <ModeratorTitle title={'Moderação'} />
      <div className="w-2/3 mx-auto grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-4 gap-10 mb-20 mt-16">
        <ModeratorCard
          title={'Artesãos'}
          description={'Aprovar, editar, desativar contas...'}
          pending={0}
          finished={56}
        />
        <ModeratorCard
          title={'Produtos'}
          description={'Visualizar, excluir produtos.'}
          pending={0}
          finished={56}
        />
        <ModeratorCard
          title={'Denúncias'}
          description={'Gerenciar denúncias'}
          pending={0}
          finished={56}
        />
        <ModeratorCard
          title={'Documentação'}
          description={'Acessar documentos importantes.'}
          pending={0}
          finished={56}
        />
      </div>
      <ModeratorNotification />
    </div>
  );
}

export default page;
