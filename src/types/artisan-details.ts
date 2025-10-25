export interface ArtisanDetails {
  id: string;
  userId: string;
  formStatus: string;
  status: string;
  artisanName: string;
  comercialName: string;
  artisanPhone: string;
  artisanEmail: string;
  artisanAvatarUrl: string | null;
  zipCode: string;
  address: string;
  addressNumber: string;
  addressComplement?: string;
  neighborhood: string;
  city: string;
  state: string;
  rawMaterial: string[];
  technique: string[];
  finalityClassification: string[];
  sicab: string | null;
  sicabRegistrationDate: string | null;
  sicabValidUntil: string | null;
  bio: string | null;
  photos: string[];
}

// Alias para manter compatibilidade com código antigo (deprecated)
export type artisanDetails = ArtisanDetails;
