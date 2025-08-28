"use client";

import Image from "next/image";
import { useMemo } from "react";

/* ============================================================
   Podium config (assets, names, sizes, positions)
============================================================ */

const PODIUM_BG = "/pod.png";

const TOP3 = {
  first: { name: "@Mister Mustache", avatar: "/a1.png" },
  second: { name: "@Jolly Jumper", avatar: "/a2.png" },
  third: { name: "@Retard Master", avatar: "/a3.png" },
} as const;

// Avatar sizes (fluid, desktop-first)
const AV_SIZE_MAIN = "clamp(110px, 9vw, 180px)";
const AV_SIZE_SIDE = "clamp(90px, 7.5vw, 150px)";

// Avatar positions (percentages) — tuned for FHD/2K/4K
const AV_POS = {
  first: { left: "50%", top: "-47%" },
  second: { left: "17%", top: "-18%" },
  third: { left: "85%", top: "-2%" },
} as const;

const NAME_POS = {
  first: { left: "50%", top: "-55%" },
  second: { left: "17%", top: "-26%" },
  third: { left: "78%", top: "-17%" },
} as const;

const NAME_COLOR = {
  first: "text-amber-400",
  second: "text-slate-100",
  third: "text-orange-400",
} as const;

/* ============================================================
   Rank icon (left list)
============================================================ */

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-yellow-400 md:h-6 md:w-6"
      >
        <path
          fill="currentColor"
          d="M19 4h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H5a1 1 0 0 0-1 1v2a5 5 0 0 0 4 4.9V14a3 3 0 0 0-2 2.82V18h12v-1.18A3 3 0 0 0 16 14v-2.1A5 5 0 0 0 20 7V5a1 1 0 0 0-1-1Z"
        />
      </svg>
    );
  if (rank === 2)
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-300 md:h-6 md:w-6">
        <path
          fill="currentColor"
          d="M12 2 7 7l5 5 5-5-5-5Zm0 9a5 5 0 1 0 5 5a5 5 0 0 0-5-5Zm0 2a3 3 0 1 1-3 3a3 3 0 0 1 3-3Z"
        />
      </svg>
    );
  if (rank === 3)
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500 md:h-6 md:w-6">
        <path
          fill="currentColor"
          d="M12 2l2.39 4.84L20 7.27l-3.8 3.7.9 5.23L12 14.77l-4.1 2.15.9-5.23L5 7.27l5.61-.43L12 2Z"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60 md:h-5 md:w-5">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

/* ============================================================
   Leaderboard (main)
============================================================ */

export default function Leaderboard({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) {
  // Mocked dataset (backend will replace)
  const data = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        rank: i + 1,
        name: `Bc1djsa...........${450 - i}`,
        score: 8600 - i * 200,
      })),
    []
  );

  return (
    <div
      className="absolute inset-x-0 z-20 mx-6 md:mx-10 lg:mx-16 xl:mx-24"
      style={{ top: "clamp(120px, 12vh, 160px)" }}
    >
      {/* Title (fluid) */}
      <h2
        className="text-center font-extrabold tracking-wide drop-shadow"
        style={{
          fontSize: "clamp(18px, 2.2vw, 32px)",
          marginBottom: "clamp(14px, 1.2vw, 24px)",
        }}
      >
        THE FASTEST CATS IN THE COMMUNITY
      </h2>

      {/* Desktop-first grid (left list + right cards) */}
      <div
        className={`grid grid-cols-12 gap-[clamp(12px,1.2vw,20px)] ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* ================ Left column: Ranking list ================ */}
        <section className="col-span-12 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_36px_rgba(0,0,0,0.45)] lg:col-span-7">
          <div className="m-[clamp(10px,1vw,16px)] rounded-lg bg-black/55 ring-1 ring-white/10">
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-lg border-b border-white/15 px-[clamp(10px,1vw,16px)] py-[clamp(8px,0.8vw,12px)]">
              <h3
                className="font-extrabold"
                style={{ fontSize: "clamp(16px,1.6vw,20px)" }}
              >
                Full Rankings
              </h3>
              <div className="relative w-[min(26rem,40vw)]">
                <input
                  placeholder="Enter Wallet address..."
                  className="w-full rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/60 focus:border-white/50"
                />
                <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5" />
              </div>
            </div>

            {/* Scrollable list (height tied to viewport) */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "min(72vh, 900px)" }}
            >
              <ul>
                {data.map((row) => (
                  <li
                    key={row.rank}
                    className="grid grid-cols-12 items-center gap-2 border-b border-white/12 px-[clamp(10px,1vw,16px)] py-[clamp(8px,0.9vw,12px)] hover:bg-white/5"
                  >
                    {/* Rank icon */}
                    <div className="col-span-1 flex justify-center">
                      <RankIcon rank={row.rank} />
                    </div>

                    {/* Name + score (desktop) */}
                    <div className="col-span-7 min-w-0 md:col-span-8">
                      <div className="flex items-center gap-3">
                        <span
                          className="truncate font-extrabold tracking-wide"
                          style={{ fontSize: "clamp(14px,1.2vw,17px)" }}
                        >
                          {row.name}
                        </span>
                        <span
                          className="ml-auto hidden font-extrabold md:inline"
                          style={{ fontSize: "clamp(13px,1.1vw,16px)" }}
                        >
                          {row.score}
                        </span>
                      </div>
                      <div
                        className="text-white/80"
                        style={{ fontSize: "clamp(11px,1vw,14px)" }}
                      >
                        Rank #{row.rank}
                      </div>
                    </div>

                    {/* Score (mobile/tablet) */}
                    <div
                      className="col-span-4 text-right font-extrabold md:hidden"
                      style={{ fontSize: "clamp(13px,1.1vw,16px)" }}
                    >
                      {row.score}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================ Right column: 2 info cards ================ */}
        <aside className="col-span-12 flex h-full flex-col gap-[clamp(12px,1.2vw,20px)] lg:col-span-5">
          {/* Card: Your rank */}
          <div className="flex-1 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_36px_rgba(0,0,0,0.45)]">
            <div className="m-[clamp(10px,1vw,16px)] flex h-[calc(100%-clamp(20px,2vw,32px))] flex-col rounded-lg bg-black/55 p-[clamp(12px,1.2vw,20px)] ring-1 ring-white/10">
              <h4
                className="mb-[clamp(12px,1.2vw,20px)] font-extrabold drop-shadow"
                style={{ fontSize: "clamp(20px,2.2vw,32px)" }}
              >
                YOUR RANK: <span className="text-white">#79</span>
              </h4>

              {/* Two-column stats */}
              <div className="grid flex-1 grid-cols-2 gap-x-[clamp(16px,1.5vw,24px)] gap-y-[clamp(12px,1.2vw,20px)]">
                {[
                  ["TOTAL MILES RUN:", "8,685"],
                  ["CATS HOLD:", "4"],
                  ["AVERAGE SPEED:", "75 MPH"],
                  ["BOOST HOLD:", "4"],
                  ["YOUR FASTEST CAT:", "175 MPH"],
                  ["BOOST USED:", "3"],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div
                      className="underline underline-offset-4"
                      style={{
                        fontSize: "clamp(12px,1.2vw,18px)",
                        fontWeight: 800,
                      }}
                    >
                      {l}
                    </div>
                    <div
                      className="mt-1 text-white"
                      style={{
                        fontSize: "clamp(16px,1.8vw,24px)",
                        fontWeight: 800,
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Top 3 (podium) */}
          <div className="flex-1 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_36px_rgba(0,0,0,0.45)]">
            <div className="m-[clamp(10px,1vw,16px)] flex h-[calc(100%-clamp(20px,2vw,32px))] flex-col overflow-hidden rounded-lg bg-black/55 p-[clamp(12px,1.2vw,20px)] ring-1 ring-white/10">
              <h4
                className="mb-[clamp(8px,0.8vw,12px)] font-extrabold"
                style={{ fontSize: "clamp(16px,1.8vw,24px)" }}
              >
                TOP 3
              </h4>

              <div className="relative min-h-0 flex-1">
                {/* Podium aspect box anchored to bottom */}
                <div className="absolute bottom-[-18%] left-1/2 aspect-[1350/586] w-[96%] -translate-x-1/2">
                  <Image
                    src={PODIUM_BG}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 40vw, 90vw"
                    className="pointer-events-none select-none object-contain object-center"
                    priority
                  />

                  {/* Names */}
                  <NameAt
                    left={NAME_POS.second.left}
                    top={NAME_POS.second.top}
                    className={`${NAME_COLOR.second} -translate-x-1/2 whitespace-nowrap`}
                  >
                    {TOP3.second.name}
                  </NameAt>

                  <NameAt
                    left={NAME_POS.first.left}
                    top={NAME_POS.first.top}
                    className={`${NAME_COLOR.first} -translate-x-1/2 whitespace-nowrap`}
                  >
                    {TOP3.first.name}
                  </NameAt>

                  <NameAt
                    left={NAME_POS.third.left}
                    top={NAME_POS.third.top}
                    className={`${NAME_COLOR.third} -translate-x-[35%] whitespace-nowrap`}
                  >
                    {TOP3.third.name}
                  </NameAt>

                  {/* Avatars */}
                  <AvatarAt
                    left={AV_POS.second.left}
                    top={AV_POS.second.top}
                    size={AV_SIZE_SIDE}
                    src={TOP3.second.avatar}
                  />
                  <AvatarAt
                    left={AV_POS.first.left}
                    top={AV_POS.first.top}
                    size={AV_SIZE_MAIN}
                    src={TOP3.first.avatar}
                  />
                  <AvatarAt
                    left={AV_POS.third.left}
                    top={AV_POS.third.top}
                    size={AV_SIZE_SIDE}
                    src={TOP3.third.avatar}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Close button (optional) */}
      <button
        onClick={onClose}
        className="ml-auto mt-[clamp(12px,1.2vw,16px)] block rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
      >
        Close
      </button>
    </div>
  );
}

/* ============================================================
   Presentation helpers (absolute-positioned name/avatar)
============================================================ */

function NameAt({
  left,
  top,
  className = "",
  children,
}: {
  left: string;
  top: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute ${className}`} style={{ left, top }}>
      <div
        className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        style={{
          WebkitTextStroke: "1px rgba(0,0,0,.35)",
          fontWeight: 800,
          fontSize: "clamp(12px,1.4vw,20px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function AvatarAt({
  left,
  top,
  size,
  src,
}: {
  left: string;
  top: string;
  size: string;
  src: string;
}) {
  return (
    <div className="absolute -translate-x-1/2" style={{ left, top }}>
      <Image
        src={src}
        alt=""
        width={180}
        height={180}
        className="rounded-sm border-2 border-white/70 object-cover shadow-lg"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
