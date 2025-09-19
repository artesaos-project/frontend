interface AuthButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

function AuthButton({
  text = 'Continuar',
  className = '',
  onClick,
  icon,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full h-10.5 rounded-full bg-midnight hover:bg-white hover:text-midnight hover:border-midnight hover:border transition text-white font-semibold
        cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default AuthButton;
