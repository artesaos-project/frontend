import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface SignInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconSize?: string;
  iconClassName?: string;
  className?: string;
  placeholder: string;
  type: string;
  hasError?: boolean;
  errorMessage?: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  (
    {
      hasError,
      className ,
      placeholder,
      icon,
      iconPosition = "left",
      iconClassName = "",
      type,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`${className} bg-white font-normal`}>
        <div className={`relative overflow-hidden`}>
          <Input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`bg-[#FFF2DE] border-2 border-black/30 focus-visible:border-3 focus-visible:border-solar-700 placeholder:text-[#985E00] placeholder:px-3 placeholder:text-sm placeholder:font-bold w-full h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40 ${className}
            ${
              hasError &&
              "border-salmon focus-visible:border-2 focus-visible:border-salmon placeholder:text-salmon"
            }`}
            {...rest}
          />
          {icon && iconPosition === "right" && (
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconClassName}`}
            >
              {icon}
            </span>
          )}
        </div>
        {hasError && errorMessage && (
          <span className="text-sm text-salmon block mt-1">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

SignInput.displayName = "SignInput";

export default SignInput;
