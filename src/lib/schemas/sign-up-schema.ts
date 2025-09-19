import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Digite um nome com pelo menos 2 letras.' }),
    email: z
      .string()
      .nonempty({ message: 'O e-mail é obrigatório.' })
      .email({ message: 'Digite um e-mail válido.' }),
    password: z
      .string()
      .min(8, { message: 'Senha inválida: mínimo de 8 caracteres.' })
      .regex(/[!@#$%*&^(),.?":{}|<>]/, {
        message: 'Senha inválida: precisa de caractere especial.',
      })
      .regex(/[A-Z]/, {
        message: 'Senha inválida: precisa de letra maiúscula.',
      })
      .regex(/[a-z]/, {
        message: 'Senha inválida: precisa de letra minúscula.',
      })
      .regex(/[0-9]/, { message: 'Senha inválida: precisa de número.' }),
    confirmPassword: z.string(),
    codigoPais: z
      .string()
      .nonempty({ message: 'O código do país é obrigatório.' }),
    ddd: z
      .string()
      .length(2, { message: 'O código de área deve ter 2 dígitos.' })
      .regex(/^\d{2}$/, {
        message: 'O código de área deve conter apenas números.',
      }),
    phone: z
      .string()
      .min(8, { message: 'O telefone deve ter no mínimo 8 dígitos.' })
      .max(9, { message: 'O telefone deve ter no máximo 9 dígitos.' })
      .regex(/^\d{8,9}$/, {
        message: 'O telefone deve possuir apenas números.',
      })
      .refine((phone) => phone.length !== 9 || phone.startsWith('9'), {
        message: 'Se o telefone tiver 9 dígitos, ele deve começar com 9.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais',
  });

export type SignUpData = z.infer<typeof signUpSchema>;

export const signUpSchemaArtisan = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Digite um nome com pelo menos 2 letras.' }),
    socialName: z.string().optional(),
    cpf: z.string().regex(/^\d{11}$/, {
      message: 'O CPF deve conter exatamente 11 números.',
    }),
    email: z
      .string()
      .nonempty({ message: 'O e-mail é obrigatório.' })
      .email({ message: 'Digite um e-mail válido.' }),
    birthDate: z
      .string()
      .nonempty({ message: 'A data de nascimento é obrigatória.' })
      .refine(
        (date) => {
          const birth = new Date(date);
          return !isNaN(birth.getTime()) && birth < new Date();
        },
        { message: 'Digite uma data válida no passado.' },
      )
      .refine(
        (date) => {
          const birth = new Date(date);
          const today = new Date();
          const minAge = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
          );
          return birth <= minAge;
        },
        { message: 'Você deve ter pelo menos 18 anos.' },
      ),
    password: z
      .string()
      .min(8, { message: 'Senha inválida: mínimo de 8 caracteres.' })
      .regex(/[!@#$%*&^(),.?":{}|<>]/, {
        message: 'Senha inválida: precisa de caractere especial.',
      })
      .regex(/[A-Z]/, {
        message: 'Senha inválida: precisa de letra maiúscula.',
      })
      .regex(/[a-z]/, {
        message: 'Senha inválida: precisa de letra minúscula.',
      })
      .regex(/[0-9]/, { message: 'Senha inválida: precisa de número.' }),
    confirmPassword: z.string(),
    codigoPais: z
      .string()
      .nonempty({ message: 'O código do país é obrigatório.' }),
    ddd: z
      .string()
      .length(2, { message: 'O código de área deve ter 2 dígitos.' })
      .regex(/^\d{2}$/, {
        message: 'O código de área deve conter apenas números.',
      }),
    phone: z
      .string()
      .min(8, { message: 'O telefone deve ter no mínimo 8 dígitos.' })
      .max(9, { message: 'O telefone deve ter no máximo 9 dígitos.' })
      .regex(/^\d{8,9}$/, {
        message: 'O telefone deve possuir apenas números.',
      })
      .refine((phone) => phone.length !== 9 || phone.startsWith('9'), {
        message: 'Se o telefone tiver 9 dígitos, ele deve começar com 9.',
      }),
    isArtisan: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais',
  });

export type SignUpDataArtisan = z.infer<typeof signUpSchemaArtisan>;
