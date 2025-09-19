export interface ArtisanProfile {
  userId: string;
  artisanName: string;
  userName: string;
  socialName: string | null;
  followersCount: number;
  productsCount: number;
  phoneNumber: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}
