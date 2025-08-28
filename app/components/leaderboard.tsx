"use client";

import Image from "next/image";
import { useMemo } from "react";

/* ================= Podium config (assets, names, sizes, positions) ================ */

const PODIUM_BG = "/pod.png";

const TOP3 = {
  first: { name: "@Mister Mustache", avatar: "/a1.png" },
  second: { name: "@Jolly Jumper", avatar: "/a2.png" },
  third: { name: "@Retard Master", avatar: "/a3.png" },
} as const;

// avatar sizes (slightly slimmer)
const AV_SIZE_MAIN = "clamp(100px, 8.2vw, 160px)";
const AV_SIZE_SIDE = "clamp(82px, 6.8vw, 135px)";

// positions unchanged
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

/* ================= Rank icon (left list) ================ */

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

/* ================= Leaderboard (main) ================ */

export default function Leaderboard({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) {
  // mocked dataset (backend will replace)
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
      className="absolute inset-x-0 z-20 mx-5 md:mx-8 lg:mx-14 xl:mx-20"
      style={{ top: "clamp(108px, 11vh, 148px)" }} // slightly less top offset
    >
      {/* title */}
      <h2
        className="text-center font-extrabold tracking-wide drop-shadow"
        style={{
          fontSize: "clamp(16px, 2vw, 28px)",
          marginBottom: "clamp(12px, 1vw, 20px)",
        }}
      >
        THE FASTEST CATS IN THE COMMUNITY
      </h2>

      {/* grid */}
      <div
        className={`grid grid-cols-12 gap-[clamp(10px,1vw,18px)] ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
      >
        {/* left list */}
        <section className="col-span-12 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_36px_rgba(0,0,0,0.45)] lg:col-span-7">
          <div className="m-[clamp(8px,0.9vw,14px)] rounded-lg bg-black/55 ring-1 ring-white/10">
            {/* header */}
            <div className="flex items-center justify-between rounded-t-lg border-b border-white/15 px-[clamp(10px,1vw,16px)] py-[clamp(6px,0.7vw,10px)]">
              <h3
                className="font-extrabold"
                style={{ fontSize: "clamp(15px,1.4vw,18px)" }}
              >
                Full Rankings
              </h3>
              <div className="relative w-[min(24rem,38vw)]">
                <input
                  placeholder="Enter Wallet address..."
                  className="w-full rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/60 focus:border-white/50"
                />
                <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5" />
              </div>
            </div>

            {/* list */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "min(70vh, 860px)" }}
            >
              <ul>
                {data.map((row) => (
                  <li
                    key={row.rank}
                    className="grid grid-cols-12 items-center gap-2 border-b border-white/12 px-[clamp(10px,1vw,16px)] py-[clamp(7px,0.8vw,10px)] hover:bg-white/5"
                  >
                    <div className="col-span-1 flex justify-center">
                      <RankIcon rank={row.rank} />
                    </div>

                    <div className="col-span-7 min-w-0 md:col-span-8">
                      <div className="flex items-center gap-3">
                        <span
                          className="truncate font-extrabold tracking-wide"
                          style={{ fontSize: "clamp(13px,1.1vw,16px)" }}
                        >
                          {row.name}
                        </span>
                        <span
                          className="ml-auto hidden font-extrabold md:inline"
                          style={{ fontSize: "clamp(12px,1vw,15px)" }}
                        >
                          {row.score}
                        </span>
                      </div>
                      <div
                        className="text-white/80"
                        style={{ fontSize: "clamp(10px,0.95vw,13px)" }}
                      >
                        Rank #{row.rank}
                      </div>
                    </div>

                    {/* score (mobile) */}
                    <div
                      className="col-span-4 text-right font-extrabold md:hidden"
                      style={{ fontSize: "clamp(12px,1vw,15px)" }}
                    >
                      {row.score}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* right cards */}
        <aside className="col-span-12 flex h-full flex-col gap-[clamp(10px,1vw,18px)] lg:col-span-5">
          {/* your rank */}
          <div className="flex-1 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_36px_rgba(0,0,0,0.45)]">
            <div className="m-[clamp(8px,0.9vw,14px)] flex h-[calc(100%-clamp(18px,1.8vw,28px))] flex-col rounded-lg bg-black/55 p-[clamp(10px,1vw,18px)] ring-1 ring-white/10">
              <h4
                className="mb-[clamp(10px,1vw,16px)] font-extrabold drop-shadow"
                style={{ fontSize: "clamp(18px,2vw,28px)" }}
              >
                YOUR RANK: <span className="text-white">#79</span>
              </h4>

              <div className="grid flex-1 grid-cols-2 gap-x-[clamp(14px,1.3vw,22px)] gap-y-[clamp(10px,1vw,16px)]">
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
                        fontSize: "clamp(11px,1.05vw,16px)",
                        fontWeight: 800,
                      }}
                    >
                      {l}
                    </div>
                    <div
                      className="mt-1 text-white"
                      style={{
                        fontSize: "clamp(15px,1.6vw,22px)",
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

          {/* top 3 */}
          <div className="flex-1 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_36px_rgba(0,0,0,0.45)]">
            <div className="m-[clamp(8px,0.9vw,14px)] flex h-[calc(100%-clamp(18px,1.8vw,28px))] flex-col overflow-hidden rounded-lg bg-black/55 p-[clamp(10px,1vw,18px)] ring-1 ring-white/10">
              <h4
                className="mb-[clamp(6px,0.7vw,10px)] font-extrabold"
                style={{ fontSize: "clamp(15px,1.6vw,22px)" }}
              >
                TOP 3
              </h4>

              <div className="relative min-h-0 flex-1">
                <div className="absolute bottom-[-18%] left-1/2 aspect-[1350/586] w-[95%] -translate-x-1/2">
                  <Image
                    src={PODIUM_BG}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 38vw, 88vw"
                    className="pointer-events-none select-none object-contain object-center"
                    priority
                  />

                  {/* names */}
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

                  {/* avatars */}
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

      {/* close */}
      <button
        onClick={onClose}
        className="ml-auto mt-[clamp(10px,1vw,14px)] block rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
      >
        Close
      </button>
    </div>
  );
}

/* ================= Presentation helpers ================ */

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
          fontSize: "clamp(11px,1.25vw,18px)",
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
