import React from "react";
import { Inbox } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing to display",
  message = "There are currently no records available.",
  actionLabel,
  onAction,
  children,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-8">

      <div className="w-24 h-24 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-blue-300" />
      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-blue-300 leading-relaxed">
        {message}
      </p>

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}

      {actionLabel && onAction && (
        <div className="mt-8">
          <PrimaryButton
            onClick={onAction}
            size="md"
          >
            {actionLabel}
          </PrimaryButton>
        </div>
      )}

    </div>
  );
}