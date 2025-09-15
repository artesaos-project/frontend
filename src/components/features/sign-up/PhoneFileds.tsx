import AuthInput from '@/components/common/auth-input';
import { SignUpData } from '@/lib/schemas/signUpSchema';
import { UseFormRegister, FieldError } from 'react-hook-form';
import Select from './SelectField';

interface PhoneFieldsProps {
  register: UseFormRegister<SignUpData>;
  errors: {
    phone: FieldError | undefined;
    ddd: FieldError | undefined;
    codigoPais: FieldError | undefined;
  };
}

export const PhoneFields = ({ register, errors }: PhoneFieldsProps) => (
  <>
    <div className="grid grid-cols-4 gap-2">
      <Select
        options={[{ value: '+55', label: '+55' }]}
        {...register('codigoPais')}
      />
      <div>
        <AuthInput
          type="text"
          placeholder="DDD"
          {...register('ddd')}
          hasError={!!errors.ddd}
          className="pl-0! pr-0! text-center"
        />
      </div>
      <div className="col-span-2">
        <AuthInput
          placeholder="Telefone"
          type="tel"
          {...register('phone')}
          hasError={!!errors.phone}
        />
      </div>
    </div>

    {(errors.phone || errors.ddd || errors.codigoPais) && (
      <p className="text-sm text-salmon">
        {errors.ddd?.message ||
          errors.phone?.message ||
          errors.codigoPais?.message}
      </p>
    )}
  </>
);
