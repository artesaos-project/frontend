import { z } from 'zod';

export const artisanProfileSchema = z.object({
  sicab: z.string().min(1, 'Campo obrigatório'),
  dataCadastro: z
    .string()
    .min(10, 'Data inválida')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato deve ser DD/MM/AAAA'),
  dataValidade: z
    .string()
    .min(10, 'Data inválida')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato deve ser DD/MM/AAAA'),
});

export type ArtisanProfileFormData = z.infer<typeof artisanProfileSchema>;
