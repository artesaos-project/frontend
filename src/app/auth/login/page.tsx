'use client';

import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';
import { LoginFormData, loginSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronLeft, FiEye, FiEyeOff, FiX } from 'react-icons/fi';

function Page() {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  const handleVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const hasErrors = Object.keys(errors).length > 0;
  const errorMessage = errors.email?.message || errors.password?.message;

  return (
    <div className="p-12.5 h-screen w-full flex flex-col bg-[url('/fundo-cadastro-login.svg')] justify-center items-center">
      <div className="max-w-2xl w-full h-full md:max-h-fit md:ring-1 ring-neutral-200 rounded-3xl md:px-25 md:py-17.5">
        <div className="pb-12.5 md:pb-7.5 flex justify-between">
          <Link href="/auth">
            <FiChevronLeft size={24} className="cursor-pointer" />
          </Link>
          <Link href={'/'} className="w-6 flex ml-auto">
            <FiX size={24} />
          </Link>
        </div>
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
            hasError={hasErrors}
          />
          <AuthInput
            type={visiblePassword ? 'text' : 'password'}
            placeholder="Senha"
            {...register('password')}
            hasError={hasErrors}
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
          <AuthButton />
        </form>
      </div>
    </div>
  );
}

export default Page;
