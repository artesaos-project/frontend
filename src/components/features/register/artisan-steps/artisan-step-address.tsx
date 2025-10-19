import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import { addressSchema } from '@/lib/schemas/andress-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof addressSchema>;

const apiCep = async (cep: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  return data;
};

function ArtisanStepAddress({ onNext }: { onNext: () => void }) {
  const artisanStore = useArtisanRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      nomeComercial: artisanStore.nomeComercial || '',
      cep: artisanStore.cep || '',
      endereco: artisanStore.endereco || '',
      numero: artisanStore.numero || '',
      bairro: artisanStore.bairro || '',
      complemento: artisanStore.complemento || '',
      cidade: artisanStore.cidade || '',
      estado: artisanStore.estado || '',
    },
  });

  const cep = watch('cep');

  useEffect(() => {
    const fetchCep = async () => {
      if (cep && cep.length === 8) {
        const data = await apiCep(cep);
        if (data.erro) {
          return;
        }
        setValue('endereco', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);

        clearErrors(['cidade', 'endereco', 'estado', 'bairro']);
      }
    };
    fetchCep();
  }, [cep, setValue, clearErrors]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    artisanStore.update({
      nomeComercial: data.nomeComercial,
      cep: data.cep,
      endereco: data.endereco,
      numero: data.numero,
      bairro: data.bairro,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
    });
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bem-vindo Artesão!</h2>
      <p className="text-md text-midnight mt-4">
        Vamos continuar seu cadastro...
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthInput
          placeholder="Nome Comercial"
          type="text"
          {...register('nomeComercial')}
          maxLength={50}
          hasError={!!errors.nomeComercial}
          errorMessage={errors.nomeComercial?.message}
        />
        <AuthInput
          placeholder="CEP"
          type="text"
          {...register('cep')}
          maxLength={8}
          hasError={!!errors.cep}
          errorMessage={errors.cep?.message}
        />
        <AuthInput
          placeholder="Endereço"
          type="text"
          {...register('endereco')}
          maxLength={100}
          hasError={!!errors.endereco}
          errorMessage={errors.endereco?.message}
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <AuthInput
              placeholder="Nº"
              type="text"
              className="pr-0 pl-5"
              {...register('numero')}
              maxLength={10}
              hasError={!!errors.numero}
              errorMessage={errors.numero?.message}
            />
          </div>
          <div className="col-span-2">
            <AuthInput
              placeholder="Bairro"
              type="text"
              {...register('bairro')}
              maxLength={50}
              hasError={!!errors.bairro}
              errorMessage={errors.bairro?.message}
            />
          </div>
        </div>
        <AuthInput
          placeholder="Complemento"
          type="text"
          {...register('complemento')}
          maxLength={50}
        />
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="col-span-2">
            <AuthInput
              placeholder="Cidade"
              type="text"
              {...register('cidade')}
              maxLength={50}
              hasError={!!errors.cidade}
              errorMessage={errors.cidade?.message}
            />
          </div>
          <div className="col-span-1">
            <AuthInput
              placeholder="Estado"
              type="text"
              className="p-0 text-center"
              {...register('estado')}
              maxLength={2}
              hasError={!!errors.estado}
              errorMessage={errors.estado?.message}
            />
          </div>
        </div>
        <AuthButton text="Continuar" />
      </form>
    </div>
  );
}

export default ArtisanStepAddress;
