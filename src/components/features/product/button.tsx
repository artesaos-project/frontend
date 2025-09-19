'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  Icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  width?: string;
}

const Button = ({
  text,
  Icon,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  width,
}: ButtonProps) => {
  const baseClasses =
    'flex items-center justify-center font-bold rounded transition-colors duration-300';

  const variantClasses = {
    primary: 'bg-[#1B7132] text-white hover:bg-[#156029]',
    secondary: 'bg-[#E0001E] text-white hover:bg-[#c5001a]',
    outline:
      'border-2 border-[#1B7132] text-[#1B7132] hover:bg-[#1B7132] hover:text-white',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9.5 text-[10px] p-2.5 font-bold',
    lg: 'h-12 px-6 text-base',
  };

  const widthStyle = width ? { width } : {};

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={widthStyle}
      onClick={onClick}
    >
      <span className="mr-2">{text}</span>
      {Icon && <div className="flex items-center justify-center">{Icon}</div>}
    </button>
  );
};

export default Button;
