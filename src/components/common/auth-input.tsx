import { useState } from 'react';

interface AuthInputProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  hasError?: boolean;
  errorMessage?: string;
  onToggle?: (isVisible: boolean) => void;
}

function AuthInput({
  type,
  placeholder,
  icon,
  className,
  hasError,
  errorMessage,
  onToggle,
}: AuthInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggle?.(newVisibility);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`${className} w-full h-10 border-2  
        rounded-full pl-5 pr-12 placeholder:font-semibold
        placeholder:text-sm 
        ${hasError ? 'placeholder:text-salmon border-salmon bg-sakura-100' : 'placeholder:text-midnight border-midnight'}`}
        />
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={handleToggle}
          type="button"
        >
          {icon}
        </button>
      </div>
      {hasError && errorMessage && (
        <p className="p-2 text-xs font-semibold text-salmon">{errorMessage}</p>
      )}
    </div>
  );
}

export default AuthInput;
