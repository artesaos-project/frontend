import { z } from 'zod';

export const artisanProfileSchema = z
  .object({
    sicab: z.string().min(1, 'Obrigatório'),

    dataCadastro: z
      .string()
      .min(10, 'Data incompleta')
      .refine((value) => {
        const [day, month, year] = value.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return (
          date.getDate() === Number(day) &&
          date.getMonth() === Number(month) - 1 &&
          date.getFullYear() === Number(year)
        );
      }, 'Data inválida'),

    dataValidade: z
      .string()
      .min(10, 'Data incompleta')
      .refine((value) => {
        const [day, month, year] = value.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return (
          date.getDate() === Number(day) &&
          date.getMonth() === Number(month) - 1 &&
          date.getFullYear() === Number(year)
        );
      }, 'Data inválida'),
  })
  .refine(
    (data) => {
      const [d1, m1, y1] = data.dataCadastro.split('/');
      const [d2, m2, y2] = data.dataValidade.split('/');

      const cad = new Date(Number(y1), Number(m1) - 1, Number(d1));
      const val = new Date(Number(y2), Number(m2) - 1, Number(d2));

      return val >= cad;
    },
    {
      message: 'A data de validade deve ser maior ou igual à data de cadastro',
      path: ['dataValidade'],
    },
  );

export type ArtisanProfileFormData = z.infer<typeof artisanProfileSchema>;
