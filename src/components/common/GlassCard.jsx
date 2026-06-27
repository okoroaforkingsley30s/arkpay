import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const paddingMap = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function GlassCard({
  children,
  title,
  subtitle,
  icon: Icon,
  footer,
  padding = "md",
  clickable = false,
  loading = false,
  className = "",
  onClick,
}) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={cn(
        "bg-white/5 border border-blue-900/30 rounded-3xl backdrop-blur-md shadow-xl",
        "transition-all duration-300",
        clickable && "cursor-pointer hover:bg-white/10 hover:border-blue-500/50 active:scale-[0.98]",
        paddingMap[padding] || paddingMap.md,
        className
      )}
    >
      {(title || subtitle || Icon) && (
        <div className="flex items-start gap-4 mb-5">
          {Icon && (
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-300" />
            </div>
          )}

          <div className="flex-1">
            {title && <h3 className="text-white text-lg font-bold">{title}</h3>}
            {subtitle && <p className="text-blue-300 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-10 text-blue-300">
          <Loader2 className="w-6 h-6 animate-spin mr-3" />
          Loading...
        </div>
      ) : (
        children
      )}

      {footer && (
        <div className="mt-6 pt-5 border-t border-blue-900/30">
          {footer}
        </div>
      )}
    </div>
  );
}