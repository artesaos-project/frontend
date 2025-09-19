'use client';

import { Button } from '@/components/ui/button';
import useStoreUser from '@/hooks/use-store-user';
import { authApi } from '@/services/api';
import { UserProps } from '@/types/user-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { z } from 'zod';
import SignInput from '../AuthenticationModal/SignInput';

const loginSchema = z.object({
  email: z.string().email('Email e/ou senha Incorretos'),
  password: z
    .string()
    .min(8, 'Email e/ou senha Incorretos')
    .regex(/[!@#$%*&^(),.?":{}|<>]/, 'Email e/ou senha Incorretos')
    .regex(/[A-Z]/, 'Email e/ou senha Incorretos')
    .regex(/[a-z]/, 'Email e/ou senha Incorretos')
    .regex(/[0-9]/, 'Email e/ou senha Incorretos'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function SignIn({
  children,
  onSuccess,
}: {
  children: React.ReactNode;
  onSuccess: () => void;
}) {
  const [backendError, setBackendError] = useState<string | null>(null);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStoreUser((state) => state.setUser);

  const errorMessages: Record<string, string> = {
    'Invalid credentials': 'Credenciais inválidas',
    'Internal server error': 'Erro interno do servidor',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await authApi.signIn(data);

      const isModerator = result.roles.includes('MODERATOR');
      const isArtisan = result.roles.includes('ARTISAN');
      const user: UserProps = {
        userId: result.userId,
        userName: result.name,
        artisanUserName: result.artisanUserName,
        userPhoto: result.avatar,
        isModerator: isModerator,
        isArtisan: isArtisan,
      };
      setUser(user);
      onSuccess();
    } catch (error: any) {
      const errorData = errorMessages[error.message] || 'Erro ao fazer login';
      setBackendError(errorData);
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg p-[44px] w-full">
        {children}
        <div className="mt-6 mb-14 ">
          <Image
            src="/horizontal-logo.svg"
            alt="Imagem de boas-vindas"
            width={120}
            height={59}
          />

          <DialogTitle className="text-5xl md:text-[45px] mt-8 font-bold">
            Olá!
          </DialogTitle>
          <p className="text-xl italic mt-2">Bom te ver de novo!</p>
        </div>
        <form
          className="space-y-3 mb-3 text-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SignInput
            className="bg-[#E4F5E9] placeholder:text-[#4D7558] focus-visible:border-mint-600"
            hasError={!!errors.email}
            placeholder={'Email'}
            type={'email'}
            {...register('email')}
          />
          <div className="relative">
            <SignInput
              className="bg-[#E4F5E9] placeholder:text-[#4D7558] focus-visible:border-mint-600"
              hasError={!!errors.password}
              placeholder={'Senha'}
              type={visiblePassword ? 'text' : 'password'}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {(errors.email || errors.password) && (
            <p className="ml-3 text-[12px] text-magenta text-bold text-start font-semibold">
              {errors.email?.message || errors.password?.message}
            </p>
          )}
          {backendError && (
            <p className="ml-3 text-[12px] text-magenta text-bold text-start font-semibold">
              {backendError}
            </p>
          )}
          <Link className="underline italic text-sm text-end" href="/#">
            Esqueceu sua senha?
          </Link>
          <div className="w-full flex justify-center mt-10">
            <Button
              type="submit"
              className="bg-salmon w-[191px] h-[42px] rounded-2xl border-b-3 border-[#E85A4F]            
              hover:bg-[#E85A4F] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <p>Carregando</p>
                </>
              ) : (
                'Continuar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
