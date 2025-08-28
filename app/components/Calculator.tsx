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
    <div className="flex flex-col items-center gap-1 px-3 text-center">
      <div className="text-[clamp(11px,1.1vw,15px)] font-extrabold tracking-wide opacity-90">
        {label}
      </div>
      <div className="text-[clamp(20px,2.2vw,32px)] font-extrabold leading-none">
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
      <div className="text-[clamp(10px,0.95vw,13px)] font-extrabold opacity-90">
        {label}
      </div>

      <div className="relative">
        <input
          className="w-full rounded-xl bg-white/25 px-3 py-2 font-extrabold text-white outline-none placeholder:opacity-70 ring-1 ring-white/20 focus:ring-white/40"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-white/30 px-3 py-1 text-[11px] font-extrabold">
          {suffix}
        </span>
      </div>
    </div>
  );
}

/* =============================================
   Calculator (main)
============================================= */
export default function Calculator({ closing, onClose }: Props) {
  // demo state (to be replaced by backend)
  const [catsHold] = useState(13);
  const [walletSpeed] = useState(1.845);
  const [fullMiles] = useState("1.885.245");

  const [motoPrice, setMotoPrice] = useState("$1");
  const [motoMktCap, setMotoMktCap] = useState("$1.000.000.000");

  // mock computed values
  const rewards = useMemo(() => "246.378 $MOTO", []);
  const potentialReturn = useMemo(() => "$1003355", []);
  const lambos = useMemo(() => "4", []);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center px-5 md:px-8 lg:px-12">
      <div
        className={`w-full max-w-[1000px] space-y-6 ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* =============================================
            Header card: Title + Key figures
        ============================================== */}
        <section className="overflow-hidden rounded-[24px] border-[3px] border-white/90 bg-[#2B2B2B] px-6 py-10">
          {/* Title (left aligned) */}
          <div className="pl-12 text-left">
            <div
              className="font-extrabold leading-none"
              style={{ fontSize: "clamp(22px,2.6vw,38px)" }}
            >
              CALCULATOR
            </div>
            <div className="mt-1.5 text-lg font-extrabold opacity-90">
              ESTIMATE YOUR RETURNS
            </div>
          </div>

          {/* Key numbers */}
          <div className="mt-6 grid grid-cols-1 gap-5 text-center md:grid-cols-3">
            <div>
              <div className="text-[clamp(11px,1.1vw,15px)] font-extrabold tracking-wide opacity-90">
                TOTAL CATS YOU HOLD
              </div>
              <div className="mt-1.5 text-[clamp(20px,2.2vw,32px)] font-extrabold leading-none">
                {catsHold}
              </div>
            </div>

            <div>
              <div className="text-[clamp(11px,1.1vw,15px)] font-extrabold tracking-wide opacity-90">
                YOUR CURRENT WALLET SPEED (MP/H)
              </div>
              <div className="mt-1.5 text-[clamp(20px,2.2vw,32px)] font-extrabold leading-none">
                {walletSpeed}
              </div>
            </div>

            <div>
              <div className="text-[clamp(11px,1.1vw,15px)] font-extrabold tracking-wide opacity-90">
                FULL COLLECTION MILES
              </div>
              <div className="mt-1.5 text-[clamp(20px,2.2vw,32px)] font-extrabold leading-none">
                {fullMiles}
              </div>
            </div>
          </div>
        </section>

        {/* =============================================
            Glass card: Inputs + Results
        ============================================== */}
        <section className="mt-6 overflow-hidden border border-white/30 bg-black/50 p-7 ring-1 ring-white/10 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,.45)]">
          {/* Inputs grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* $MOTO PRICE */}
            <div>
              <div className="mb-2 font-extrabold uppercase tracking-wide opacity-90">
                $MOTO PRICE
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/30 bg-white/20 px-4 py-2 font-extrabold text-white backdrop-blur-sm">
                <span>$1</span>
                <span className="text-sm opacity-80">CURRENT</span>
              </div>
            </div>

            {/* $MOTO MARKETCAP */}
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

          {/* Results */}
          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="space-y-2.5 font-extrabold text-white/90">
              <div>$moto rewards estimation</div>
              <div>Potential return</div>
              <div>Potential number of lambos</div>
            </div>
            <div className="space-y-2.5 text-right font-extrabold">
              <div>{rewards}</div>
              <div>{potentialReturn}</div>
              <div>{lambos}</div>
            </div>
          </div>
        </section>

        {/* Close */}
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
