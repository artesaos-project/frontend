'use client';
import useUserStore from '@/hooks/use-store-user';
import { followersApi } from '@/services/api';
import { FollowResponse } from '@/types/follow';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

interface FollowContextType {
  followers: string[];
  toggleFollow: (artisanId: string) => Promise<void>;
  isFollowing: (artisanId: string) => boolean;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const FollowProvider = ({ children }: { children: ReactNode }) => {
  const [followers, setFollowers] = useState<string[]>([]);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      setFollowers([]);
      return;
    }

    const fetchFollowers = async () => {
      try {
        const response: FollowResponse = await followersApi.getAll();
        const followers = response.data.following.map(
          (item) => item.artisan.id,
        );
        setFollowers(followers);
      } catch (err) {
        console.error('Erro ao carregar seguidores', err);
        setFollowers([]);
      }
    };

    fetchFollowers();
  }, [user?.isAuthenticated]);

  const toggleFollow = async (artisanId: string) => {
    if (!user?.isAuthenticated) {
      toast.warning('Faça login para seguir artesãos.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1000);
      return;
    }

    try {
      await followersApi.toggleFollow(artisanId);

      const isAlreadyFollowing = followers.includes(artisanId);

      setFollowers((prevFollowers) =>
        isAlreadyFollowing
          ? prevFollowers.filter((id) => id !== artisanId)
          : [...prevFollowers, artisanId],
      );

      toast.success(
        isAlreadyFollowing
          ? 'Você deixou de seguir o artesão.'
          : 'Você seguiu o artesão com sucesso.',
      );
    } catch (err) {
      console.error('Erro ao seguir/deixar de seguir artesão', err);
      toast.error('Não foi possível atualizar o status de seguimento.');
    }

    if (isFollowing(artisanId)) {
      followers.splice(followers.indexOf(artisanId), 1);
    } else {
      followers.push(artisanId);
    }
  };

  const isFollowing = (artisanId: string) => {
    return followers.includes(artisanId);
  };

  return (
    <FollowContext.Provider value={{ followers, toggleFollow, isFollowing }}>
      {children}
    </FollowContext.Provider>
  );
};

export function useFollowContext() {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error(
      'useFollowContext precisa estar dentro de FollowContextProvider',
    );
  }
  return context;
}

export default FollowContext;
