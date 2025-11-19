import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  category: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma categoria')
    .max(5, 'Máximo de 5 categorias'),
  technical: z
    .array(z.string())
    .min(1, 'Selecione pelo menos uma técnica')
    .max(10, 'Máximo de 10 técnicas'),
  unitPrice: z
    .string()
    .min(1, 'Preço é obrigatório')
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      'Preço deve ser maior que zero',
    ),
  stock: z
    .string()
    .min(1, 'Estoque é obrigatório')
    .refine(
      (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0,
      'Estoque deve ser um número válido',
    ),
  isCustomOrder: z.boolean(),
  necessaryDays: z.string().optional().or(z.literal('')),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
