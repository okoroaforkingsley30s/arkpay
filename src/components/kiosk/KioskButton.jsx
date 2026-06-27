import React from "react";

export default function KioskButton({ children, onClick, variant = "primary", className = "", icon, disabled = false }) {
  const base = "flex items-center justify-center gap-3 rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 py-4 px-8 text-base",
    secondary: "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm py-4 px-8 text-base",
    outline: "bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-600 py-4 px-8 text-base",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 py-3 px-6 text-sm",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 py-4 px-8 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}