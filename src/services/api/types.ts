export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  socialName?: string;
};

export interface CreateArtisanPayload {
  applicationId?: string;
  rawMaterial: string[];
  technique: string[];
  finalityClassification: string[];
  bio?: string;
  photosIds?: string[];
  sicab?: string;
  sicabRegistrationDate?: string;
  sicabValidUntil?: string;
  comercialName?: string;
  address?: string;
  zipCode?: string;
  addressNumber?: string;
  addressComplement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    artisanUsername?: string;
    roles: string[];
    applicationId?: string | null;
    postnedApplication: boolean | undefined;
  };
  session: { id: string; expiresAt: string };
  error?: boolean;
  message?: string;
  statusCode?: number;
}

export type ArtisanApplicationPayload = {
  rawMaterial: string[];
  technique: string[];
  finalityClassification: string;
  sicab: string;
  sicabRegistrationDate: string;
  sicabValidUntil: string;
};
