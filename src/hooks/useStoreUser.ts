import { create } from 'zustand';
import { UserProps, UserStore } from '@/types/UserProps';
import { persist } from 'zustand/middleware';

const useStoreUser = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        userId: undefined,
        userName: undefined,
        userPhoto: undefined,
        artisanUserName: undefined,
        isAuthenticated: false,
        isModerator: false,
        isArtisan: false,
      },
      setUser: (user: UserProps) =>
        set(() => ({
          user: {
            userId: user.userId,
            userName: user.userName,
            userPhoto: user.userPhoto,
            artisanUserName: user.artisanUserName,
            isAuthenticated: true,
            isModerator: user.isModerator,
            isArtisan: user.isArtisan,
          },
        })),
      resetStore: () =>
        set(() => ({
          user: {
            userId: undefined,
            userName: undefined,
            userPhoto: undefined,
            artisanUserName: undefined,
            isAuthenticated: false,
            isModerator: false,
            isArtisan: false,
          },
        })),
    }),
    {
      name: 'loginStore',
    },
  ),
);

export default useStoreUser;
