/**
 * Button — Primary UI button component
 * Supports primary, secondary, and outline variants.
 */

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "large";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body font-semibold rounded-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary";

  const variants = {
    primary: "bg-primary text-accent-white hover:bg-primary-light",
    secondary: "bg-primary-dark text-accent-white hover:bg-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-accent-white",
  };

  const sizes = {
    default: "px-8 py-4 text-sm",
    large: "px-10 py-5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
