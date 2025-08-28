"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Panels
import Leaderboard from "@/app/components/leaderboard";
import Garage from "@/app/components/garage";
import RadioPlayer from "@/app/components/RadioPlayer";
import Tune from "@/app/components/tune";
import Calculator from "@/app/components/Calculator";
import Rules from "@/app/components/Rules";

/* ---------------------------------------------
   Shared nav link style (kept as-is)
--------------------------------------------- */
const navLink =
  "relative cursor-pointer whitespace-nowrap transition-colors duration-200 bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-white hover:text-transparent";

/* ---------------------------------------------
   Page state types
--------------------------------------------- */
type Section =
  | "none"
  | "leaderboard"
  | "garage"
  | "tune"
  | "calculator"
  | "rules";

/* =============================================
   HomePage
   - Controls which panel is visible
   - Manages closing animation timing
   - Keeps the RadioPlayer mounted globally
============================================= */
export default function HomePage() {
  const [active, setActive] = useState<Section>("none");
  const [closing, setClosing] = useState(false);

  // Used to dim/blur the navbar while rules modal is open
  const isRulesOpen = active === "rules";

  /* Open a section with exit/enter timing aligned to CSS animation */
  const openSection = (section: Section) => {
    if (active === section) return;
    if (active !== "none") {
      setClosing(true);
      setTimeout(() => {
        setActive(section);
        setClosing(false);
      }, 300);
    } else {
      setActive(section);
    }
  };

  /* Close any section with a short outgoing animation */
  const closeSection = () => {
    setClosing(true);
    setTimeout(() => {
      setActive("none");
      setClosing(false);
    }, 300);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* ===== Background video (under everything) ===== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* ===== Dark overlay (under navbar) ===== */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* ===== NAVBAR (top-most UI layer) =====
           NOTE: we only change filter when rules are open; do not touch pointer-events for links outside rules */}
      <header
        className={`absolute inset-x-0 top-0 z-40 transition-[filter] duration-300 ${
          isRulesOpen
            ? "pointer-events-none blur-3xl] [filter:brightness(0.9)_opacity(0.1)]"
            : ""
        }`}
      >
        <div className="relative mx-12 mt-10 flex items-center justify-between px-6 py-4">
          {/* -- Left cluster: brand + nav -- */}
          <div className="relative flex min-w-0 items-center gap-[clamp(12px,1.2vw,24px)]">
            {/* Brand (disabled link to avoid route change) */}
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => e.preventDefault()}
            >
              <span
                className="whitespace-nowrap leading-none tracking-wide"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 72px)",
                  color: "#B8AEC6",
                  WebkitTextStroke: "2px white",
                  textTransform: "none",
                }}
              >
                motocats
              </span>
            </Link>

            <span className="h-[clamp(24px,2.5vw,40px)] w-[2px] bg-white/60" />

            {/* Main navigation */}
            <nav
              className="flex min-w-0 items-center whitespace-nowrap"
              style={{
                columnGap: "clamp(10px, 1.0vw, 40px)",
                fontSize: "clamp(13px, 1.25vw, 24px)",
                fontWeight: 800,
              }}
            >
              <button
                className={navLink}
                onClick={() => openSection("leaderboard")}
              >
                LEADERBOARD
              </button>
              <button className={navLink} onClick={() => openSection("garage")}>
                GARAGE
              </button>
              <button className={navLink} onClick={() => openSection("tune")}>
                TUNE
              </button>
              <button
                className={navLink}
                onClick={() => openSection("calculator")}
              >
                CALCULATOR
              </button>
              <button className={navLink} onClick={() => openSection("rules")}>
                RULES
              </button>
            </nav>
          </div>

          {/* -- Right cluster: social icons + connect -- */}
          <div
            className="flex shrink-0 items-center"
            style={{ columnGap: "clamp(8px, 0.9vw, 24px)" }}
          >
            {/* Magic Eden */}
            <a
              href="https://magiceden.io"
              target="_blank"
              rel="noreferrer"
              className="transition hover:bg-clip-text hover:text-transparent hover:from-pink-500 hover:to-fuchsia-600"
              aria-label="Magic Eden"
            >
              <Image
                src="/me.svg"
                width={40}
                height={40}
                alt="Magic Eden"
                className="select-none"
                style={{
                  width: "clamp(18px, 1.8vw, 40px)",
                  height: "clamp(18px, 1.8vw, 40px)",
                }}
              />
            </a>

            {/* Twitter/X */}
            <a
              href="https://twitter.com/motocats" // TODO(back): replace with real link
              target="_blank"
              rel="noreferrer"
              className="transition hover:bg-clip-text hover:text-transparent hover:from-pink-500 hover:to-fuchsia-600"
              aria-label="Twitter"
            >
              <Image
                src="/x.svg"
                width={30}
                height={30}
                alt="Twitter"
                className="select-none"
                style={{
                  width: "clamp(16px, 1.4vw, 30px)",
                  height: "clamp(16px, 1.4vw, 30px)",
                }}
              />
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/motocats" // TODO(back): replace with real link
              target="_blank"
              rel="noreferrer"
              className="transition hover:bg-clip-text hover:text-transparent hover:from-pink-500 hover:to-fuchsia-600"
              aria-label="Discord"
            >
              <Image
                src="/discord.svg"
                width={40}
                height={40}
                alt="Discord"
                className="select-none"
                style={{
                  width: "clamp(18px, 1.8vw, 40px)",
                  height: "clamp(18px, 1.8vw, 40px)",
                }}
              />
            </a>

            {/* Connect Wallet CTA */}
            <button
              className="ml-2 cursor-pointer hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-fuchsia-600"
              style={{
                paddingInline: "clamp(10px, 0.9vw, 20px)",
                paddingBlock: "clamp(6px, 0.7vw, 12px)",
                fontSize: "clamp(13px, 1.2vw, 28px)",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
              aria-label="Connect wallet"
            >
              <span className="hidden 2xl:inline">CONNECT WALLET</span>
              <span className="inline 2xl:hidden">CONNECT</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== Click-to-close overlay under panels ===== */}
      {active !== "none" && (
        <div
          className="absolute inset-0 z-20 bg-black/20"
          onClick={closeSection}
        />
      )}

      {/* ===== Panels container (above the overlay) ===== */}
      <div className="relative z-30">
        {active === "leaderboard" && (
          <Leaderboard closing={closing} onClose={closeSection} />
        )}

        {active === "garage" && (
          <Garage closing={closing} onClose={closeSection} />
        )}

        {active === "tune" && <Tune closing={closing} onClose={closeSection} />}

        {active === "calculator" && (
          <Calculator closing={closing} onClose={closeSection} />
        )}

        {active === "rules" && (
          <>
            {/* Background blur overlay behind the modal */}
            <div
              className={`fixed inset-0 z-[35] backdrop-blur-3xl bg-white/5 ${
                closing ? "animate-fadeOutDown" : "animate-fadeInUp"
              }`}
            />
            {/* Modal (Rules) on top */}
            <div
              className={`fixed inset-0 z-[90] grid place-items-center ${
                closing ? "animate-fadeOutDown" : "animate-fadeInUp"
              }`}
            >
              <Rules onClose={closeSection} closing={closing} />
            </div>
          </>
        )}

        {active === "none" && (
          <>{/* help button + radio player placeholder */}</>
        )}
      </div>

      {/* ===== HELP (only on home) ===== */}
      {active === "none" && (
        <>
          <button
            className="absolute bottom-10 right-10 z-50 flex items-center justify-center rounded-full bg-white/20 shadow-lg transition-colors duration-200 hover:bg-white/40 border-white"
            style={{
              width: "clamp(48px, 4.5vw, 80px)",
              height: "clamp(48px, 4.5vw, 80px)",
              borderWidth: "clamp(2px, 0.3vw, 4px)",
            }}
            title="Help"
          >
            <Image
              src="/help.png"
              width={50}
              height={50}
              alt=""
              className="select-none"
              style={{
                width: "clamp(24px, 2.2vw, 50px)",
                height: "clamp(24px, 2.2vw, 50px)",
              }}
            />
          </button>
        </>
      )}

      {/* ===== RADIO PLAYER (always mounted for audio continuity)
           UI is only visible on home via opacity toggle ===== */}
      <div
        className={`transition-opacity duration-200 ${
          active === "none" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <RadioPlayer
          key="radio"
          stations={[
            { name: "DNB Radio", url: "https://dnbradio.nl/dnbradio_main.mp3" },
            {
              name: "Drumbase.Space",
              url: "https://radio.drumbase.space/radio/8000/mobile.mp3",
            },
            { name: "USA Dance Radio", url: "https://stream.rcast.net/66781" },
            {
              name: "San Francisco's 70s HITS",
              url: "https://a1.asurahosting.com:10990/radio.mp3",
            },
            {
              name: "RNB Radio",
              url: "https://streaming.silvacast.com/RNBRADIO.mp3",
            },
            {
              name: "Capital FM",
              url: "https://media-ice.musicradio.com/CapitalMP3",
            },
            {
              name: "80s Alive",
              url: "https://stream.80sa.live/80s-alive.mp3",
            },
            {
              name: "Smooth",
              url: "https://media-ice.musicradio.com/SmoothUKMP3",
            },
            { name: "1 Mix EDM", url: "https://fr2.1mix.co.uk:8060/stream/6/" },
            {
              name: "Island FM",
              url: "https://n05a-eu.rcs.revma.com/epatpyebanzuv?rj-ttl=5&rj-tok=AAABlWR1RR4AwW-xxUgdXWhZpg",
            },
            {
              name: "Athens Party RNB",
              url: "https://ice.onestreaming.com/athenspartyrnb",
            },
            {
              name: "Hits Radio",
              url: "https://26343.live.streamtheworld.com/977_HITSAAC_SC?dist=onlineradiobox",
            },
            { name: "TalkSPORT", url: "https://radio.talksport.com/stream" },
            {
              name: "Original 106",
              url: "https://listen-nation.sharp-stream.com/original106.mp3",
            },
            { name: "StarboxRNB", url: "https://stream.rcast.net/280259" },
            { name: "Liquid DNB", url: "https://free.rcast.net/283432" },
            { name: "Bedlam DnB", url: "https://free.rcast.net/255460" },
          ]}
        />
      </div>
    </div>
  );
}
