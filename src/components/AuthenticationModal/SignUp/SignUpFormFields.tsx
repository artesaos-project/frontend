import { forwardRef, useEffect, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { FaRegCalendarAlt } from 'react-icons/fa';
import SignInput from '../SignInput';

type SignUpData = {
  name: string;
  socialName?: string;
  cpf: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  codigoPais: string;
  ddd: string;
  phone: string;
  isArtisan?: boolean;
};

interface SelectProps {
  options: { value: string; label: string }[];
  [key: string]: unknown;
}

const Select = ({ options, ...props }: SelectProps) => (
  <select
    {...props}
    className="col-span-1 rounded-3xl border border-mint-200 px-2 p-2 bg-[#FFF2DE] inset-shadow-sm inset-shadow-black/40 font-bold text-center"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface PasswordFieldProps {
  name: 'password' | 'confirmPassword';
  placeholder: string;
  register: UseFormRegister<SignUpData>;
  error: FieldError | undefined;
  visible: boolean;
  onToggle: () => void;
  showInfo?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  currentPassword?: string;
}

const ValidationItem = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <p className={isValid ? 'text-green-600' : 'text-salmon'}>
    {isValid ? '✓' : '•'} {text}
  </p>
);

const usePasswordValidation = (password: string, shouldValidate: boolean) => {
  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    if (shouldValidate) {
      setValidation({
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    }
  }, [password, shouldValidate]);

  return validation;
};

export const PasswordField = forwardRef<HTMLDivElement, PasswordFieldProps>(
  (
    {
      name,
      placeholder,
      register,
      error,
      visible,
      onToggle,
      showInfo = false,
      onFocus,
      onBlur,
      currentPassword = '',
    },
    ref,
  ) => {
    const validation = usePasswordValidation(
      currentPassword,
      name === 'password' && showInfo,
    );

    return (
      <div className="relative" ref={ref}>
        <SignInput
          placeholder={placeholder}
          type={visible ? 'text' : 'password'}
          {...register(name)}
          hasError={!!error}
          errorMessage={error?.message}
          icon={
            <button
              type="button"
              onClick={onToggle}
              className="p-1 focus:outline-none focus:ring-2 focus:ring-solar-700 rounded-2xl"
              aria-label="Alternar visibilidade da senha"
            >
              {visible ? (
                <AiOutlineEyeInvisible
                  size={20}
                  color={error ? 'salmon' : '#E05D00'}
                />
              ) : (
                <AiOutlineEye size={20} color={error ? 'salmon' : '#E05D00'} />
              )}
            </button>
          }
          iconPosition="right"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {name === 'password' && showInfo && !error && (
          <div className="relative text-xs p-2 mt-1 bg-gray-50 rounded-lg border border-gray-200">
            <ValidationItem
              isValid={validation.minLength}
              text="No mínimo 8 caracteres"
            />

            <ValidationItem
              isValid={validation.hasUpperCase}
              text="Pelo menos 1 letra maiúscula"
            />

            <ValidationItem
              isValid={validation.hasLowerCase}
              text="Pelo menos 1 letra minúscula"
            />

            <ValidationItem
              isValid={validation.hasNumber}
              text="Pelo menos 1 número"
            />

            <ValidationItem
              isValid={validation.hasSpecialChar}
              text="Pelo menos 1 caractere especial"
            />
          </div>
        )}
      </div>
    );
  },
);

PasswordField.displayName = 'PasswordField';

interface BirthDateFieldProps {
  value: string;
  onChange: (value: string) => void;
  error: FieldError | undefined;
}

export const BirthDateField = ({
  value,
  onChange,
  error,
}: BirthDateFieldProps) => (
  <div className="relative">
    <SignInput
      placeholder="Data de Nascimento*"
      type="text"
      hasError={!!error}
      errorMessage={error?.message}
      icon={
        <FaRegCalendarAlt
          size={16}
          color={error ? 'salmon' : '#985E00'}
          className={`pointer-events-none font-bold${
            error ? 'text-salmon' : 'text-[#985E00]'
          }`}
        />
      }
      iconPosition="right"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputMode="numeric"
      autoComplete="off"
    />
  </div>
);

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
        <SignInput
          className="placeholder:px-0.5 placeholder:text-sm text-center"
          type="text"
          placeholder="DDD"
          {...register('ddd')}
          hasError={!!errors.ddd}
        />
      </div>
      <div className="col-span-2">
        <SignInput
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

interface ArtisanCheckboxProps {
  register: UseFormRegister<SignUpData>;
  onInfoClick: () => void;
}

export const ArtisanCheckbox = ({
  register,
  onInfoClick,
}: ArtisanCheckboxProps) => (
  <div className="flex items-center justify-between bg-[#F6F6F6] text-mint-600 w-full h-10 rounded-3xl py-1 px-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]">
    <div className="flex items-center">
      <input
        id="isArtisan"
        type="checkbox"
        {...register('isArtisan')}
        className="mr-2 h-5 w-3 text-[#E05D00]"
      />
      <label htmlFor="isArtisan" className="text-base">
        Sou Artesão
      </label>
    </div>
    <button type="button" aria-label="Info artesão" onClick={onInfoClick}>
      <AiOutlineInfoCircle />
    </button>
  </div>
);
