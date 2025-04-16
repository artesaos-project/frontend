import { forwardRef } from "react";
import { Input } from "@/components/ui/input";

const inputStyles = {
  WebkitTextFillColor: "#985E00",
  transition: "background-color 5000s ease-in-out 0s",
};

const SignInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }>(
  ({hasError, className, ...props}, ref) => (
    <Input
      ref={ref}
      className={`${className} ${hasError ? 'border-red-500 placeholder:text-magenta' : 'border-none placeholder:text-[#985E00]'} w-full h-10 bg-[#FFF2DE]  rounded-[20px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] font-bold`}
      style={inputStyles}
      {...props}
    />
  )
);

SignInput.displayName = "SignInput";

export default SignInput;
