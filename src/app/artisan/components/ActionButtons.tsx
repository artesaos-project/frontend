"use client";

type ActionButtonsProps = {
  nameButton: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  iconPosition?: "left" | "right";
};

function ActionButtons({ nameButton, className, icon, iconPosition = "right", onClick }: ActionButtonsProps) {
  return (
      <button className={className} onClick={onClick}>
        <span className="flex items-center gap-2">
          {icon && iconPosition === "left" && <span>{icon}</span>}
          <span>{nameButton}</span>
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </span>
      </button>
  );
}

export default ActionButtons;