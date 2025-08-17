"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInput from "@/components/AuthenticationModal/SignInput";
import { Button } from "@/components/ui/button";
import { FaExclamationTriangle, FaRegCalendarAlt } from "react-icons/fa";
import { DialogTitle } from "@radix-ui/react-dialog";

// Validação com Zod para artesão
const artisanSchema = z.object({
  cep: z
    .string()
    .nonempty({ message: "CEP é obrigatório." })
    .length(8, { message: "CEP inválido: deve ter 8 dígitos." }),
  street: z.string().nonempty({ message: "Logradouro é obrigatório." }),
  number: z.string().nonempty({ message: "Número é obrigatório." }),
  neighborhood: z.string().nonempty({ message: "Bairro é obrigatório." }),
  city: z.string().nonempty({ message: "Cidade é obrigatória." }),
  state: z.string().nonempty({ message: "Estado é obrigatório." }),
  rawMaterial: z.string().nonempty({ message: "Matéria-prima é obrigatória." }),
  technique: z.string().nonempty({ message: "Técnica é obrigatória." }),
  finalityClassification: z
    .string()
    .nonempty({ message: "Classificação da finalidade é obrigatória." }),
  sicab: z.string().nonempty({ message: "SICAB é obrigatório." }),
  sicabRegistration: z
    .string()
    .nonempty({ message: "Data de cadastro SICAB é obrigatória." }),
  sicabValidity: z
    .string()
    .nonempty({ message: "Data de validade SICAB é obrigatória." }),
});

type ArtisanData = z.infer<typeof artisanSchema>;

// Função para traduzir mensagens de erro
async function traduzirErro(mensagem: string): Promise<string> {
  const texto = Array.isArray(mensagem) ? mensagem.join(" ") : mensagem;
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      texto
    )}&langpair=en|pt-br`
  );
  const data = await res.json();
  return data.responseData.translatedText || texto;
}


// Componente principal
function ArtisanSignUpPage({
  children,
  artisanId,
  onSuccess,
}: {
  children: React.ReactNode;
  artisanId: string | null;
  onSuccess: () => void; 
}) {
  const [uiError, setUiError] = useState<string | null>(null);
  const [sicabRegistrationType, setSicabRegistrationType] = useState<
    "text" | "date"
  >("text");
  const [sicabValidityType, setSicabValidityType] = useState<"text" | "date">(
    "text"
  );
  const [showFormError, setShowFormError] = useState(false);

  const showUiError = async (message: string) => {
    const traduzida = await traduzirErro(message);
    setUiError(traduzida);
    setTimeout(() => setUiError(null), 5000);
  };

  // Função para criar artesão
  async function createArtisan(data: ArtisanData) {
    try {

      const res = await fetch("http://localhost:3333/artisan-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          rawMaterial: data.rawMaterial,
          technique: data.technique,
          finalityClassification: data.finalityClassification,
          sicab: data.sicab,
          sicabRegistrationDate: data.sicabRegistration,
          sicabValidUntil: data.sicabValidity,
        }),
      });

      const contentType = res.headers.get("content-type");
      let body = null;
      if (contentType && contentType.includes("application/json")) {
        body = await res.json();
      } else {
        body = await res.text();
      }

      if (!res.ok) {
        if (res.status === 400 && body.errors) {
          await Promise.all(
            (
              Object.entries(body.errors) as [keyof ArtisanData, string[]][]
            ).map(async ([field, msgs]) => {
              const msgTraduzida = await traduzirErro(msgs[0]);
              setFormError(field as keyof ArtisanData, {
                type: "server",
                message: msgTraduzida,
              });
            })
          );
          return;
        }
        if (res.status === 409) {
          await showUiError(body.message || "Usuário já existe.");
          return;
        }
        await showUiError(body.message || "Erro ao criar usuário.");
        return;
      }

      await showUiError("sucesso: Artesão foi enviado para analise.");
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (error) {
      console.error("Erro ao criar artesão:", error);
    }
  }

  // Configuração do formulário
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm<ArtisanData>({
    resolver: zodResolver(artisanSchema),
  });

  // Busca endereço pelo CEP
  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);

        clearErrors(["street", "neighborhood", "city", "state"]);
      }
    } catch {
      console.error("Erro ao buscar CEP:", e);
    }
  };

  const onSubmit: SubmitHandler<ArtisanData> = async (data) => {
    await createArtisan(data);
  };

  // Exibir erro de formulário se houver e ocultar após 5 segundos
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShowFormError(true);
      setTimeout(() => setShowFormError(false), 5000);
    }
  }, [errors]);

  // Renderização do componente
  return (
    <div className="justify-center p-4 py-2 w-full overflow-y-auto">
      <div className="rounded-3xl text-[#985E00] font-bold w-full">
        <div className="text-black font-normal mb-4">
          {showFormError ? (
            <div className="flex items-center justify-center text-white bg-magenta mb-4 p-4 rounded-3xl text-[10px] font-bold w-full">
              <FaExclamationTriangle className="mr-1" />
              <span>Campo obrigatório ou com formato inválido.</span>
            </div>
          ) : (
            <>
              {children}
              <DialogTitle className="text-2xl font-bold mb-2">
                Bem-Vindo Artesao!
              </DialogTitle>
              <p>Vamos continuar o seu cadastro</p>
            </>
          )}
        </div>

        {uiError && (
          <div
            className={`mb-4 p-3 rounded-lg text-xs text-center ${
              uiError.includes("sucesso")
                ? "bg-mint-600 text-white"
                : "bg-magenta text-white"
            }`}
          >
            <div className="flex items-center text-xs justify-center">
              {!uiError.includes("sucesso") && (
                <FaExclamationTriangle className="mr-2" />
              )}
              <span>{uiError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <SignInput
              placeholder="CEP*"
              type="text"
              maxLength={8}
              {...register("cep")}
              onBlur={handleCepBlur}
              hasError={!!errors.cep}
              errorMessage={errors.cep?.message}
            />
          </div>

          <div>
            <SignInput
              placeholder="Logradouro*"
              type="text"
              {...register("street")}
              hasError={!!errors.street}
              errorMessage={errors.street?.message}
            />
          </div>

          <div>
            <div className="grid grid-cols-10 gap-2">
              <SignInput
                className="col-span-3"
                placeholder="N°"
                type="text"
                hasError={!!errors.number}
                {...register("number")}
              />
              <SignInput
                className="col-span-7"
                placeholder="Bairro*"
                type="text"
                hasError={!!errors.neighborhood}
                {...register("neighborhood")}
              />
              <SignInput
                className="col-span-6"
                placeholder="Cidade*"
                type="text"
                hasError={!!errors.city}
                {...register("city")}
              />
              <SignInput
                className="col-span-4"
                placeholder="Estado*"
                type="text"
                maxLength={2}
                hasError={!!errors.state}
                {...register("state")}
              />
            </div>

            {(errors.number ||
              errors.street ||
              errors.city ||
              errors.state) && (
              <p className="text-sm text-magenta font-normal">
                {errors.number?.message ||
                  errors.neighborhood?.message ||
                  errors.city?.message ||
                  errors.state?.message}
              </p>
            )}
          </div>

          <div>
            <select
              className={`w-full p-2 h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40 bg-mint
                ${
                  errors.rawMaterial
                    ? "text-magenta border-2 border-magenta"
                    : "text-mint-700"
                }`}
              {...register("rawMaterial")}
            >
              <option value="">Matéria-prima*</option>
              <option value="madeira">Madeira</option>
              <option value="ceramica">Cerâmica</option>
              <option value="tecido">Tecido</option>
            </select>
            {errors.rawMaterial && (
              <p className="text-sm text-magenta font-normal">
                {errors.rawMaterial.message}
              </p>
            )}
          </div>

          <div>
            <select
              className={`w-full p-2 h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40 bg-mint
                ${
                  errors.technique
                    ? "text-magenta border-2 border-magenta"
                    : "text-mint-700"
                }`}
              {...register("technique")}
            >
              <option value="">Técnica*</option>
              <option value="entalhe">Entalhe</option>
              <option value="tintureiro">Tintureiro</option>
              <option value="pintura">Pintura</option>
            </select>
            {errors.technique && (
              <p className="text-sm text-magenta font-normal">
                {errors.technique.message}
              </p>
            )}
          </div>

          <div>
            <select
              className={`w-full p-2 h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40 bg-mint
                ${
                  errors.finalityClassification
                    ? "text-magenta border-2 border-magenta"
                    : "text-mint-700"
                }`}
              {...register("finalityClassification")}
            >
              <option
                value=""
                className={errors.finalityClassification ? "text-magenta" : ""}
              >
                Classificação Finalidade*
              </option>
              <option value="decorativo">Decorativo</option>
              <option value="utilitario">Utilitário</option>
            </select>
            {errors.finalityClassification && (
              <p className="text-sm text-magenta font-normal">
                {errors.finalityClassification.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <div className="relative">
              <SignInput
                className="bg-mint text-mint-700 placeholder:text-mint-700 rounded-3xl"
                placeholder="Sicab*"
                type="text"
                {...register("sicab")}
                hasError={!!errors.sicab}
                errorMessage={errors.sicab?.message}
              />
            </div>
          </div>

          <div className="relative">
            <SignInput
              className="bg-mint text-mint-700 placeholder:text-mint-700 rounded-3xl"
              placeholder="Data de Cadastro SICAB*"
              type={sicabRegistrationType}
              {...register("sicabRegistration")}
              onFocus={() => setSicabRegistrationType("date")}
              onBlur={() => setSicabRegistrationType("text")}
              icon={
                sicabRegistrationType === "text" ? <FaRegCalendarAlt /> : null
              }
              iconPosition="right"
              iconClassName="absolute right-3 top-1/2 transform -translate-y-1/2"
              hasError={!!errors.sicabRegistration}
              errorMessage={errors.sicabRegistration?.message}
            />
          </div>

          <div className="relative text-mint-700">
            <SignInput
              className="bg-mint text-mint-700 placeholder:text-mint-700 rounded-3xl"
              placeholder="Data de Validade SICAB*"
              type={sicabValidityType}
              {...register("sicabValidity")}
              onFocus={() => setSicabValidityType("date")}
              onBlur={() => setSicabValidityType("text")}
              icon={sicabValidityType === "text" ? <FaRegCalendarAlt /> : null}
              iconPosition="right"
              iconClassName="absolute right-3 top-1/2 transform -translate-y-1/2"
              hasError={!!errors.sicabValidity}
              errorMessage={errors.sicabValidity?.message}
            />
          </div>

          <div className="text-sm text-gray-600 text-center mb-6 font-normal">
            <p>
              Ao continuar, você concorda com os
              <br />
              <a href="#" className="underline text-black">
                Termos de Uso e Privacidade
              </a>
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[191px] h-[42px] bg-solar-700 hover:bg-[#c05000] text-white rounded-[20px] border-b-4 border-[#a04500]"
            >
              {isSubmitting ? "Processando..." : "Continuar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArtisanSignUpPage;
