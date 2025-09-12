interface AuthInputProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
}

function AuthInput({type, placeholder, icon, className}: AuthInputProps) {
  return (
    <input 
      type={type} 
      placeholder={placeholder}
      className={`${className} w-full h-10 border border-midnight 
      rounded-full px-5 placeholder:text-midnight placeholder:font-semibold
      placeholder:text-sm`}
    />
  )
}

export default AuthInput