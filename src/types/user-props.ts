export type UserProps = {
  userId: string | undefined;
  userName: string | undefined;
  isAuthenticated?: boolean;
  isModerator?: boolean;
  isArtisan?: boolean;
};

export type UserStore = {
  user: UserProps;
  setUser: (user: UserProps) => void;
  resetStore: () => void;
};
