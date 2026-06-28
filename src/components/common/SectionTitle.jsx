import React from "react";
import { cn } from "@/lib/utils";

export default function SectionTitle({
  title,
  subtitle,
  icon: Icon,
  action,
  align = "left",
  className = "",
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-300" />
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 text-blue-300 text-sm max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}