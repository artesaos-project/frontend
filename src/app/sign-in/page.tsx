'use client';

import { FiChevronLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import AuthInput from '@/components/common/auth-input';
import AuthButton from '@/components/common/auth-button';
import { useState } from 'react';
import { LoginFormData, loginSchema } from '@/lib/schemas/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
    <div className="p-12.5 h-screen w-full flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full max-h-fit md:ring-1 ring-neutral-200 rounded-3xl md:px-25 py-17.5 bg-white">
        <Image
          src="auth-bg.svg"
          width="10"
          height="10"
          className="object-cover w-full h-full fixed top-0 left-0 -z-10 hidden md:block"
          alt={''}
        />
        <div className="pb-12.5 md:pb-7.5">
          <Link href="/">
            <FiChevronLeft size={24} className="cursor-pointer" />
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
            className="text-xs text-midnight font-light underline text-right mb-6"
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
