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
        userEmail: undefined,
        artisanUserName: undefined,
        isAuthenticated: false,
        isModerator: false,
        isArtisan: false,
        applicationId: undefined,
        postnedApplication: undefined,
        expiresAt: undefined,
      },
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      setUser: (user: UserProps) =>
        set(() => ({
          user: {
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
            isAuthenticated: true,
            userPhoto: user.userPhoto,
            artisanUserName: user.artisanUserName,
            isModerator: user.isModerator,
            isArtisan: user.isArtisan,
            applicationId: user.applicationId,
            postnedApplication: user.postnedApplication,
            expiresAt: user.expiresAt,
          },
        })),
      resetStore: () =>
        set(() => ({
          user: {
            userId: undefined,
            userName: undefined,
            userPhoto: undefined,
            userEmail: undefined,
            artisanUserName: undefined,
            isAuthenticated: false,
            isModerator: false,
            isArtisan: false,
            applicationId: undefined,
            postnedApplication: undefined,
            expiresAt: undefined,
          },
        })),
      updateUser: (data: Partial<UserProps>) =>
        set((state) => ({
          user: {
            ...state.user,
            ...data,
          },
        })),
    }),
    {
      name: 'loginStore',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useStoreUser;
