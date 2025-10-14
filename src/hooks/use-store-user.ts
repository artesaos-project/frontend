import { UserProps, UserStore } from '@/types/user-props';
import { create } from 'zustand';
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
            isAuthenticated: true,
            userPhoto: user.userPhoto,
            artisanUserName: user.artisanUserName,
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
