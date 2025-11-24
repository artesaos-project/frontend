'use client';

import AuthInput from '@/components/common/auth-input';
import LoadingScreen from '@/components/common/loading-screen';
import PasswordValidationBox from '@/components/features/register/password-validation';
import { Button } from '@/components/ui/button';
import { useModeratorGuard } from '@/hooks/use-moderator-guard';
import { adminUsersApi } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
import { z } from 'zod';

const changePasswordSchema = z
  .object({
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

function ChangeUserPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const { hasHydrated } = useModeratorGuard();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState({
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
      await adminUsersApi.changeUserPassword({
        userId,
        newPassword: data.newPassword,
      });
      toast.success('Senha do usuário alterada com sucesso!');
      setIsLoading(false);
      router.push('/moderator/users');
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Erro ao alterar senha do usuário';
        toast.error(message);
      } else {
        toast.error('Erro ao alterar senha do usuário');
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
            onClick={() => router.push('/moderator/users')}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Voltar"
            type="button"
          >
            <FiChevronLeft size={28} className="text-midnight" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-midnight italic">
            Alterar Senha do Usuário
          </h1>
        </div>

        <form
          className="flex flex-col gap-4 bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200 p-12 "
          onSubmit={handleSubmit(onSubmit)}
        >
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

export default ChangeUserPasswordPage;
