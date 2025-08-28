"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Station = { name: string; url: string };

type Props = {
  stations: Station[];
  controlsVisible?: boolean; // (reserved) show/hide controls if needed later
  /** Offset from bottom in px (in case a footer might overlap). */
  bottomOffset?: number;
};

export default function RadioPlayer({ stations, bottomOffset = 24 }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.6);

  const current = stations[index];
  const src = useMemo(() => current?.url ?? "", [current]);

  /** Load & autostart when station changes */
  useEffect(() => {
    if (!audioRef.current || !src) return;
    const a = audioRef.current;

    setLoading(true);
    setError(null);

    a.pause();
    a.src = src;
    a.volume = volume;

    a.play()
      .then(() => {
        setPlaying(true);
        setLoading(false);
      })
      .catch(() => {
        setPlaying(false);
        setLoading(false);
        setError("Can't play stream");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  /** Keep DOM audio volume in sync with state */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;

    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      setError(null);
      a.play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
        })
        .catch(() => {
          setPlaying(false);
          setLoading(false);
          setError("Can't play stream");
        });
    }
  };

  const prev = () =>
    setIndex((i) => (i - 1 + stations.length) % stations.length);
  const next = () => setIndex((i) => (i + 1) % stations.length);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const i = stations.findIndex((s) => s.url === e.target.value);
    if (i >= 0) setIndex(i);
  };

  const onToggleMute = () => setVolume((v) => (v === 0 ? 0.6 : 0));

  /* ---------- Inline SVG icons (no external deps) ---------- */
  const Icon = ({
    d,
    size = 22,
    className = "",
  }: {
    d: string;
    size?: number;
    className?: string;
  }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path fill="currentColor" d={d} />
    </svg>
  );

  const iPrev =
    "M14 18v-2H8.91l2.8 2.8-1.41 1.4L5.1 15l5.2-5.2 1.41 1.41L8.91 14H14v-2h2v6h-2Z";
  const iNext =
    "M10 18v-2h5.09l-2.8 2.8 1.41 1.4L19.9 15l-6.2-6.2-1.41 1.41L15.09 14H10v-2h-2v6h2Z";
  const iPlay = "M8 5v14l11-7L8 5Z";
  const iPause = "M7 5h4v14H7V5Zm6 0h4v14h-4V5Z";
  const iVol =
    "M5 15V9h3l4-4v14l-4-4H5Zm11.54-7.46 1.41 1.41A5 5 0 0 1 18 12a5 5 0 0 1-.05.73l-1.41-1.41A3 3 0 0 0 16 12a3 3 0 0 0 .46-1.54ZM14.5 7.5l1.41 1.41A6 6 0 0 1 16 12a6 6 0 0 1-.09 1.09L14.5 11.5A4 4 0 0 0 14.5 7.5Z";
  const iMute =
    "M3 9v6h3l4 4V5L6 9H3Zm16.59 6L17 12.41 13.41 9 12 10.41 14.59 13 12 15.59 13.41 17 16 14.41 18.59 17 20 15.59Z";
  const iChevron =
    "M8.12 9.29 12 13.17l3.88-3.88L17.3 10.7 12 16l-5.3-5.3 1.42-1.41Z";

  /* ---------- UI ---------- */
  return (
    <div
      className="radio_fixed pointer-events-none"
      style={{
        position: "fixed",
        left: "24px",
        right: "auto",
        bottom: `${bottomOffset}px`,
        zIndex: 20, // below navbar (navbar is z-40)
        transition: "bottom .25s ease",
      }}
    >
      <div
        className="
          pointer-events-auto flex items-center gap-5
          rounded-[20px] border border-white/10
          bg-black/60 px-5 py-3
          shadow-[0_8px_24px_rgba(0,0,0,.4)]
          backdrop-blur-md
        "
        style={{ minWidth: 420, maxWidth: 560 }}
      >
        {/* --- Transport & volume controls --- */}
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={prev}
            title="Previous station"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"
          >
            <Icon d={iPrev} />
          </button>

          <button
            onClick={togglePlay}
            title={playing ? "Pause" : "Play"}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"
          >
            {loading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : error ? (
              // tiny "X" fallback
              <span className="block h-5 w-5 rotate-45 before:block before:h-[2px] before:w-full before:bg-white after:block after:h-full after:w-[2px] after:bg-white" />
            ) : playing ? (
              <Icon d={iPause} />
            ) : (
              <Icon d={iPlay} />
            )}
          </button>

          <button
            onClick={next}
            title="Next station"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"
          >
            <Icon d={iNext} />
          </button>

          {/* Volume */}
          <div className="ml-2 flex items-center gap-3">
            <button
              onClick={onToggleMute}
              title={volume === 0 ? "Unmute" : "Mute"}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"
            >
              <Icon d={volume === 0 ? iMute : iVol} />
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-[4px] w-[120px] accent-white"
            />
          </div>
        </div>

        {/* --- Station title + native <select> overlay --- */}
        <div className="ml-2 flex items-center gap-2 text-white">
          <div className="text-lg font-extrabold tracking-wide">
            {current?.name ?? "—"}
          </div>

          <div className="relative">
            <Icon d={iChevron} className="pointer-events-none" />
            <select
              onChange={onSelect}
              value={current?.url}
              aria-label="Choose station"
              title="Choose station"
              className="absolute inset-0 w-6 cursor-pointer opacity-0"
            >
              {stations.map((s) => (
                <option key={s.url} value={s.url}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Hidden audio element --- */}
        <audio
          ref={audioRef}
          onError={() => {
            setPlaying(false);
            setLoading(false);
            setError("Can't play stream");
          }}
        />
      </div>
    </div>
  );
}
