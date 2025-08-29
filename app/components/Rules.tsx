"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Rules({
  onClose,
  closing,
}: {
  onClose: () => void;
  closing?: boolean;
}) {
  /* ---------- Close with ESC ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-title"
    >
      {/* Animated container */}
      <div
        className={`relative mx-auto max-w-[45%] w-[62%] sm:w-[58%] md:w-[54%] lg:w-[50%] right-13.5
          ${closing ? "animate-fadeOutDown" : "animate-fadeInUp"}`}
      >
        {/* --- Background PNG --- */}
        <Image
          src="/popup.png"
          alt="Motocat Rules"
          width={1400}
          height={600}
          draggable={false}
          priority
          className="h-auto w-full select-none object-contain"
        />

        {/* --- Close button (remonté) --- */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute -right-10 top-8 z-20 grid h-11 w-11 place-items-center border-2 border-white
            cursor-pointer rounded-full
            bg-white/18 text-2xl text-white leading-none
            ring-1 ring-white/50 backdrop-blur-sm
            hover:bg-white/28 p-3
          "
        >
          X
        </button>

        {/* --- Text overlay --- */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white"
          style={{ paddingTop: "17%", paddingLeft: "7%" }}
        >
          <div className="flex ml-10">
            <Image
              className="mb-8"
              src="/logo.png"
              width={450}
              height={450}
              alt="Motocats racing club"
            />
          </div>
          {/* Rules list (smaller font) */}
          <ul
            className="space-y-3 font-bold text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]"
            style={{
              fontSize: "clamp(14px,1.3vw,19px)",
              maxWidth: "68ch",
              textAlign: "left",
            }}
          >
            <li>
              • You own Motocats, and the Motocats are racing! <br />
              Every motoracer has traits that give them a <br /> speed (MP/H) in
              the race!
            </li>
            <li>
              • Every Bitcoin block (~10 min) your cats travel <br />
              miles = MP/H × (10/60)
            </li>
            <li>
              • The faster your cats and the longer you hold <br />
              them, the more miles they rack up
            </li>
            <li>
              • Extra boosts can increase your bike speed up to <br />
              +100% (coming soon)
            </li>
            <li>
              • X.X% of the $MOTO supply is airdropped at the end <br />
              of the race, split by each racer’s portion of the <br />
              total miles raced by everyone
            </li>
            <li>
              • Selling or transferring a cat resets its miles <br />
              and burns any boosts it had
            </li>
          </ul>

          {/* CTA button (slightly smaller padding/font) */}
          <div className="mt-6 flex w-full justify-start px-[14%]">
            <a
              href="https://magiceden.io"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-md border border-white/35 bg-white/10 px-5 py-2.5
                text-sm font-extrabold text-white
                backdrop-blur-sm hover:bg-white/20
              "
            >
              🏁 Magic Eden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
