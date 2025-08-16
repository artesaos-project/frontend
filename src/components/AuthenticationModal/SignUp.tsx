"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { DialogTitle, DialogClose, DialogContent, Dialog, DialogOverlay } from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FaExclamationTriangle, FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SignInput from "./SignInput";
import useStoreUser from "@/hooks/useStoreUser";
import { UserProps } from "@/types/UserProps";
import SignUpArtesian from "./SignUpArtesian";

// --- Validação com Zod ---
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Digite um nome com pelo menos 2 letras." }),
    socialName: z.string().optional(),
    cpf: z.string().regex(/^\d{11}$/, {
      message: "O CPF deve conter exatamente 11 números.",
    }),
    email: z
      .string()
      .nonempty({ message: "O e-mail é obrigatório." })
      .email({ message: "Digite um e-mail válido." }),
    birthDate: z
      .string()
      .nonempty({ message: "A data de nascimento é obrigatória." })
      .refine(
        (date) => {
          const birth = new Date(date);
          return !isNaN(birth.getTime()) && birth < new Date();
        },
        { message: "Digite uma data válida no passado." }
      )
      .refine(
        (date) => {
          const birth = new Date(date);
          const today = new Date();
          const minAge = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return birth <= minAge;
        },
        { message: "Você deve ter pelo menos 18 anos." }
      ),
    password: z
      .string()
      .min(8, { message: "Senha inválida: mínimo de 8 caracteres." })
      .regex(/[!@#$%*&^(),.?":{}|<>]/, {
        message: "Senha inválida: precisa de caractere especial.",
      })
      .regex(/[A-Z]/, {
        message: "Senha inválida: precisa de letra maiúscula.",
      })
      .regex(/[a-z]/, {
        message: "Senha inválida: precisa de letra minúscula.",
      })
      .regex(/[0-9]/, { message: "Senha inválida: precisa de número." }),
    confirmPassword: z.string(),
    codigoPais: z
      .string()
      .nonempty({ message: "O código do país é obrigatório." }),
    ddd: z
      .string()
      .length(2, { message: "O código de área deve ter 2 dígitos." })
      .regex(/^\d{2}$/, {
        message: "O código de área deve conter apenas números.",
      }),
    phone: z
      .string()
      .min(8, { message: "O telefone deve ter no mínimo 8 dígitos." })
      .max(9, { message: "O telefone deve ter no máximo 9 dígitos." })
      .regex(/^\d{8,9}$/, {
        message: "O telefone deve possuir apenas números.",
      })
      .refine((phone) => phone.length !== 9 || phone.startsWith("9"), {
        message: "Se o telefone tiver 9 dígitos, ele deve começar com 9.",
      }),
    isArtisan: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

type SignUpData = z.infer<typeof signUpSchema>;

// --- Componente para Select ---
interface SelectProps {
  options: { value: string; label: string }[];
  [key: string]: any;
}

// --- Componente Select ---
const Select = ({ options, ...props }: SelectProps) => (
  <select
    {...props}
    className="col-span-1 rounded-3xl border border-mint-200 px-2 p-2 bg-[#FFF2DE] inset-shadow-sm inset-shadow-black/40 font-bold text-center"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

// --- Componente para informação sobre artesão ---
const ArtisanInfo = ({
  popoverRef,
  onClose,
}: {
  popoverRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) => (
  <div ref={popoverRef} className="bg-white text-black p-5 rounded-3xl shadow-lg max-w-xs text-center relative">
    <button
      onClick={onClose}
      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
      aria-label="Fechar"
    >
      ×
    </button>
    <p className="font-bold mb-2">Artesão credenciado</p>
    <p className="text-xs">
      Marque essa opção se você é artesão(a) cadastrado e faz parte
      da associação vinculada à <strong>Fundacc</strong> (Fundação
      Educacional e Cultural de Caraguatatuba). Isso garante acesso
      a funcionalidades exclusivas para membros reconhecidos.
    </p>
  </div>
);

// --- Componente para termos e condições ---
const TermsAgreement = () => (
  <div className="text-sm text-gray-600 text-center mb-6 font-normal">
    <p>
      Ao continuar, você concorda com os
      <br />
      <a href="#" className="underline text-black">
        Termos de Uso e Privacidade
      </a>
    </p>
  </div>
);

// --- Função para traduzir mensagens de erro ---
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

// --- Componente principal ---
interface SignupFormProps {
  children?: React.ReactNode;
  onClose?: () => void;
  formErrorFlag?: boolean;
  uiError?: string;
}

export default function SignUp ({
  children,
  formErrorFlag: externalFormErrorFlag,
  uiError: externalUiError,
  onClose,
}: SignupFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const setUser = useStoreUser((state) => state.setUser);
  const [pendingUser, setPendingUser] = useState<UserProps | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [showExitWarning, setShowExitWarning] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/users";

  const [visible, setVisible] = useState({
    calendar: false,
    password: false,
    confirmPassword: false,
    passwordInfo: false,
    popover: false,
  });
  const [uiError, setUiError] = useState<string | null>(externalUiError || null);
  const [formErrorFlag, setFormErrorFlag] = useState(externalFormErrorFlag || false);
  const [birthDateInput, setBirthDateInput] = useState("");
  const [isArtisan, setIsArtisan] = useState(false);
  const [token, setToken] = useState();

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    setError: setFormError,
    setValue,
    clearErrors,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      socialName: "",
      cpf: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      codigoPais: "+55",
      ddd: "",
      phone: "",
      isArtisan: false,
    },
  });

  // --- Funções auxiliares ---
  const toggleField = useCallback((field: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const showInfo = useCallback((field: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [field]: true }));
  }, []);

  const hideInfo = useCallback((field: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [field]: false }));
  }, []);

  // --- Formatação de data ---
  const formatDateInput = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4,
      8
    )}`;
  };

  // --- Manipulação de data ---
  // Formata a data de nascimento para o formato YYYY-MM-DD
  const handleBirthDateRawInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = event.target.value;
    const formatted = formatDateInput(raw);
    setBirthDateInput(formatted);

    if (formatted.length === 10) {
      const [day, month, year] = formatted.split("/");
      const date = new Date(Number(year), Number(month) - 1, Number(day));

      const isValid =
        date.getDate() === Number(day) &&
        date.getMonth() === Number(month) - 1 &&
        date.getFullYear() === Number(year);

      if (isValid) {
        setValue("birthDate", `${year}-${month}-${day}`, {
          shouldValidate: true,
        });
      } else {
        setValue("birthDate", "", { shouldValidate: true });
      }
    } else {
      setValue("birthDate", "", { shouldValidate: true });
    }
  };

  // --- Exibe mensagem de erro na UI ---
  const showUiError = useCallback(async (message: string) => {
    const traduzida = await traduzirErro(message);
    setUiError(traduzida);
  }, []);

  // --- Login após cadastro ---
  const loginUser = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await fetch("http://localhost:3333/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.message || "Erro ao fazer login.");
        }

        const body = await res.json();
        
        setPendingUser({
          userName: body.name,
          userPhoto: body.photo,
          isAuthenticated: true,
        });

      } catch (err: any) {
        const errorMessage = await traduzirErro(
          err.message || "Erro inesperado ao fazer login."
        );
        setUiError(errorMessage);
      }
    },
    [setUser]
  );

  // --- Cria o usuário ---
  const createUser = useCallback(
    async (data: SignUpData): Promise<boolean> => {
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

      clearErrors();
      try {
        const res = await fetch(`${API_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const body = await res.json();

          if (res.status === 400 && body.errors) {
            await Promise.all(
              (
                Object.entries(body.errors) as [keyof SignUpData, string[]][]
              ).map(async ([field, msgs]) => {
                const msgTraduzida = await traduzirErro(msgs[0]);
                setFormError(field as keyof SignUpData, {
                  type: "server",
                  message: msgTraduzida,
                });
              })
            );
            return false;
          }

          if (res.status === 409) {
            const msgTraduzida = await traduzirErro(body.message);
            await showUiError(msgTraduzida || "Usuário já existe.");
            return false;
          }

          await showUiError(body.message || "Erro ao criar usuário.");
          return false;
        }

        const body = await res.json();
        const token = body.accessToken;

        await loginUser(data.email, data.password);

        localStorage.setItem('artesianToken', token);
        setToken(token);

        setUiError("Usuário criado e logado com sucesso!");
        return true; 
      } catch (err: any) {
        await showUiError(err.message || "Erro inesperado.");
        return false;
      }
    },
    [API_URL, clearErrors, setFormError, showUiError, loginUser]
  );

  // --- Efeitos para UI ---
  
  // Fechar popover de senha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        visible.passwordInfo &&
        passwordRef.current &&
        !passwordRef.current.contains(event.target as Node)
      ) {
        hideInfo("passwordInfo");
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible.passwordInfo, hideInfo]);

  // Fechar popover de artesão ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        visible.popover &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        hideInfo("popover");
      }
    }

    if (visible.popover) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [visible.popover, hideInfo]);

  // Mostrar flag de erro após submit
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      setFormErrorFlag(true);
      const timer = setTimeout(() => setFormErrorFlag(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, isSubmitted]);

  // Scroll para topo em caso de erro
  useEffect(() => {
    if (
      (formErrorFlag || uiError) &&
      window.innerHeight < 750 &&
      containerRef.current
    ) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [formErrorFlag, uiError]);

  // Limpar mensagem de erro após tempo
  useEffect(() => {
    if (uiError) {
      const timer = setTimeout(() => setUiError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [uiError]);

  // --- Envia os dados do formulário ---
  const onSubmit: SubmitHandler<SignUpData> = useCallback(
    async (data) => {
      
      const isArtisan = !!data.isArtisan;
      const created = await createUser(data);

      if (created && isArtisan) {
        setIsArtisan(true);
        onClose?.();
      } else if (created) {
        if (pendingUser) {
          setUser(pendingUser);
          setPendingUser(null);
          onClose?.();
        }
      }
    },
    [createUser, setUser]
  );

    // --- Renderização condicional em caso de artesão ---
  if (isArtisan && token) {
    return (
          <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogOverlay className="fixed inset-0 bg-black/0 z-40" />
            <DialogContent
            onInteractOutside={(event) => {
              console.log("Interação fora do modal detectada");
              setShowExitWarning(true);
              event.preventDefault();
            }}
            className="flex justify-center itens-center w-full sm:max-h-[99vh] h-[95vh] overflow-y-auto rounded-xl sm:h-fit sm:max-w-[425px]"
          >
          <SignUpArtesian
            token={token}
            onSuccess={() => {
              if (pendingUser) {
                setUser(pendingUser);
                onClose?.();
              }
            }}
            showExitWarning={showExitWarning}
            setShowExitWarning={setShowExitWarning}
            setIsOpen={setIsOpen}
            pendingUser={pendingUser}
          >
            {children}
          </SignUpArtesian>
        </DialogContent>
      </Dialog>
    );
  }

  // --- Renderização do banner de erro ---  
  const renderErrorBanner = () => (
    <div className="flex items-center justify-center bg-magenta text-white rounded-lg p-3 mb-4 text-xs font-bold">
      <FaExclamationTriangle className="mr-1" />
      <span>Campo obrigatório ou com formato inválido.</span>
    </div>
  );

  // --- Renderização de mensagens UI ---
  const renderUIMessage = () => {
    const isSuccess = uiError && uiError.includes("sucesso");
    const bannerColor = isSuccess ? "bg-mint-600" : "bg-magenta";

    return (
      <div className={`mb-4 p-3 rounded-lg text-xs text-center ${bannerColor} text-white`}>
        <div className="flex items-center justify-center">
          {!isSuccess && <FaExclamationTriangle className="mr-2" />}
          <span>{uiError}</span>
        </div>
      </div>
    );
  };

  // --- Renderização dos campos de senha ---
  const renderPasswordField = (
    name: "password" | "confirmPassword",
    placeholder: string,
    visible: boolean,
    onToggle: () => void,
    error: any,
    showInfo: boolean,
    onFocus?: () => void,
    onBlur?: () => void
  ) => (
    <div className="relative" ref={name === "password" ? passwordRef : undefined}>
      <SignInput
        placeholder={placeholder}
        type={visible ? "text" : "password"}
        {...register(name)}
        hasError={!!error}
        errorMessage={error?.message}
        icon={
          <button
            type="button"
            onClick={onToggle}
            className="p-1 focus:outline-none"
            aria-label="Alternar visibilidade da senha"
          >
            {visible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        }
        iconPosition="right"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {name === "password" && showInfo && !error && (
        <div className="relative text-xs text-[#985E00] p-2 border-[#985E00] mt-1">
          <p>• No mínimo 8 caracteres</p>
          <p>• Pelo menos 1 letra maiúscula</p>
          <p>• Pelo menos 1 letra minúscula</p>
          <p>• Pelo menos 1 número</p>
          <p>• Pelo menos 1 caractere especial</p>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="max-w-md w-full p-4 sm:p-11 rounded-lg overflow-y-auto"
    >
      <header className="mb-6">
        {formErrorFlag ? (
          renderErrorBanner()
        ) : (
          <>
            {children}
          </>
        )}
          <DialogTitle className="text-5xl md:text-[45px] font-bold">Olá!</DialogTitle>
          <p>Cadastre-se e descubra o melhor do artesanato.</p>
      </header>

      {uiError && renderUIMessage()}

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-2 text-[#985E00]">
        <SignInput
          placeholder="Nome*"
          type="text"
          {...register("name")}
          hasError={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <SignInput
          placeholder="Nome Social"
          type="text"
          {...register("socialName")}
          hasError={!!errors.socialName}
          errorMessage={errors.socialName?.message}
        />

        <SignInput
          placeholder="CPF*"
          type="text"
          {...register("cpf")}
          hasError={!!errors.cpf}
          errorMessage={errors.cpf?.message}
        />

        <SignInput
          placeholder="Email*"
          type="email"
          {...register("email")}
          hasError={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <div className="relative">
          <SignInput
            placeholder="Data de Nascimento*"
            type="text"
            hasError={!!errors.birthDate}
            errorMessage={errors.birthDate?.message}
            icon={
              <FaRegCalendarAlt
                size={16}
                className={`pointer-events-none font-bold${
                  errors.birthDate ? "text-magenta" : "text-[#985E00]"
                }`}
              />
            }
            iconPosition="right"
            value={birthDateInput}
            onChange={handleBirthDateRawInput}
            inputMode="numeric"
            autoComplete="off"
          />
        </div>

        {renderPasswordField(
          "password",
          "Senha*",
          visible.password,
          () => toggleField("password"),
          errors.password,
          visible.passwordInfo,
          () => showInfo("passwordInfo"),
          () => setTimeout(() => hideInfo("passwordInfo"), 100)
        )}

        {renderPasswordField(
          "confirmPassword",
          "Confirmação de Senha*",
          visible.confirmPassword,
          () => toggleField("confirmPassword"),
          errors.confirmPassword,
          false
        )}

        <div className="grid grid-cols-4 gap-2">
          <Select
            options={[{ value: "+55", label: "+55" }]}
            {...register("codigoPais")}
          />
          <div>
            <SignInput
              className=" placeholder:px-0.5 placeholder:text-sm text-center"
              type="text"
              placeholder="DDD"
              {...register("ddd")}
              hasError={!!errors.ddd}
            />
          </div>
          <div className="col-span-2">
            <SignInput
              placeholder="Telefone"
              type="tel"
              {...register("phone")}
              hasError={!!errors.phone}
            />
          </div>
        </div>

        {(errors.phone || errors.ddd || errors.codigoPais) && (
          <p className="text-sm text-magenta">
            {errors.ddd?.message || errors.phone?.message || errors.codigoPais?.message}
          </p>
        )}

        <div className="flex items-center justify-between bg-[#F6F6F6] text-mint-600 w-full h-10 rounded-3xl py-1 px-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]">
          <div className="flex items-center">
            <input
              id="isArtisan"
              type="checkbox"
              {...register("isArtisan", { setValueAs: v => !!v })}
              className="mr-2 h-5 w-3 text-[#E05D00]"
            />
            <label htmlFor="isArtisan" className="text-base">
              Sou Artesão
            </label>
          </div>
          <button
            type="button"
            aria-label="Info artesão"
            onClick={() => toggleField("popover")}
          >
            <AiOutlineInfoCircle />
          </button>
        </div>

        {visible.popover && (
          <div>
            <div className="fixed inset-0 bg-black/25 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <ArtisanInfo 
                popoverRef={popoverRef} 
                onClose={() => hideInfo("popover")} 
              />
            </div>
          </div>
        )}

        <TermsAgreement />

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-48 h-10 rounded-[20px] bg-solar-700 hover:bg-[#c05000] text-white border-b-4 border-[#a04500]"
          >
            {isSubmitting ? "Processando..." : "Continuar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
