import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  min?: string;
  step?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  disabled = false,
  min,
  step,
  className = '',
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-salmon ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sakura focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        step={step}
      />
    </div>
  );
};

export default InputField;
