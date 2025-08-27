"use client";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import useStoreUser from "@/hooks/useStoreUser";
import { UserProps } from "@/types/UserProps";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SignInput from "./SignInput";

import {
  ArtisanCheckbox,
  BirthDateField,
  PasswordField,
  PhoneFields,
} from "./SignUp//SignUpFormFields";

import {
  ArtisanInfo,
  ErrorBanner,
  TermsAgreement,
  UIMessage,
} from "./SignUp/SignUpComponents";

import { useUIState } from "@/hooks/useUIState";
import { useSignUpLogic } from "../../hooks/useSignUpLogic";
import { signUpSchema, type SignUpData } from "../../lib/schemas/signUpSchema";

interface SignupFormProps {
  children?: React.ReactNode;
  onClose?: () => void;
  uiError?: string;
  onArtisanSignup?: (userId: string, userData: UserProps) => void;
}

export default function SignUp({
  children,
  onClose,
  onArtisanSignup,
}: SignupFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);

  const setUser = useStoreUser((state) => state.setUser);

  const {
    visible,
    formErrorFlag,
    uiError,
    birthDateInput,
    toggleField,
    showInfo,
    hideInfo,
    setBirthDateInput,
    setFormErrorFlag,
    setUiError,
  } = useUIState();

  const { createUser } = useSignUpLogic(setUser, setUiError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    setValue,
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

  const handleBirthDateInput = useCallback(
    (value: string) => {
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

      const formatted = formatDateInput(value);
      setBirthDateInput(formatted);

      if (formatted.length === 10) {
        const [day, month, year] = formatted.split("/");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const isValid =
          date.getDate() === Number(day) &&
          date.getMonth() === Number(month) - 1 &&
          date.getFullYear() === Number(year);

        setValue("birthDate", isValid ? `${year}-${month}-${day}` : "", {
          shouldValidate: true,
        });
      } else {
        setValue("birthDate", "", { shouldValidate: true });
      }
    },
    [setBirthDateInput, setValue]
  );

  const onSubmit: SubmitHandler<SignUpData> = useCallback(
    async (data) => {
      const created = await createUser(data);

      if (created.success && data.isArtisan) {
        const userId = created.userData?.id || created.userData?.userId;

        const userData: UserProps = {
          userName: created.userData.name,
          userPhoto: created.userData.avatar,
          isModerator: created.userData.roles?.includes("MODERATOR") || false,
        };

        onArtisanSignup?.(userId, userData);
      } else if (created.success && !data.isArtisan) {
        onClose?.();
      }
    },
    [createUser, onClose]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        visible.passwordInfo &&
        passwordRef.current &&
        !passwordRef.current.contains(event.target as Node)
      ) {
        hideInfo("passwordInfo");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible.passwordInfo, hideInfo]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        visible.popover &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        hideInfo("popover");
      }
    };

    if (visible.popover) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [visible.popover, hideInfo]);

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      setFormErrorFlag(true);
      const timer = setTimeout(() => setFormErrorFlag(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, isSubmitted, setFormErrorFlag]);

  useEffect(() => {
    if (
      (formErrorFlag || uiError) &&
      window.innerHeight < 750 &&
      containerRef.current
    ) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [formErrorFlag, uiError]);

  useEffect(() => {
    if (uiError) {
      const timer = setTimeout(() => setUiError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [uiError, setUiError]);

  return (
    <div
      ref={containerRef}
      className="w-full p-4 sm:p-11 rounded-lg overflow-y-auto"
    >
      <header className="mb-6">
        {formErrorFlag ? <ErrorBanner /> : <>{children}</>}
        <DialogTitle className="text-5xl md:text-[45px] font-bold">
          Olá!
        </DialogTitle>
        <p>Cadastre-se e descubra o melhor do artesanato.</p>
      </header>

      {uiError && <UIMessage message={uiError} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 space-y-2 text-[#985E00]"
      >
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

        <BirthDateField
          value={birthDateInput}
          onChange={handleBirthDateInput}
          error={errors.birthDate}
        />

        <PasswordField
          name="password"
          placeholder="Senha*"
          register={register}
          error={errors.password}
          visible={visible.password}
          onToggle={() => toggleField("password")}
          showInfo={visible.passwordInfo}
          onFocus={() => showInfo("passwordInfo")}
          onBlur={() => setTimeout(() => hideInfo("passwordInfo"), 100)}
          ref={passwordRef}
        />

        <PasswordField
          name="confirmPassword"
          placeholder="Confirmação de Senha*"
          register={register}
          error={errors.confirmPassword}
          visible={visible.confirmPassword}
          onToggle={() => toggleField("confirmPassword")}
        />

        <PhoneFields
          register={register}
          errors={{
            phone: errors.phone,
            ddd: errors.ddd,
            codigoPais: errors.codigoPais,
          }}
        />

        <ArtisanCheckbox
          register={register}
          onInfoClick={() => toggleField("popover")}
        />

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
            className="w-48 h-10 rounded-[20px] bg-salmon hover:bg-crimson text-white border-b-4 border-crimson"
          >
            {isSubmitting ? "Processando..." : "Continuar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
