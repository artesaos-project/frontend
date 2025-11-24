import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useStoreUser from './use-store-user';

/**
 * Hook para proteger rotas que requerem autenticação de moderador
 * Aguarda a hidratação do Zustand antes de verificar autenticação e permissão de moderador
 * @returns { hasHydrated, isAuthenticated, isModerator, user }
 */
export function useModeratorGuard() {
  const router = useRouter();
  const user = useStoreUser((state) => state.user);
  const hasHydrated = useStoreUser((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      if (!user.isAuthenticated) {
        router.replace('/auth/login');
      } else if (!user.isModerator) {
        router.replace('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  return {
    hasHydrated,
    isAuthenticated: user.isAuthenticated,
    isModerator: user.isModerator,
    user,
  };
}
