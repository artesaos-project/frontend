'use client';
import ModeratorCard from '../../components/features/moderator/ModeratorCard';
import ModeratorHeader from '../../components/features/moderator/ModeratorHeader';
import ModeratorTitle from '../../components/features/moderator/ModeratorTitle';
import ModeratorNotification from '../../components/features/moderator/ModeratorNotification';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import useStoreUser from '@/hooks/useStoreUser';
import { useRouter } from 'next/navigation';

function page() {
  const user = useStoreUser((state) => state.user);
  const router = useRouter();
  // useEffect(() => {
  //   if (!user.isAuthenticated || !user.isModerator) {
  //     router.push("/");
  //   }
  // }, [user]);
  return (
    <div className="overflow-x-hidden">
      <ModeratorHeader />
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
      <Footer newsSubscription={false} />
    </div>
  );
}

export default page;
