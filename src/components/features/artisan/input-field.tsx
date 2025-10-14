import React, { forwardRef } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label}
            {props.required && <span className="text-salmon ml-1">*</span>}
          </label>
        )}
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sakura focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
