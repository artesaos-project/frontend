export type UserProps = {
  userId: string | undefined;
  userName: string | undefined;
  userPhoto?: string | undefined;
  userEmail?: string | undefined;
  artisanUserName?: string | undefined;
  isAuthenticated?: boolean;
  isModerator?: boolean;
  isArtisan?: boolean;
  postnedApplication?: boolean;
};

export type UserStore = {
  user: UserProps;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setUser: (user: UserProps) => void;
  resetStore: () => void;
};
