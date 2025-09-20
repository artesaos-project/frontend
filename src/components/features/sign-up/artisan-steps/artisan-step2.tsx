import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';
import { useDateInput } from '@/hooks/use-date-input';
import {
  artisanProfileSchema,
  ArtisanProfileFormData,
} from '@/lib/schemas/artisan-profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegCalendarAlt } from 'react-icons/fa';

function ArtisanStep2({ onNext }: { onNext: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArtisanProfileFormData>({
    resolver: zodResolver(artisanProfileSchema),
  });

  const [dateCadastro, setDateCadastro] = useState('');
  const [dateValidade, setDateValidade] = useState('');
  const { validateAndFormatDate: validateCadastro } = useDateInput({
    onFormattedChange: setDateCadastro,
  });
  const { validateAndFormatDate: validateValidade } = useDateInput({
    onFormattedChange: setDateValidade,
  });

  const onSubmit: SubmitHandler<ArtisanProfileFormData> = (data) => {
    console.log(data);
    onNext();
  };

  return (
    <div className="text-midnight">
      <h2 className="text-2xl font-bold mb-4">
        Complete seu perfil de artesão
      </h2>
      <p className="text-md mt-4">
        Para que seu perfil seja completo e atraente, preencha suas informações
        profissionais.
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthInput
          placeholder="Sicab*"
          type="text"
          {...register('sicab')}
          hasError={!!errors.sicab}
          errorMessage={errors.sicab?.message}
        />
        <AuthInput
          placeholder="Data de Cadastro Sicab*"
          type="text"
          value={dateCadastro}
          maxLength={10}
          icon={<FaRegCalendarAlt />}
          {...register('dataCadastro', {
            onChange: (e) => validateCadastro(e.target.value),
          })}
          hasError={!!errors.dataCadastro}
          errorMessage={errors.dataCadastro?.message}
        />
        <AuthInput
          placeholder="Data de Validade Sicab*"
          type="text"
          value={dateValidade}
          maxLength={10}
          icon={<FaRegCalendarAlt />}
          {...register('dataValidade', {
            onChange: (e) => validateValidade(e.target.value),
          })}
          hasError={!!errors.dataValidade}
          errorMessage={errors.dataValidade?.message}
        />
        <AuthButton text="Continuar" className="mt-10" />
      </form>
    </div>
  );
}

export default ArtisanStep2;
