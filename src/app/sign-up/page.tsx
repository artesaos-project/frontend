'use client';

import { FiChevronLeft, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthInput from '@/components/common/auth-input';
import AuthButton from '@/components/common/auth-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpData, signUpSchema } from '@/lib/schemas/signUpSchema';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PhoneFields } from '@/components/features/sign-up/PhoneFileds';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpData) => {
    console.log(data);
  };

  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleToggle = (field: 'password' | 'confirmPassword') => {
    setVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="w-full max-w-md mx-auto flex flex-col md:border-2 px-15 py-10 rounded-4xl">
        <div className="flex mb-10 justify-between">
          <FiChevronLeft size={24} />
          <FiX size={24} />
        </div>
        <div>
          <h1 className="font-bold text-midnight text-5xl py-8">Olá!</h1>
          <h2 className="text-midnight text-md pb-8">
            Cadastre-se e descubra o melhor do artesanato.
          </h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            placeholder="Nome*"
            type="text"
            {...register('name')}
            hasError={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <AuthInput
            placeholder="Email*"
            type="email"
            {...register('email')}
            hasError={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <AuthInput
            placeholder="Senha*"
            type={visible.password ? 'text' : 'password'}
            {...register('password')}
            hasError={!!errors.password}
            errorMessage={errors.password?.message}
            icon={
              visible.password ? (
                <FiEye
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('password')}
                />
              ) : (
                <FiEyeOff
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('password')}
                />
              )
            }
          />
          <AuthInput
            placeholder="Confirmação de Senha*"
            type={visible.confirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            hasError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            icon={
              visible.confirmPassword ? (
                <FiEye
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('confirmPassword')}
                />
              ) : (
                <FiEyeOff
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('confirmPassword')}
                />
              )
            }
          />
          <PhoneFields
            register={register}
            errors={{
              phone: errors.phone,
              ddd: errors.ddd,
              codigoPais: errors.codigoPais,
            }}
          />
          <div className="flex flex-col justify-center items-center">
            <span className="text-sm text-midnight font-light pt-4">
              Ao continuar, você concorda com os{' '}
              <Link href="/" className="underline">
                Termos de Uso e Privacidade
              </Link>
            </span>
          </div>
          <AuthButton />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
