export type UserProps = {
  userId: string;
  userName: string;
  userPhoto: string;
  isAuthenticated?: boolean;
  isModerator?: boolean;
};

export type UserStore = {
  user: UserProps;
  setUser: (user: UserProps) => void;
  resetStore: () => void;
};
