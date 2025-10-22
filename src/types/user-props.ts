export type UserProps = {
  userId: string | undefined;
  userName: string | undefined;
  userPhoto?: string | undefined;
  artisanUserName?: string | undefined;
  isAuthenticated?: boolean;
  isModerator?: boolean;
  isArtisan?: boolean;
  postnedApplication?: boolean;
};

export type UserStore = {
  user: UserProps;
  setUser: (user: UserProps) => void;
  resetStore: () => void;
};
