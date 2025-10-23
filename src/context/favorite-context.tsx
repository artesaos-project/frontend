'use client';

import { favoritesApi } from '@/services/api';
import {
  createContext,
  ReactNode,
  useContext,
  //useEffect,
  useState,
} from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  //useEffect(() => {
  //  const fetchFavorites = async () => {
  //    try {
  //      const response = await favoritesApi.getAll();
  //      setFavorites(response);
  //    } catch (err) {
  //      console.error('Erro ao carregar favoritos', err);
  //    }
  //  };
  //  fetchFavorites();
  //}, []);

  const toggleFavorite = async (productId: string) => {
    try {
      await favoritesApi.like(productId);
      setFavorites((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    } catch (err) {
      console.error('Erro ao atualizar favorito', err);
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
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
