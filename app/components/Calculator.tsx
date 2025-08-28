"use client";

import { useMemo, useState } from "react";

/* =============================================
   Props
============================================= */
type Props = {
  closing: boolean;
  onClose: () => void;
};

/* =============================================
   Small UI helpers (kept as-is for future reuse)
============================================= */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center px-3 gap-1 text-center">
      <div className="text-[clamp(12px,1.2vw,16px)] font-extrabold tracking-wide opacity-90">
        {label}
      </div>
      <div className="text-[clamp(22px,2.6vw,36px)] font-extrabold leading-none">
        {value}
      </div>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  suffix = "CURRENT",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-[clamp(11px,1vw,14px)] font-extrabold opacity-90">
        {label}
      </div>

      <div className="relative">
        <input
          className="w-full rounded-xl px-3 py-2 font-extrabold text-white outline-none bg-white/25 placeholder:opacity-70 ring-1 ring-white/20 focus:ring-white/40"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-3 py-1 text-[11px] font-extrabold bg-white/30">
          {suffix}
        </span>
      </div>
    </div>
  );
}

/* =============================================
   Calculator (main)
   - Static "key numbers" header card
   - Glass card with inputs & computed results
============================================= */
export default function Calculator({ closing, onClose }: Props) {
  // --- demo state (replace with backend values when available)
  const [catsHold] = useState(13);
  const [walletSpeed] = useState(1.845);
  const [fullMiles] = useState("1.885.245");

  const [motoPrice, setMotoPrice] = useState("$1");
  const [motoMktCap, setMotoMktCap] = useState("$1.000.000.000");

  // --- mock computed values (replace with real formulae)
  const rewards = useMemo(() => "246.378 $MOTO", []);
  const potentialReturn = useMemo(() => "$1003355", []);
  const lambos = useMemo(() => "4", []);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center px-6 md:px-10 lg:px-16 xl:px-24">
      <div
        className={`w-full max-w-[1120px] space-y-6 ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* =============================================
            Header card: Title + Key figures
        ============================================== */}
        <section className="overflow-hidden rounded-[26px] border-[3px] border-white/90 bg-[#2B2B2B] px-6 py-12">
          {/* Title (left aligned) */}
          <div className="pl-20 text-left">
            <div
              className="font-extrabold leading-none"
              style={{ fontSize: "clamp(26px,3vw,44px)" }}
            >
              CALCULATOR
            </div>
            <div className="mt-2 text-xl font-extrabold opacity-90">
              ESTIMATE YOUR RETURNS
            </div>
          </div>

          {/* Key numbers (3 columns on md+) */}
          <div className="mt-8 grid grid-cols-1 gap-6 text-center md:grid-cols-3">
            <div>
              <div className="text-[clamp(12px,1.2vw,16px)] font-extrabold tracking-wide opacity-90">
                TOTAL CATS YOU HOLD
              </div>
              <div className="mt-2 text-[clamp(22px,2.6vw,36px)] font-extrabold leading-none">
                {catsHold}
              </div>
            </div>

            <div>
              <div className="text-[clamp(12px,1.2vw,16px)] font-extrabold tracking-wide opacity-90">
                YOUR CURRENT WALLET SPEED (MP/H)
              </div>
              <div className="mt-2 text-[clamp(22px,2.6vw,36px)] font-extrabold leading-none">
                {walletSpeed}
              </div>
            </div>

            <div>
              <div className="text-[clamp(12px,1.2vw,16px)] font-extrabold tracking-wide opacity-90">
                FULL COLLECTION MILES
              </div>
              <div className="mt-2 text-[clamp(22px,2.6vw,36px)] font-extrabold leading-none">
                {fullMiles}
              </div>
            </div>
          </div>
        </section>

        {/* =============================================
            Glass card: Inputs (static "CURRENT" rows) + Results
        ============================================== */}
        <section className="mt-8 overflow-hidden border border-white/30 bg-black/50 p-8 ring-1 ring-white/10 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,.45)]">
          {/* Inputs grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* $MOTO PRICE (static row with CURRENT pill) */}
            <div>
              <div className="mb-2 font-extrabold uppercase tracking-wide opacity-90">
                $MOTO PRICE
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/30 bg-white/20 px-4 py-2 font-extrabold text-white backdrop-blur-sm">
                <span>$1</span>
                <span className="text-sm opacity-80">CURRENT</span>
              </div>
            </div>

            {/* $MOTO MARKETCAP (static row with CURRENT pill) */}
            <div>
              <div className="mb-2 font-extrabold uppercase tracking-wide opacity-90">
                $MOTO MARKETCAP
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/30 bg-white/20 px-4 py-2 font-extrabold text-white backdrop-blur-sm">
                <span>$1.000.000.000</span>
                <span className="text-sm opacity-80">CURRENT</span>
              </div>
            </div>
          </div>

          {/* Results grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3 font-extrabold text-white/90">
              <div>$moto rewards estimation</div>
              <div>Potential return</div>
              <div>Potential number of lambos</div>
            </div>
            <div className="space-y-3 text-right font-extrabold">
              <div>{rewards}</div>
              <div>{potentialReturn}</div>
              <div>{lambos}</div>
            </div>
          </div>
        </section>

        {/* Close button (consistent with other panels) */}
        <button
          onClick={onClose}
          className="ml-auto block rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
        >
          Close
        </button>
      </div>
    </div>
  );
}
