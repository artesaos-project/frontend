const validations = [
  {
    key: 'minLength',
    test: (p: string) => p.length >= 8,
    text: 'No mínimo 8 caracteres',
  },
  {
    key: 'hasUpperCase',
    test: (p: string) => /[A-Z]/.test(p),
    text: 'Pelo menos 1 letra maiúscula',
  },
  {
    key: 'hasLowerCase',
    test: (p: string) => /[a-z]/.test(p),
    text: 'Pelo menos 1 letra minúscula',
  },
  {
    key: 'hasNumber',
    test: (p: string) => /\d/.test(p),
    text: 'Pelo menos 1 número',
  },
  {
    key: 'hasSpecialChar',
    test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
    text: 'Pelo menos 1 caractere especial',
  },
];

interface PasswordValidationBoxProps {
  password: string;
  shouldValidate: boolean;
  name: string;
  showInfo: boolean;
  error?: boolean;
}

export const PasswordValidationBox = ({
  password,
  shouldValidate,
  name,
  showInfo,
  error,
}: PasswordValidationBoxProps) => {
  if (!(name === 'password' && showInfo && !error && shouldValidate))
    return null;

  return (
    <div className="relative text-xs p-2 mt-1 bg-gray-50 rounded-lg border border-gray-200">
      {validations.map(({ key, test, text }) => (
        <p
          key={key}
          className={test(password) ? 'text-green-600' : 'text-salmon'}
        >
          {test(password) ? '✓' : '✗'} {text}
        </p>
      ))}
    </div>
  );
};

export default PasswordValidationBox;
