import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25",
  secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10",
  success: "bg-green-600 hover:bg-green-500 text-white shadow-green-600/25",
  danger: "bg-red-600 hover:bg-red-500 text-white shadow-red-600/25",
  outline: "bg-transparent hover:bg-white/10 text-blue-200 border border-blue-400/40",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-10 py-4 text-lg rounded-2xl",
  xl: "px-14 py-5 text-xl rounded-2xl",
};

export default function PrimaryButton({
  children,
  type = "button",
  variant = "primary",
  size = "lg",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-3 font-bold transition-all duration-300 shadow-xl",
        "focus:outline-none focus:ring-4 focus:ring-blue-500/30",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "active:scale-95",
        variants[variant] || variants.primary,
        sizes[size] || sizes.lg,
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : Icon ? <Icon className="w-5 h-5" /> : null}
      {children}
      {!loading && IconRight ? <IconRight className="w-5 h-5" /> : null}
    </button>
  );
}