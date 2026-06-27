import React from "react";
import { Circle, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  ready: {
    label: "Ready",
    className: "bg-green-500/10 text-green-300 border-green-500/30",
    icon: CheckCircle2,
  },
  online: {
    label: "Online",
    className: "bg-green-500/10 text-green-300 border-green-500/30",
    icon: CheckCircle2,
  },
  success: {
    label: "Success",
    className: "bg-green-500/10 text-green-300 border-green-500/30",
    icon: CheckCircle2,
  },
  offline: {
    label: "Offline",
    className: "bg-red-500/10 text-red-300 border-red-500/30",
    icon: XCircle,
  },
  error: {
    label: "Error",
    className: "bg-red-500/10 text-red-300 border-red-500/30",
    icon: XCircle,
  },
  warning: {
    label: "Warning",
    className: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
    icon: AlertTriangle,
  },
  pending: {
    label: "Pending",
    className: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    icon: Clock,
  },
  neutral: {
    label: "Status",
    className: "bg-white/10 text-blue-200 border-white/10",
    icon: Circle,
  },
};

export default function StatusBadge({
  status = "neutral",
  label,
  size = "md",
  showIcon = true,
  className = "",
}) {
  const current = variants[status?.toLowerCase()] || variants.neutral;
  const Icon = current.icon;

  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-semibold",
        current.className,
        sizes[size] || sizes.md,
        className
      )}
    >
      {showIcon && <Icon className="w-4 h-4" />}
      {label || current.label}
    </span>
  );
}