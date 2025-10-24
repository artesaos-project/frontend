'use client';

import useUserStore from '@/hooks/use-store-user';
import { favoritesApi } from '@/services/api';
import { FavoritesApiResponse, Product } from '@/types/favorite';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

interface FavoritesContextType {
  favorites: string[];
  favoriteProducts: Product[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      setFavorites([]);
      setFavoriteProducts([]);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response: FavoritesApiResponse = await favoritesApi.getAll();
        const products = response.data.products;
        const ids = products.map((p) => p.id);

        setFavorites(ids);
        setFavoriteProducts(products);
      } catch (err) {
        console.error('Erro ao carregar favoritos', err);
        setFavorites([]);
        setFavoriteProducts([]);
      }
    };

    fetchFavorites();
  }, [user?.isAuthenticated]);

  const toggleFavorite = async (productId: string) => {
    if (!user?.isAuthenticated) {
      toast.warning('Faça login para adicionar produtos aos favoritos.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1000);
      return;
    }

    try {
      await favoritesApi.like(productId);

      const isAlreadyFavorite = favorites.includes(productId);

      setFavorites((prev) =>
        isAlreadyFavorite
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );

      if (isAlreadyFavorite) {
        setFavoriteProducts((prev) => prev.filter((p) => p.id !== productId));
        toast.warning('Produto removido dos favoritos');
      } else {
        const response: FavoritesApiResponse = await favoritesApi.getAll();
        setFavoriteProducts(response.data.products);
        toast.success('Produto adicionado aos favoritos');
      }
    } catch (err) {
      console.error('Erro ao atualizar favorito', err);
      toast.error('Não foi possível atualizar os favoritos.');
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoriteProducts, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error('useFavorites precisa estar dentro de FavoritesProvider');
  return context;
};
