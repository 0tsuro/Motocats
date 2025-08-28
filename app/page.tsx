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

/* Shared nav link style */
const navLink =
  "relative cursor-pointer whitespace-nowrap transition-colors duration-200 bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-white hover:text-transparent";

/* Sections type */
type Section =
  | "none"
  | "leaderboard"
  | "garage"
  | "tune"
  | "calculator"
  | "rules";

export default function HomePage() {
  const [active, setActive] = useState<Section>("none");
  const [closing, setClosing] = useState(false);

  const isRulesOpen = active === "rules";

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

  const closeSection = () => {
    setClosing(true);
    setTimeout(() => {
      setActive("none");
      setClosing(false);
    }, 300);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* ===== Background GIF (under everything) ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.gif" // ton GIF dans /public
          alt=""
          fill
          priority
          unoptimized // garde l’animation active
          className="object-cover"
        />
      </div>

      {/* ===== Dark overlay (under navbar) ===== */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* ===== NAVBAR ===== */}
      <header
        className={`absolute inset-x-0 top-0 z-40 transition-[filter] duration-300 ${
          isRulesOpen
            ? "pointer-events-none blur-3xl] [filter:brightness(0.9)_opacity(0.1)]"
            : ""
        }`}
      >
        <div className="relative mx-10 mt-8 flex items-center justify-between px-5 py-3">
          {/* Left cluster */}
          <div className="relative flex min-w-0 items-center gap-[clamp(10px,1vw,20px)]">
            <Link
              href="/"
              className="flex items-center"
              onClick={(e) => e.preventDefault()}
            >
              <span
                className="whitespace-nowrap leading-none tracking-wide"
                style={{
                  fontSize: "clamp(26px,3vw,64px)",
                  color: "#B8AEC6",
                  WebkitTextStroke: "2px white",
                }}
              >
                motocats
              </span>
            </Link>

            <span className="h-[clamp(20px,2vw,34px)] w-[2px] bg-white/60" />

            <nav
              className="flex min-w-0 items-center whitespace-nowrap"
              style={{
                columnGap: "clamp(8px,0.9vw,28px)",
                fontSize: "clamp(12px,1.1vw,20px)",
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

          {/* Right cluster */}
          <div
            className="flex shrink-0 items-center"
            style={{ columnGap: "clamp(8px,0.8vw,18px)" }}
          >
            <a
              href="https://magiceden.io"
              target="_blank"
              rel="noreferrer"
              className="transition hover:bg-clip-text hover:text-transparent hover:from-pink-500 hover:to-fuchsia-600"
            >
              <Image
                src="/me.svg"
                alt="Magic Eden"
                width={34}
                height={34}
                className="select-none"
              />
            </a>

            <a
              href="https://twitter.com/motocats"
              target="_blank"
              rel="noreferrer"
              className="transition hover:bg-clip-text hover:text-transparent hover:from-pink-500 hover:to-fuchsia-600"
            >
              <Image
                src="/x.svg"
                alt="Twitter"
                width={26}
                height={26}
                className="select-none"
              />
            </a>

            <a
              href="https://discord.gg/motocats"
              target="_blank"
              rel="noreferrer"
              className="transition hover:bg-clip-text hover:text-transparent hover:from-pink-500 hover:to-fuchsia-600"
            >
              <Image
                src="/discord.svg"
                alt="Discord"
                width={34}
                height={34}
                className="select-none"
              />
            </a>

            <button
              className="ml-2 cursor-pointer hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-fuchsia-600"
              style={{
                paddingInline: "clamp(8px,0.8vw,18px)",
                paddingBlock: "clamp(5px,0.6vw,10px)",
                fontSize: "clamp(12px,1.05vw,24px)",
                fontWeight: 800,
              }}
            >
              CONNECT WALLET
            </button>
          </div>
        </div>
      </header>

      {/* Overlay under panels */}
      {active !== "none" && (
        <div
          className="absolute inset-0 z-20 bg-black/20"
          onClick={closeSection}
        />
      )}

      {/* Panels */}
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
            <div
              className={`fixed inset-0 z-[35] backdrop-blur-3xl bg-white/5 ${
                closing ? "animate-fadeOutDown" : "animate-fadeInUp"
              }`}
            />
            <div
              className={`fixed inset-0 z-[90] grid place-items-center ${
                closing ? "animate-fadeOutDown" : "animate-fadeInUp"
              }`}
            >
              <Rules onClose={closeSection} closing={closing} />
            </div>
          </>
        )}
      </div>

      {/* Help button */}
      {active === "none" && (
        <button
          className="absolute bottom-10 right-10 z-50 flex items-center justify-center rounded-full bg-white/20 shadow-lg hover:bg-white/40 border-white"
          style={{
            width: "clamp(44px,4vw,72px)",
            height: "clamp(44px,4vw,72px)",
            borderWidth: "clamp(2px,0.28vw,4px)",
          }}
        >
          <Image
            src="/help.png"
            alt=""
            width={44}
            height={44}
            className="select-none"
          />
        </button>
      )}

      {/* Radio player */}
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
          ]}
        />
      </div>
    </div>
  );
}
