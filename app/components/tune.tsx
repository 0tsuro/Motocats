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
        rounded-4xl border ring-1
        p-10
        bg-black/30 border-white/70 ring-white/10
        backdrop-blur-md
      "
    >
      <div
        className="mb-4 text-center font-extrabold"
        style={{ fontSize: "clamp(18px,2vw,28px)" }}
      >
        {sold.toLocaleString("en-US")} / {total.toLocaleString("en-US")} Boost
        sold!
      </div>

      {/* Track */}
      <div className="relative h-3 w-full rounded-full bg-white/70">
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg,#ffcf2e 0%, #ff8a00 45%, #d72638 100%)",
          }}
        />
      </div>

      <div className="mt-6 text-center text-xl font-extrabold opacity-90">
        {Math.round(pct)}% sold out
      </div>
    </div>
  );
}

/* ========================= */
/* Main Tune panel component */
/* ========================= */
export default function Tune({ closing, onClose }: Props) {
  // NOTE: dummy data replaced by backend later
  const boostsOnWallet = 15;
  const sold = 12_000;
  const total = 20_000;

  return (
    <div
      className="absolute inset-x-0 z-20 mx-6 md:mx-10 lg:mx-16 xl:mx-24"
      style={{ top: "clamp(120px,12vh,160px)" }}
    >
      {/* Title */}
      <h2
        className="p-10 text-center font-extrabold tracking-wide drop-shadow"
        style={{
          fontSize: "clamp(18px,2.2vw,32px)",
          marginBottom: "clamp(14px,1.2vw,24px)",
        }}
      >
        PIMP YOUR RIDE!
      </h2>

      {/* Animated content wrapper */}
      <div
        className={`mx-auto max-w-[1300px] space-y-12 ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* Card: boosts on this wallet */}
        <div
          className="
            rounded-4xl border-2 ring-1
            p-12
            bg-[#2B2B2B] border-white/100 ring-white/10
          "
        >
          <div
            className="text-center font-extrabold opacity-90"
            style={{ fontSize: "clamp(16px,1.6vw,24px)" }}
          >
            Boosts you currently hold on this wallet
          </div>

          <div
            className="mt-12 text-center font-extrabold leading-none"
            style={{ fontSize: "clamp(44px,4.4vw,76px)" }}
          >
            {boostsOnWallet}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Image src="/flames.png" width={200} height={200} alt="" />
          </div>
        </div>

        {/* Card: global sale progress */}
        <ProgressBar sold={sold} total={total} />

        {/* CTA */}
        <div className="pt-1">
          <button
            className="
              mx-auto block w-full max-w-[500px]
              cursor-pointer
              rounded-2xl bg-gradient-to-r from-[#A441FF] to-[#5D2095]
              px-6 py-4
              text-lg font-extrabold text-white
            "
            onClick={() => {
              /* attach CTA handler here */
            }}
          >
            BUY BOOST
          </button>
        </div>
      </div>

      {/* Close button (panel-level) */}
      <button
        onClick={onClose}
        className="
          ml-auto mt-[clamp(12px,1.2vw,16px)] block
          rounded-md border bg-white/10 px-3 py-1.5 text-xs
          border-white/25 hover:bg-white/20
        "
      >
        Close
      </button>
    </div>
  );
}
