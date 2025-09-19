import { InputHTMLAttributes } from 'react';
interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  hasError?: boolean;
  errorMessage?: string;
}

function AuthInput({
  type,
  name,
  placeholder,
  icon,
  className = 'pl-5 pr-12',
  hasError,
  errorMessage,
  ...props
}: AuthInputProps) {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full h-10 border-2  
        rounded-full placeholder:font-semibold
        placeholder:text-sm
        ${hasError ? 'placeholder:text-salmon border-salmon bg-sakura-100' : 'placeholder:text-midnight border-midnight'} 
        ${className}`}
          {...props}
        />

        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      {hasError && errorMessage && (
        <p className="p-1 text-xs font-semibold text-salmon">{errorMessage}</p>
      )}
    </div>
  );
}

export default AuthInput;
