import { UserProps } from "@/types/UserProps";
import { useCallback } from "react";
import { SignUpData } from "../lib/schemas/signUpSchema";
import { authApi } from "@/services/api";

async function traduzirErro(mensagem: string): Promise<string> {
  try {
    const texto = Array.isArray(mensagem) ? mensagem.join(" ") : mensagem;
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        texto
      )}&langpair=en|pt-br`
    );

    if (!res.ok) {
      throw new Error("Translation service unavailable");
    }

    const data = await res.json();
    return data.responseData?.translatedText || texto;
  } catch (error) {
    console.warn("Translation failed, using original message:", error);
    return mensagem;
  }
}

export const useSignUpLogic = (
  setUser: (user: UserProps) => void,
  setUiError: (error: string | null) => void
) => {
  const showUiError = useCallback(async (message: string) => {
    const traduzida = await traduzirErro(message);
    setUiError(traduzida);
  }, [setUiError]);

  const createUser = useCallback(
    async (data: SignUpData): Promise<{success: boolean, userData?: any}> => {
      try {
        const payload = {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate,
          phone: `${data.codigoPais}${data.ddd}${data.phone}`,
          ...(data.socialName &&
            data.socialName.trim() !== "" && { socialName: data.socialName }),
        };

        const body = await authApi.createUser(payload);
        const isModerator = body.roles.includes("MODERATOR") ? true : false;
  
        if(data.isArtisan){
          setUiError("Usuário criado! Complete o cadastro artesão.");
  
          return {
            success: true,
            userData: body,
          };
        } else {
            const user: UserProps = {
              userId: body.userId,
              userName: body.name,
              userPhoto: body.avatar,
              isModerator: isModerator
            };
            setUser(user);
            setUiError("Usuário criado e logado com sucesso!");
  
            return { success: true };
        }
      } catch (err: any) {
        if (err.status === 400 && err.errors) {
          console.error("Validation errors detected");
          return {
            success: false
          };
        } else if (err.status === 409) {
          const msgTraduzida = await traduzirErro(err.message);
          await showUiError(msgTraduzida || "Usuário já existe.");
          return { success: false };
        }
  
        await showUiError(err.message || "Erro inesperado.");
        return { success: false };
      }
    },
    [showUiError, setUser]
  );

  return {
    createUser,
    showUiError,
    traduzirErro,
  };
};