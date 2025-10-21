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

export interface GetMyProfile {
  id: string;
  name: string;
  socialName?: string | null;
  phone: string;
  email: string;
  avatar?: string | null;
  artisanUserName?: string;
  bio?: string | null;
  sicab?: string;
  sicabRegistrationDate?: Date | null;
  sicabValidUntil?: Date | null;
  followersCount?: number;
  productsCount?: number;
  rawMaterial?: string[];
  technique?: string[];
  finalityClassification?: string[];
  cep: string;
  state: string;
  city: string;
  address?: string | null;
  ddd?: string | null;
  avatarId?: string | null;
}
