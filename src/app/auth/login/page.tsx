'use client';

import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import useStoreUser from '@/hooks/use-store-user';
import { LoginFormData, loginSchema } from '@/lib/schemas/login-schema';
import { authApi } from '@/services/api';
import { UserProps } from '@/types/user-props';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronLeft, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import { IoIosWarning } from 'react-icons/io';

function Page() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const setUser = useStoreUser((state) => state.setUser);
  const router = useRouter();

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
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      console.log(response);

      const user: UserProps = {
        userId: response.user.id,
        userName: response.user.name,
        isAuthenticated: true,
        isModerator: response.user.roles?.includes('MODERATOR') || false,
        isArtisan: response.user.roles?.includes('ARTISAN') || false,
      };

      setUser(user);
      router.push('/');
    } catch (error) {
      console.log(error);
      setErrorAlert(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorAlert) {
      const timer = setTimeout(() => setErrorAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  const handleVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const errorMessage = errors.email?.message || errors.password?.message;

  return (
    <div className="p-12.5 h-screen w-full flex flex-col bg-[url('/fundo-cadastro-login.svg')] justify-center items-center">
      <div className="max-w-2xl w-full h-full md:max-h-fit md:ring-1 ring-neutral-200 rounded-3xl md:px-25 md:py-17.5">
        {errorAlert ? (
          <Alert
            variant="destructive"
            className="w-full bg-salmon text-white flex justify-between rounded-full mb-7"
          >
            <div className="flex gap-5 items-center">
              <IoIosWarning size={22} />
              <AlertTitle>Preencha com dados válidos</AlertTitle>
            </div>
            <FiX
              className="cursor-pointer"
              onClick={() => setErrorAlert(false)}
            />
          </Alert>
        ) : (
          <div className="pb-12.5 md:pb-7.5 flex justify-between">
            <Link href="/auth">
              <FiChevronLeft size={24} className="cursor-pointer" />
            </Link>
            <Link href={'/'} className="w-6 flex ml-auto">
              <FiX size={24} />
            </Link>
          </div>
        )}
        <div>
          <Image
            src="/horizontal-logo.svg"
            alt={'system-logo'}
            width={120}
            height={60}
          />
        </div>
        <div>
          <h1 className="font-bold text-midnight text-5xl py-8">Olá!</h1>
          <h2 className="italic text-midnight text-xl pb-8">
            Bom te ver de novo!
          </h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            placeholder="Email"
            type="email"
            {...register('email')}
            hasError={!!errors.email}
          />
          <AuthInput
            type={visiblePassword ? 'text' : 'password'}
            placeholder="Senha"
            {...register('password')}
            hasError={!!errors.password}
            errorMessage={errorMessage}
            icon={
              visiblePassword ? (
                <FiEye size={20} color="salmon" onClick={handleVisibility} />
              ) : (
                <FiEyeOff size={20} color="salmon" onClick={handleVisibility} />
              )
            }
          />
          <Link
            href="#"
            className="text-xs text-midnight hover:text-sakura w-fit font-light underline ml-auto mb-6"
          >
            Esqueceu sua senha?
          </Link>
          <AuthButton
            text={isLoading ? 'Entrando...' : 'Continuar'}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default Page;
