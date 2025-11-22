import AuthInput from '@/components/common/auth-input';
import { PhoneFields } from '@/components/features/register/phone-fields';
import { Button } from '@/components/ui/button';
import useStoreUser from '@/hooks/use-store-user';
import { SignUpData, signUpSchema } from '@/lib/schemas/sign-up-schema';
import { authApi } from '@/services/api';
import { UserProps } from '@/types/user-props';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { PasswordValidationBox } from '../password-validation';

function StepRegister({
  onNext,
  onError,
}: {
  onNext: () => void;
  onError: (backendMsg?: string) => void;
}) {
  const setUser = useStoreUser((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    const payload = {
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      phone: `${data.codigoPais}${data.ddd}${data.phone}`,
    };
    try {
      const response = await authApi.createUser(payload);
      if (response.message) {
        onError(response.message);
        return;
      }
      const login = await authApi.login({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      if (login.message) {
        onError(login.message);
        return;
      }

      const user: UserProps = {
        userId: login.user.id,
        userName: login.user.name,
        userPhoto: login.user.avatar,
        userEmail: login.user.email,
        artisanUserName: login.user.artisanUsername,
        applicationId: login.user.applicationId,
        applicationStatus: login.user.applicationStatus,
        isAuthenticated: true,
        postnedApplication: undefined,
        expiresAt: new Date(login.session.expiresAt).getTime(),
      };

      setUser(user);
      onNext();
      return;
    } catch (error: unknown) {
      let backendMessage = 'Erro ao cadastrar usuário';

      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        backendMessage = Array.isArray(message)
          ? message[0]
          : message || backendMessage;
      }

      onError(backendMessage);
    }
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
    <>
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
          maxLength={50}
          hasError={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <AuthInput
          placeholder="Email*"
          type="email"
          {...register('email')}
          maxLength={50}
          hasError={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <AuthInput
          placeholder="Senha*"
          type={visible.password ? 'text' : 'password'}
          {...register('password')}
          hasError={!!errors.password}
          errorMessage={errors.password?.message}
          maxLength={32}
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
        <PasswordValidationBox
          password={watch('password') || ''}
          shouldValidate={!!watch('password')}
          name="password"
          showInfo={true}
          error={!!errors.password}
        />
        <AuthInput
          placeholder="Confirmação de Senha*"
          type={visible.confirmPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          maxLength={32}
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
        <Button>Cadastrar</Button>
      </form>
    </>
  );
}

export default StepRegister;
