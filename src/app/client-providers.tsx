'use client';

import { FavoritesProvider } from '@/context/favorite-context';
import { FollowProvider } from '@/context/follow-context';
import { SearchProvider } from '@/context/SearchContext';
import useStoreUser from '@/hooks/use-store-user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const expiresAt = useStoreUser((state) => state.user.expiresAt);
  const isAuthenticated = useStoreUser((state) => state.user.isAuthenticated);
  const resetStore = useStoreUser((state) => state.resetStore);

  useEffect(() => {
    if (isAuthenticated && expiresAt) {
      const agora = Date.now();
      const tempoRestante = expiresAt - agora;

      if (tempoRestante <= 1) {
        resetStore();
      } else {
        const timer = setTimeout(() => {
          toast.error('Sua sessão expirou por favor, faça login novamente.');
          resetStore();
        }, tempoRestante);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, expiresAt, resetStore]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
      <FavoritesProvider>
        <FollowProvider>
          <SearchProvider>{children}</SearchProvider>
        </FollowProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}
