'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  text,
  Icon,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  iconPosition = 'right',
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    'flex items-center justify-center font-bold rounded transition-colors duration-300 border-2 rounded-lg disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-olivine-600 border-olivine-600 text-white hover:bg-white hover:text-olivine-600',
    secondary:
      'border-sakura bg-sakura text-white hover:text-sakura hover:bg-white',
    outline:
      'border-olivine-600 bg-white text-olivine-600 hover:bg-olivine-600 hover:text-white',
  } as const;

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9.5 text-xs md:text-md p-2.5 font-bold',
    lg: 'h-12 px-6 text-base',
  } as const;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {iconPosition === 'left' && Icon && (
        <div className="flex items-center justify-center">{Icon}</div>
      )}
      <span className="mr-2">{text}</span>
      {iconPosition === 'right' && Icon && (
        <div className="flex items-center justify-center">{Icon}</div>
      )}
    </button>
  );
};

export default Button;
