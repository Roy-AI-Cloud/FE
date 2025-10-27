import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg";

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-500 to-purple-500"
      : "bg-gradient-to-r from-purple-500 to-pink-500";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default GradientButton;
