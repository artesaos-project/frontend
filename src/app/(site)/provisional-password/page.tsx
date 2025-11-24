'use client';

import AuthInput from '@/components/common/auth-input';
import LoadingScreen from '@/components/common/loading-screen';
import PasswordValidationBox from '@/components/features/register/password-validation';
import { Button } from '@/components/ui/button';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import useStoreUser from '@/hooks/use-store-user';
import { userApi } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock, FiShield } from 'react-icons/fi';
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

function ProvisionalPasswordPage() {
  const router = useRouter();
  const { hasHydrated, user } = useAuthGuard();
  const updateUser = useStoreUser((state) => state.updateUser);
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
      await userApi.updateProvisionalPassword({
        newPassword: data.newPassword,
      });

      // Atualizar o estado do usuário para não precisar mais trocar senha
      updateUser({ mustChangePassword: false });

      toast.success(
        'Senha alterada com sucesso! Você já pode usar sua nova senha.',
      );
      setIsLoading(false);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setIsLoading(false);
        const message =
          error.response?.data?.message || 'Erro ao alterar senha';
        toast.error(message);
      }
    }
  };

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-gray-100 min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-10">
        {/* Header com ícone e título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-midnight rounded-full mb-4">
            <FiShield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-midnight mb-3">
            Crie sua Nova Senha
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Olá, <span className="font-semibold">{user.userName}</span>! 👋
          </p>
        </div>

        {/* Card explicativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <FiLock size={24} className="text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Por que preciso criar uma nova senha?
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Um administrador redefiniu sua senha por questões de segurança.
                Por favor, crie uma nova senha forte e personalizada que apenas
                você conheça. Esta senha será usada em seus próximos acessos à
                plataforma.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form
          className="bg-white rounded-xl shadow-md overflow-hidden p-8 md:p-12 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
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
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Alterando senha...' : 'Confirmar Nova Senha'}
          </Button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Após confirmar, você será redirecionado para a página inicial
          </p>
        </form>
      </div>
    </main>
  );
}

export default ProvisionalPasswordPage;
