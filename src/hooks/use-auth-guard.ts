import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useStoreUser from './use-store-user';

/**
 * Hook para proteger rotas que requerem autenticação
 * Aguarda a hidratação do Zustand antes de verificar autenticação
 * @returns { hasHydrated, isAuthenticated, user }
 */
export function useAuthGuard() {
  const router = useRouter();
  const user = useStoreUser((state) => state.user);
  const hasHydrated = useStoreUser((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated && !user.isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [hasHydrated, user.isAuthenticated, router]);

  return {
    hasHydrated,
    isAuthenticated: user.isAuthenticated,
    user,
  };
}
