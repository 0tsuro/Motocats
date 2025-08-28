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
        className={`relative mx-auto max-w-4xl w-[62%] sm:w-[58%] md:w-[54%] lg:w-[50%]
          ${closing ? "animate-fadeOutDown" : "animate-fadeInUp"}`}
      >
        {/* --- Background PNG --- */}
        <Image
          src="/rulesbg.png"
          alt="Motocat Rules"
          width={1600}
          height={900}
          draggable={false}
          priority
          className="h-auto w-full select-none object-contain"
        />

        {/* --- Close button (always clickable, above content) --- */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute -right-6 top-16 z-20 grid h-12 w-12 place-items-center
            cursor-pointer rounded-full
            bg-white/18 text-3xl text-white leading-none
            ring-1 ring-white/50 backdrop-blur-sm
            hover:bg-white/28
          "
        >
          ×
        </button>

        {/* --- Text overlay --- */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center text-center text-white"
          style={{ paddingTop: "18%", paddingLeft: "8%" }}
        >
          {/* Title (2 lines, no extra spacing) */}
          <h2
            id="rules-title"
            className="m-0 p-0 drop-shadow-[0_2px_6px_rgba(0,0,0,.5)]"
            style={{
              fontSize: "clamp(52px,6vw,80px)",
              lineHeight: 0.9,
              color: "rgba(217,217,217,0.3)",
              WebkitTextStroke: "1px white",
            }}
          >
            MOTOCAT
            <br />
            <span
              style={{
                fontSize: "clamp(32px,4vw,50px)",
                color: "rgba(217,217,217,0.3)",
                WebkitTextStroke: "1px white",
                display: "inline-block",
                transform: "translateY(-2px)",
              }}
            >
              RACING CLUB
            </span>
          </h2>

          {/* Rules list */}
          <ul
            className="space-y-4 font-bold text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]"
            style={{
              fontSize: "clamp(16px,1.5vw,22px)",
              maxWidth: "70ch",
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

          {/* CTA button */}
          <div className="mt-8 flex w-full justify-start px-[15%]">
            <a
              href="https://magiceden.io"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-md border border-white/35 bg-white/10 px-6 py-3
                text-base font-extrabold text-white
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
