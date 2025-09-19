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
      className={`w-full h-10.5 rounded-full bg-midnight hover:bg-sakura text-white font-semibold
         cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default AuthButton;
