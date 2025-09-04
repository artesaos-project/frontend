import { create } from "zustand";
import { UserProps, UserStore } from "@/types/UserProps";
import { persist } from "zustand/middleware";

const useStoreUser = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        userId: undefined,
        userName: undefined,
        userPhoto: undefined,
        userTag: undefined,
        isAuthenticated: true,
        isModerator: true,
        isArtisan: true,
      },
      setUser: (user: UserProps) =>
        set(() => ({
          user: {
            userId: user.userId,
            userName: user.userName,
            userPhoto: user.userPhoto,
            userTag: user.userTag,
            isAuthenticated: true,
            isModerator: user.isModerator,
            isArtisan: user.isArtisan,
          },
        }))
      ,
      resetStore: () =>
        set(() => ({
          user: {
            userId: undefined,
            userName: undefined,
            userPhoto: undefined,
            userTag: undefined,
            isAuthenticated: false,
            isModerator: false,
            isArtisan: false,
          },
        })),
    }),
    {
      name: "loginStore",
    }
  )
);

export default useStoreUser;
