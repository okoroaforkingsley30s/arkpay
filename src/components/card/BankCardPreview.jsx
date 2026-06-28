import React, { useState } from "react";
import { ShieldCheck, Wifi } from "lucide-react";

function getNetwork(network = "") {
  return network.toUpperCase();
}

export default function BankCardPreview({
  bankName = "ArkPay Bank",
  bankLogo = null,
  cardNetwork = "VISA",
  nameOnCard = "CARD HOLDER",
  cardNumber = "5399 •••• •••• 7821",
  expiry = "06/29",
  csc = "123",
  themeGradient = "from-[#071321] via-[#0A2540] to-[#123B67]",
}) {
  const network = getNetwork(cardNetwork);
  const [side, setSide] = useState("front");

  return (
    <div className="w-full max-w-lg">
      <div className="flex justify-center gap-3 mb-5">
        <button
          type="button"
          onClick={() => setSide("front")}
          className={`px-5 py-2 rounded-full text-sm font-bold border ${
            side === "front"
              ? "bg-blue-500 text-white border-blue-300"
              : "bg-white/5 text-blue-200 border-blue-900/40"
          }`}
        >
          Front
        </button>

        <button
          type="button"
          onClick={() => setSide("back")}
          className={`px-5 py-2 rounded-full text-sm font-bold border ${
            side === "back"
              ? "bg-blue-500 text-white border-blue-300"
              : "bg-white/5 text-blue-200 border-blue-900/40"
          }`}
        >
          Back
        </button>
      </div>

      {side === "front" ? (
        <CardFront
          bankName={bankName}
          bankLogo={bankLogo}
          network={network}
          nameOnCard={nameOnCard}
          cardNumber={cardNumber}
          expiry={expiry}
          themeGradient={themeGradient}
        />
      ) : (
        <CardBack
          bankName={bankName}
          csc={csc}
          themeGradient={themeGradient}
        />
      )}
    </div>
  );
}

function CardFront({
  bankName,
  bankLogo,
  network,
  nameOnCard,
  cardNumber,
  expiry,
  themeGradient,
}) {
  return (
    <div
      className={`w-full h-72 rounded-[2rem] bg-gradient-to-br ${themeGradient} p-8 shadow-2xl border border-white/10 relative overflow-hidden`}
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5" />

      <div className="relative z-10 flex items-start justify-between gap-5">
        <div className="flex items-center gap-3 min-w-0">
          {bankLogo ? (
            <img
              src={bankLogo}
              alt={`${bankName} logo`}
              className="w-12 h-12 rounded-2xl object-contain bg-white/10 border border-white/10 p-2"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-white font-black text-lg">
                {bankName?.slice(0, 1) || "A"}
              </span>
            </div>
          )}

          <p className="text-white/90 text-lg font-black truncate">
            {bankName}
          </p>
        </div>

        <Wifi className="w-7 h-7 text-white/70 rotate-90 shrink-0" />
      </div>

      <div className="relative z-10 mt-12 flex items-center gap-4">
        <div className="w-16 h-11 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-lg" />
        <p className="text-white text-2xl font-mono tracking-widest">
          {cardNumber}
        </p>
      </div>

      <div className="relative z-10 mt-12 grid grid-cols-[1fr_auto_auto] items-end gap-6">
        <p className="text-white font-bold text-base tracking-wide truncate">
          {nameOnCard || "CARD HOLDER"}
        </p>

        <div className="text-left">
          <p className="text-white/50 text-[10px] uppercase tracking-widest">
            Expires
          </p>
          <p className="text-white font-mono font-bold text-sm">{expiry}</p>
        </div>

        <div className="min-w-[86px] flex justify-end">
          <NetworkLogo network={network} />
        </div>
      </div>

      <div className="absolute top-28 right-8 z-20">
        <ShieldCheck className="w-6 h-6 text-white/60" />
      </div>
    </div>
  );
}

function CardBack({ bankName, csc, themeGradient }) {
  return (
    <div
      className={`w-full h-72 rounded-[2rem] bg-gradient-to-br ${themeGradient} shadow-2xl border border-white/10 relative overflow-hidden`}
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5" />

      <div className="relative z-10 mt-8 h-14 bg-black/70" />

      <div className="relative z-10 px-8 mt-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-12 rounded-lg bg-white/85 border border-white/30 flex items-center px-4">
            <p className="text-slate-600 text-xs italic">
              Authorized Signature
            </p>
          </div>

          <div className="w-24 h-12 rounded-lg bg-white text-slate-900 flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold tracking-widest">CSC</p>
            <p className="text-base font-mono font-black">{csc}</p>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-white/80 text-sm font-bold">{bankName}</p>
            <p className="text-white/50 text-xs mt-1">
              Customer service and issuer information will come from the bank.
            </p>
          </div>

          <p className="text-white/50 text-[10px] uppercase tracking-widest">
            Back Preview
          </p>
        </div>
      </div>
    </div>
  );
}

function NetworkLogo({ network }) {
  if (network === "MASTERCARD") {
    return (
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full bg-red-500 opacity-90" />
        <div className="-ml-4 w-9 h-9 rounded-full bg-yellow-400 opacity-90" />
      </div>
    );
  }

  if (network === "VERVE") {
    return (
      <div className="text-white font-black text-2xl tracking-tight">
        verve
      </div>
    );
  }

  if (network === "PREPAID") {
    return (
      <div className="text-white font-black text-base tracking-widest">
        PREPAID
      </div>
    );
  }

  return (
    <div className="text-white font-black text-3xl italic tracking-tight">
      VISA
    </div>
  );
}