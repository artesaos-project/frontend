import { forwardRef, InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    { type, placeholder, icon, className, hasError, errorMessage, ...props },
    ref,
  ) => {
    return (
      <div className="relative">
        <div className="relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={` w-full h-10 border-2  
          rounded-full pl-5 pr-12 placeholder:font-semibold
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
          <p className="pt-2 text-xs text-salmon">{errorMessage}</p>
        )}
      </div>
    );
  },
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
