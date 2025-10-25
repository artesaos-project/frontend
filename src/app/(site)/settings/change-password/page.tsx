'use client';

import AuthInput from '@/components/common/auth-input';
import LoadingScreen from '@/components/common/loading-screen';
import PasswordValidationBox from '@/components/features/register/password-validation';
import { Button } from '@/components/ui/button';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { userApi } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
import { z } from 'zod';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(32, 'A senha deve ter no máximo 32 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(
        /[^A-Za-z0-9]/,
        'A senha deve conter pelo menos um caractere especial',
      ),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

function ChangePasswordPage() {
  const router = useRouter();
  const { hasHydrated } = useAuthGuard();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const handleToggle = (field: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true);
      await userApi.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Senha alterada com sucesso!');
      setIsLoading(false);
      router.push('/settings');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setIsLoading(false);
        const message = error.response?.data?.message;
        toast.error(message);
      }
    }
  };

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-gray-100 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-10">
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => router.push('/settings')}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Voltar"
            type="button"
          >
            <FiChevronLeft size={28} className="text-midnight" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-midnight italic">
            Trocar Senha de Acesso
          </h1>
        </div>

        <form
          className="flex flex-col gap-4 bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200 p-12 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <AuthInput
            placeholder="Senha Atual*"
            type={visible.currentPassword ? 'text' : 'password'}
            {...register('currentPassword')}
            hasError={!!errors.currentPassword}
            errorMessage={errors.currentPassword?.message}
            maxLength={32}
            icon={
              visible.currentPassword ? (
                <FiEye
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('currentPassword')}
                  className="cursor-pointer"
                />
              ) : (
                <FiEyeOff
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('currentPassword')}
                  className="cursor-pointer"
                />
              )
            }
          />

          <AuthInput
            placeholder="Nova Senha*"
            type={visible.newPassword ? 'text' : 'password'}
            {...register('newPassword')}
            hasError={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
            maxLength={32}
            icon={
              visible.newPassword ? (
                <FiEye
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('newPassword')}
                  className="cursor-pointer"
                />
              ) : (
                <FiEyeOff
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('newPassword')}
                  className="cursor-pointer"
                />
              )
            }
          />

          {watch('newPassword') && (
            <PasswordValidationBox
              password={watch('newPassword') || ''}
              shouldValidate={true}
              name="newPassword"
              showInfo={true}
              error={false}
            />
          )}

          <AuthInput
            placeholder="Confirmação de Nova Senha*"
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
                  className="cursor-pointer"
                />
              ) : (
                <FiEyeOff
                  size={20}
                  color="salmon"
                  onClick={() => handleToggle('confirmPassword')}
                  className="cursor-pointer"
                />
              )
            }
          />

          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default ChangePasswordPage;
