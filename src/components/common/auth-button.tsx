interface AuthButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

function AuthButton({
  text = 'Continuar',
  className = '',
  onClick,
  icon,
  disabled,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full h-10.5 rounded-full bg-midnight hover:bg-white hover:text-midnight hover:border-midnight hover:border transition text-white font-semibold
        cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
}

export default AuthButton;
