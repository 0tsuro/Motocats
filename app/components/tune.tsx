"use client";

import Image from "next/image";
import { useMemo } from "react";

type Props = {
  closing: boolean;
  onClose: () => void;
};

/* ========================== */
/* Progress bar (pure visual) */
/* ========================== */
function ProgressBar({ sold, total }: { sold: number; total: number }) {
  const pct = useMemo(
    () => Math.max(0, Math.min(100, (sold / total) * 100)),
    [sold, total]
  );

  return (
    <div
      className="
        rounded-3xl border ring-1
        p-8
        bg-black/30 border-white/70 ring-white/10
        backdrop-blur-md
      "
    >
      <div
        className="mb-3 text-center font-extrabold"
        style={{ fontSize: "clamp(16px,1.8vw,24px)" }}
      >
        {sold.toLocaleString("en-US")} / {total.toLocaleString("en-US")} Boost
        sold!
      </div>

      {/* Track */}
      <div className="relative h-2.5 w-full rounded-full bg-white/70">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg,#ffcf2e 0%, #ff8a00 45%, #d72638 100%)",
          }}
        />
      </div>

      <div
        className="mt-4 text-center font-extrabold opacity-90"
        style={{ fontSize: "clamp(14px,1.5vw,20px)" }}
      >
        {Math.round(pct)}% sold out
      </div>
    </div>
  );
}

/* ========================= */
/* Main Tune panel component */
/* ========================= */
export default function Tune({ closing, onClose }: Props) {
  const boostsOnWallet = 15;
  const sold = 12_000;
  const total = 20_000;

  return (
    <div
      className="absolute inset-x-0 z-20 mx-5 md:mx-8 lg:mx-14 xl:mx-20"
      style={{ top: "clamp(100px,11vh,140px)" }}
    >
      {/* Title */}
      <h2
        className="p-6 text-center font-extrabold tracking-wide drop-shadow"
        style={{
          fontSize: "clamp(16px,2vw,28px)",
          marginBottom: "clamp(12px,1vw,20px)",
        }}
      >
        PIMP YOUR RIDE!
      </h2>

      <div
        className={`mx-auto max-w-[1100px] space-y-10 ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* Wallet boosts */}
        <div
          className="
            rounded-3xl border-2 ring-1
            p-10
            bg-[#2B2B2B] border-white/100 ring-white/10
          "
        >
          <div
            className="text-center font-extrabold opacity-90"
            style={{ fontSize: "clamp(14px,1.4vw,20px)" }}
          >
            Boosts you currently hold on this wallet
          </div>

          <div
            className="mt-8 text-center font-extrabold leading-none"
            style={{ fontSize: "clamp(36px,3.8vw,64px)" }}
          >
            {boostsOnWallet}
          </div>

          <div className="mt-5 flex items-center justify-center">
            <Image src="/flames.png" width={160} height={160} alt="" />
          </div>
        </div>

        {/* Global sale progress */}
        <ProgressBar sold={sold} total={total} />

        {/* CTA */}
        <div className="pt-1">
          <button
            className="
              mx-auto block w-full max-w-[420px]
              cursor-pointer
              rounded-xl bg-gradient-to-r from-[#A441FF] to-[#5D2095]
              px-5 py-3.5
              text-base font-extrabold text-white
            "
          >
            BUY BOOST
          </button>
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="
          ml-auto mt-[clamp(10px,1vw,14px)] block
          rounded-md border bg-white/10 px-3 py-1.5 text-xs
          border-white/25 hover:bg-white/20
        "
      >
        Close
      </button>
    </div>
  );
}
