import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ArtisanRegisterState {
  nomeComercial?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;

  sicab?: string;
  sicabDataCadastro?: string;
  sicabValidade?: string;

  materiasPrimas: string[];
  tecnicas: string[];
  finalidades: string[];

  historico?: string;

  update: (data: Partial<ArtisanRegisterState>) => void;
  reset: () => void;
}

export const useArtisanRegister = create<ArtisanRegisterState>()(
  persist(
    (set) => ({
      materiasPrimas: [],
      tecnicas: [],
      finalidades: [],
      midias: [],
      update: (data) => set((prev) => ({ ...prev, ...data })),
      reset: () =>
        set({
          nomeComercial: undefined,
          cep: undefined,
          endereco: undefined,
          numero: undefined,
          bairro: undefined,
          complemento: undefined,
          cidade: undefined,
          estado: undefined,
          sicab: undefined,
          sicabDataCadastro: undefined,
          sicabValidade: undefined,
          materiasPrimas: [],
          tecnicas: [],
          finalidades: [],
          historico: undefined,
        }),
    }),
    { name: 'artisan-register' },
  ),
);
