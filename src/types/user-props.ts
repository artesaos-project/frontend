export type UserProps = {
  userId: string | undefined;
  userName: string | undefined;
  userPhoto?: string | undefined | null;
  userEmail?: string | undefined;
  artisanUserName?: string | undefined;
  isAuthenticated?: boolean;
  isModerator?: boolean;
  isArtisan?: boolean;
  applicationId?: string | null;
  postnedApplication: boolean | undefined;
  expiresAt?: number | null;
};

export type UserStore = {
  user: UserProps;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setUser: (user: UserProps) => void;
  resetStore: () => void;
  updateUser: (user: Partial<UserProps>) => void;
};
