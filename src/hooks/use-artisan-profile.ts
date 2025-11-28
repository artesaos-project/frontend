import { artisanApi } from '@/services/api';
import { ArtisanProfile } from '@/types/artisan';
import { useQuery } from '@tanstack/react-query';

export const useArtisanProfile = (userName: string) => {
  return useQuery<ArtisanProfile>({
    queryKey: ['artisan-profile', userName],
    queryFn: () => artisanApi.getProfile(userName),
    enabled: !!userName,
    staleTime: 1000 * 60 * 5,
  });
};
