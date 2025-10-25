'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useStoreUser from '@/hooks/use-store-user';
import { userApi } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type ExcludeUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ExcludeUserDialog({ isOpen, onClose }: ExcludeUserDialogProps) {
  const user = useStoreUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const excludeZodSchema = z.object({
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email inválido')
      .refine((val) => val === user.user.userEmail, {
        message: 'O email não corresponde ao email da conta',
      }),
  });

  type ExcludeFormData = z.infer<typeof excludeZodSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExcludeFormData>({
    resolver: zodResolver(excludeZodSchema),
  });

  const onSubmit = async () => {
    try {
      setIsDeleting(true);
      await userApi.deleteAccount();
      toast.success('Conta excluída com sucesso');
      user.resetStore();
      reset();
      onClose();
      router.replace('/');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir conta. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir sua conta?</DialogTitle>
          <DialogDescription>
            Ao deletar sua conta, todos os seus dados serão removidos
            permanentemente. Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="py-3 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Para prosseguir, digite seu email:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
              disabled={isDeleting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExcludeUserDialog;
