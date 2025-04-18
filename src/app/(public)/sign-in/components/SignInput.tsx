import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface SignInputProps {
  placeholder: string;
  type: string;
  hasError?: boolean;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ hasError, placeholder, type, ...rest }, ref) => {

    return (
      <Input
        ref={ref}
        type={type} 
        placeholder={placeholder}
        className={`${hasError
          ? "border-magenta border-2 focus-visible:ring-2 focus-visible:border-magenta placeholder:text-magenta"
          : "placeholder:text-color-mint-700"}
          bg-[#E4F5E9]  placeholder:px-3 placeholder:text-sm placeholder:font-bold w-full  h-12 rounded-3xl inset-shadow-sm inset-shadow-black/40`}
        {...rest} />
    )
  }
);

SignInput.displayName = 'SignInput';

export default SignInput;