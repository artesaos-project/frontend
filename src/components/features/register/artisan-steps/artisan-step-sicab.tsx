import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import { useDateInput } from '@/hooks/use-date-input';
import {
  ArtisanProfileFormData,
  artisanProfileSchema,
} from '@/lib/schemas/artisan-profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegCalendarAlt } from 'react-icons/fa';

function ArtisanStepSicab({ onNext }: { onNext: () => void }) {
  const artisanStore = useArtisanRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ArtisanProfileFormData>({
    resolver: zodResolver(artisanProfileSchema),
    defaultValues: {
      sicab: artisanStore.sicab || '',
      dataCadastro: artisanStore.sicabDataCadastro || '',
      dataValidade: artisanStore.sicabValidade || '',
    },
  });

  const { validateAndFormatDate: handleDateCadastro } = useDateInput({
    onFormattedChange: (val) =>
      setValue('dataCadastro', val, { shouldValidate: true }),
  });
  const { validateAndFormatDate: handleDateValidade } = useDateInput({
    onFormattedChange: (val) =>
      setValue('dataValidade', val, { shouldValidate: true }),
  });

  const onSubmit: SubmitHandler<ArtisanProfileFormData> = (data) => {
    artisanStore.update({
      sicab: data.sicab,
      sicabDataCadastro: data.dataCadastro,
      sicabValidade: data.dataValidade,
    });
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
          maxLength={10}
          icon={<FaRegCalendarAlt />}
          {...register('dataCadastro', {
            onChange: (e) => handleDateCadastro(e.target.value),
          })}
          hasError={!!errors.dataCadastro}
          errorMessage={errors.dataCadastro?.message}
        />
        <AuthInput
          placeholder="Data de Validade Sicab*"
          type="text"
          maxLength={10}
          icon={<FaRegCalendarAlt />}
          {...register('dataValidade', {
            onChange: (e) => handleDateValidade(e.target.value),
          })}
          hasError={!!errors.dataValidade}
          errorMessage={errors.dataValidade?.message}
        />
        <AuthButton text="Continuar" className="mt-10" />
      </form>
    </div>
  );
}

export default ArtisanStepSicab;
