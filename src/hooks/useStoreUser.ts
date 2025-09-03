import { create } from "zustand";
import { UserProps, UserStore } from "@/types/UserProps";
import { persist } from "zustand/middleware";

const useStoreUser = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        userId: "",
        userName: "",
        userPhoto: "",
        userTag: "",
        isAuthenticated: false,
        isModerator: false,
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
          },
        })),
      resetStore: () =>
        set(() => ({
          user: {
            userId: "",
            userName: "",
            userPhoto: "",
            userTag: "",
            isAuthenticated: false,
            isModerator: false,
          },
        })),
    }),
    {
      name: "loginStore",
    }
  )
);

export default useStoreUser;
