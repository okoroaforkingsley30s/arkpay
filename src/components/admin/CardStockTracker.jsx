import React from "react";
import { CreditCard, CheckCircle2, XCircle, Package, AlertTriangle } from "lucide-react";

const TOTAL_CAPACITY = 200;
const LOADED = 87;
const ISSUED = 42;
const FAILED = 3;
const REMAINING = LOADED - ISSUED - FAILED;
const LOW_STOCK_THRESHOLD = 20;

export default function CardStockTracker() {
  const isLowStock = REMAINING <= LOW_STOCK_THRESHOLD;
  const usedPercent = Math.round(((ISSUED + FAILED) / LOADED) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-base">Card Stock Inventory</h3>
        {isLowStock && (
          <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            Low Stock Warning
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Cards Used</span>
          <span>{ISSUED + FAILED} / {LOADED}</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isLowStock ? "bg-red-500" : "bg-blue-500"}`}
            style={{ width: `${usedPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>{TOTAL_CAPACITY} max capacity</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Package} label="Blank Cards Loaded" value={LOADED} color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={CheckCircle2} label="Cards Issued" value={ISSUED} color="text-green-600" bg="bg-green-50" />
        <StatCard icon={XCircle} label="Failed/Wasted" value={FAILED} color="text-red-600" bg="bg-red-50" />
        <StatCard
          icon={CreditCard}
          label="Remaining"
          value={REMAINING}
          color={isLowStock ? "text-red-600" : "text-gray-900"}
          bg={isLowStock ? "bg-red-50" : "bg-gray-50"}
        />
      </div>

      {isLowStock && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-700">
            <strong>Action required:</strong> Only {REMAINING} blank cards remaining. Please reload the Seaory S21 card hopper to avoid service interruption.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: IconComp, label, value, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-3.5 flex items-center gap-3`}>
      <div className={`${color}`}>
        <IconComp className="w-5 h-5" />
      </div>
      <div>
        <p className={`text-xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-gray-500 leading-tight">{label}</p>
      </div>
    </div>
  );
}