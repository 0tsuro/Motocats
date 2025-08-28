"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { NativeSpeed } from "./NativeSpeed";

/* ============================================================
   Types & dummy data (backend can replace DUMMY later)
============================================================ */
export type MotoCard = {
  id: number;
  title: string; // "#1245"
  img: string; // "/cards/1245.png"
  mph: number; // e.g., 520
  flames: 1 | 2 | 3 | 4; // 1..4
  rank: number; // e.g., 3
};

const DUMMY: MotoCard[] = Array.from({ length: 44 }).map((_, i) => ({
  id: i + 1000,
  title: `#${1245 + i}`,
  img: "/a2.png",
  mph: 520 - (i % 10) * 10,
  flames: ((i % 4) + 1) as 1 | 2 | 3 | 4,
  rank: 3,
}));

// Example override for visual variety
DUMMY[7] = { ...DUMMY[7], img: "/motocats1.svg", mph: 290, flames: 2 };

/* ============================================================
   Small UI helpers
============================================================ */

// MPH badge centered (uses /mph.svg)
function MphBadge({ mph }: { mph: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image
        src="/mph.svg"
        alt=""
        width={20}
        height={20}
        className="shrink-0"
      />
      <span
        className="whitespace-nowrap font-extrabold"
        style={{ fontSize: "clamp(12px,1vw,16px)" }}
      >
        {mph} MP/H
      </span>
    </div>
  );
}

// Flames for gallery (simple, no circles)
function FlamesSimple({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Image
          key={idx}
          src={idx < count ? "/flame.svg" : "/flame2.svg"}
          alt=""
          width={10}
          height={10}
          className="select-none"
        />
      ))}
    </div>
  );
}

// Flames for detail view (with dashed circles)
function FlamesDetail({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/70"
        >
          <Image
            src={idx < count ? "/flame.svg" : "/flame2.svg"}
            alt=""
            width={20}
            height={20}
            className="select-none"
          />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Cards (grid gallery)
============================================================ */

function GalleryCard({
  c,
  onClick,
}: {
  c: MotoCard;
  onClick: (c: MotoCard) => void;
}) {
  return (
    <button
      onClick={() => onClick(c)}
      className="group cursor-pointer rounded-xl border border-white/20 bg-black/35 p-2 ring-1 ring-white/10 transition hover:bg-black/45"
    >
      {/* MPH badge */}
      <div className="mb-2 flex items-center justify-center">
        <MphBadge mph={c.mph} />
      </div>

      {/* Image + rank (overlay) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
        <Image
          src={c.img}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width:1024px) 10vw, 40vw"
        />
        <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-extrabold">
          #{c.rank}
        </div>
      </div>

      {/* Flames at bottom */}
      <div className="mt-2 flex justify-center">
        <FlamesSimple count={c.flames} />
      </div>
    </button>
  );
}

/* ============================================================
   Mini cards (right sidebar)
============================================================ */

function MiniCard({
  c,
  onClick,
}: {
  c: MotoCard;
  onClick: (c: MotoCard) => void;
}) {
  return (
    <button
      onClick={() => onClick(c)}
      className="cursor-pointer rounded-lg border border-white/15 bg-black/35 p-2 ring-1 ring-white/10 transition hover:bg-black/45"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
        <Image src={c.img} alt="" fill className="object-cover" />
        <div className="absolute left-1.5 top-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-extrabold">
          #{c.rank}
        </div>
      </div>
      <div className="mt-1 flex items-center justify-center">
        <MphBadge mph={c.mph} />
      </div>
    </button>
  );
}

/* ============================================================
   Detail view (compact, animated)
============================================================ */

function DetailView({
  selected,
  all,
  onBack,
  onPick,
  closing,
}: {
  selected: MotoCard;
  all: MotoCard[];
  onBack: () => void;
  onPick: (c: MotoCard) => void;
  closing?: boolean;
}) {
  // All other cards (no slice → full scrollable list at right)
  const others = useMemo(
    () => all.filter((x) => x.id !== selected.id),
    [all, selected.id]
  );

  return (
    <div
      className="absolute inset-x-0 mx-6 md:mx-10 lg:mx-16 xl:mx-24"
      style={{ top: "clamp(120px,12vh,160px)" }}
    >
      <div className="grid grid-cols-12 gap-4 lg:gap-5">
        {/* Glass panel (animated) */}
        <div className="col-span-12 lg:col-span-10">
          <div
            className={`rounded-2xl border border-white/20 bg-black/25 p-4 ring-1 ring-white/10 lg:p-5 ${
              closing ? "animate-fadeOutDown" : "animate-fadeInUp"
            }`}
          >
            <div className="grid grid-cols-12 gap-4 lg:gap-5">
              {/* LEFT: image + boosts */}
              <section className="col-span-12 lg:col-span-4">
                {/* Title */}
                <div
                  className="mb-2 text-center font-extrabold"
                  style={{ fontSize: "clamp(28px,3vw,52px)" }}
                >
                  {selected.title}
                </div>

                {/* Main image */}
                <div
                  className="relative w-full overflow-hidden rounded-xl border border-white/15 bg-black/40 ring-1 ring-white/10"
                  style={{ height: "clamp(300px,44vh,480px)" }}
                >
                  <Image
                    src={selected.img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Boosts + buttons */}
                <div className="mt-3 flex w/full flex-col items-center justify-center">
                  <div className="flex flex-col items-center gap-3 p-4">
                    <span className="text-xl font-bold">Boost Slots</span>
                    <span className="p-2">
                      <FlamesDetail count={selected.flames} />
                    </span>
                  </div>

                  <div className="mt-4 grid w-full grid-cols-2 gap-3">
                    <button className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 py-2 text-sm font-extrabold text-white shadow-lg transition hover:opacity-90">
                      BUY BOOST
                    </button>
                    <button className="w-full cursor-pointer rounded-lg border border-white bg-black/30 py-2 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-black/50">
                      APPLY BOOST (1)
                    </button>
                  </div>
                </div>
              </section>

              {/* RIGHT: performance + attributes */}
              <section className="col-span-12 lg:col-span-8">
                <h3
                  className="mb-3 text-center font-extrabold tracking-wide"
                  style={{ fontSize: "clamp(22px,3vw,50px)" }}
                >
                  PERFORMANCE STATS
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <NativeSpeed
                    title="NATIVE SPEED"
                    value={85}
                    min={0}
                    max={200}
                    units="MP/H"
                  />

                  <div className="flex flex-col items-center justify-center rounded-xl border border-white/90 bg-white/50 p-4 ring-1 ring-white/10">
                    <div className="mb-1 text-xl font-extrabold">
                      CURRENT SPEED
                    </div>
                    <div className="flex h-[140px] items-center justify-center">
                      <div className="text-4xl font-extrabold leading-none">
                        {selected.mph}
                      </div>
                    </div>
                    <div className="mt-1 text-lg">MP/H</div>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-white/90 bg-white/50 p-4 ring-1 ring-white/10">
                    <div className="mb-1 text-xl font-extrabold">
                      MILES TRAVELED
                    </div>
                    <div className="flex h-[140px] items-center justify-center">
                      <div className="text-4xl font-extrabold leading-none">
                        12 450
                      </div>
                    </div>
                    <div className="mt-1 text-lg">MILES</div>
                  </div>
                </div>

                <h4
                  className="mt-4 mb-2 text-center font-extrabold tracking-wide"
                  style={{ fontSize: "clamp(18px,2.2vw,28px)" }}
                >
                  ATTRIBUTES
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["ACCESSORY", "MOTOSWAP NECKLESS", "+5 MP/H"],
                    ["BIKE", "GOLD BIKE", "+80 MP/H"],
                    ["ACCESSORY", "OP_NET BUTTON", "+2 MP/H"],
                    ["SHIRT", "—", "—"],
                    ["HAT", "OP_NET CAP", "+2 MP/H"],
                    ["GLASSES", "GOLD MOTO GLASSES", "+5 MP/H"],
                  ].map(([k, v, b]) => (
                    <div
                      key={k + v}
                      className="rounded-xl border border-white/90 bg-white/50 p-4 ring-1 ring-white/10"
                    >
                      <div className="text-[14px] font-extrabold text-white/90">
                        {k}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="text-base font-extrabold text-white">
                          {v}
                        </div>
                        <div className="text-sm font-extrabold text-emerald-400">
                          {b}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Right column: scrollable mini-gallery */}
        <aside className="col-span-12 lg:col-span-2">
          <button
            onClick={onBack}
            className="mb-3 w-full cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-extrabold transition hover:bg-white/20"
          >
            BACK TO GALLERY
          </button>

          <div
            className="grid grid-cols-2 gap-3 pr-1"
            style={{ maxHeight: "78vh", overflowY: "auto" }}
          >
            {others.map((c) => (
              <MiniCard key={c.id} c={c} onClick={onPick} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================================================
   Grid view (animated + scrollable)
============================================================ */

function GridView({
  items,
  onPick,
  closing,
}: {
  items: MotoCard[];
  onPick: (c: MotoCard) => void;
  closing?: boolean;
}) {
  const TOP = "clamp(120px,12vh,160px)";
  const BOTTOM_PX = 24;

  return (
    <div className="absolute inset-x-0 z-20" style={{ top: TOP }}>
      <div
        className={`overflow-y-auto pr-1 ${
          closing ? "animate-fadeOutDown" : "animate-fadeInUp"
        }`}
        style={{ height: `calc(100vh - ${TOP} - ${BOTTOM_PX}px)` }}
      >
        <h2
          className="mb-4 text-center font-extrabold tracking-wide drop-shadow"
          style={{ fontSize: "clamp(18px,2.2vw,28px)" }}
        >
          YOU HAVE {items.length} MOTOCATS IN THE GARAGE
        </h2>

        <div className="rounded-2xl border border-white/20 bg-black/25 p-4 ring-1 ring-white/10">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
          >
            {items.map((c) => (
              <GalleryCard key={c.id} c={c} onClick={onPick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Garage (switch between grid / detail)
============================================================ */

export default function Garage({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) {
  const [items] = useState<MotoCard[]>(DUMMY);
  const [selected, setSelected] = useState<MotoCard | null>(null);

  if (selected) {
    return (
      <DetailView
        selected={selected}
        all={items}
        onBack={() => setSelected(null)}
        onPick={setSelected}
        closing={closing}
      />
    );
  }

  return <GridView items={items} onPick={setSelected} closing={closing} />;
}
