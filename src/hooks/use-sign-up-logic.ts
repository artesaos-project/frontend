import { authApi } from '@/services/api';
import { UserProps } from '@/types/user-props';
import { useCallback } from 'react';
import { SignUpData } from '../lib/schemas/sign-up-schema';

interface ApiError {
  status?: number;
  errors?: unknown;
  message?: string;
}

async function traduzirErro(mensagem: string): Promise<string> {
  try {
    const texto = Array.isArray(mensagem) ? mensagem.join(' ') : mensagem;
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        texto,
      )}&langpair=en|pt-br`,
    );

    if (!res.ok) {
      throw new Error('Translation service unavailable');
    }

    const data = await res.json();
    return data.responseData?.translatedText || texto;
  } catch (error) {
    console.warn('Translation failed, using original message:', error);
    return mensagem;
  }
}

export const useSignUpLogic = (
  setUser: (user: UserProps) => void,
  setUiError: (error: string | null) => void,
) => {
  const showUiError = useCallback(
    async (message: string) => {
      const traduzida = await traduzirErro(message);
      setUiError(traduzida);
    },
    [setUiError],
  );

  const createUser = useCallback(
    async (
      data: SignUpData,
    ): Promise<{ success: boolean; userData?: unknown }> => {
      try {
        const payload = {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate,
          phone: `${data.codigoPais}${data.ddd}${data.phone}`,
          ...(data.socialName &&
            data.socialName.trim() !== '' && { socialName: data.socialName }),
        };

        const body = await authApi.createUser(payload);
        const isModerator = body.roles.includes('MODERATOR');
        const isArtisan = body.roles.includes('ARTISAN');

        if (data.isArtisan) {
          setUiError('Usuário criado! Complete o cadastro artesão.');

          return {
            success: true,
            userData: body,
          };
        }
        const user: UserProps = {
          userId: body.userId,
          userName: body.name,
          userPhoto: body.avatar,
          isModerator,
          isArtisan,
        };
        setUser(user);
        setUiError('Usuário criado e logado com sucesso!');

        return { success: true };
      } catch (err: unknown) {
        const error = err as ApiError;
        if (error.status === 400 && error.errors) {
          console.error('Validation errors detected');
          return {
            success: false,
          };
        }
        if (error.status === 409) {
          const msgTraduzida = await traduzirErro(
            error.message || 'Usuário já existe.',
          );
          await showUiError(msgTraduzida);
          return { success: false };
        }

        await showUiError(error.message || 'Erro inesperado.');
        return { success: false };
      }
    },
    [showUiError, setUser, setUiError],
  );

  return {
    createUser,
    showUiError,
    traduzirErro,
  };
};
