import z from 'zod';

export const addressSchema = z.object({
  nomeComercial: z.string().optional(),
  cep: z
    .string()
    .min(8, 'CEP deve conter 8 números')
    .max(8, 'CEP deve conter 8 números')
    .regex(/^[0-9]+$/, 'CEP deve conter apenas números'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  complemento: z.string().optional(),
  numero: z.string().min(1, 'Número é obrigatório'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(1, 'Estado é obrigatório'),
});
