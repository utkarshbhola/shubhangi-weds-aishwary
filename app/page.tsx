"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Colour tokens  (ivory · gold · red · beige)
───────────────────────────────────────────── */
const C = {
  ivory:     "#FFFFF0",
  ivoryWarm: "#FDF6E3",
  beige:     "#F2E0C8",
  beigeDeep: "#E8C99A",
  gold:      "#B8860B",
  goldLight: "#D4AF37",
  goldPale:  "#F0D080",
  red:       "#8B1A1A",
  redDeep:   "#6B0F0F",
  redMuted:  "#A0402A",
  textDark:  "#3A1A05",
  textMid:   "#6B3A1F",
};

/* ─────────────────────────────────────────────
   Framer-Motion variants
───────────────────────────────────────────── */
const cardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.88, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.17, delayChildren: 0.45 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const nameVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.80 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const dividerVariants: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─────────────────────────────────────────────
   Ganesha SVG icon  (line-art, gold tones)
───────────────────────────────────────────── */
function GaneshaIcon({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Trunk curling right */}
      <path
        d="M50 62 Q38 74 36 84 Q34 94 44 96 Q52 97 54 90"
        stroke={C.goldLight} strokeWidth="2.8" strokeLinecap="round" fill="none"
      />
      {/* Head */}
      <circle cx="50" cy="46" r="22" stroke={C.goldLight} strokeWidth="2.8" fill="none" />
      {/* Left ear */}
      <ellipse cx="24" cy="44" rx="8" ry="12" stroke={C.goldLight} strokeWidth="2.2" fill="none" />
      {/* Right ear */}
      <ellipse cx="76" cy="44" rx="8" ry="12" stroke={C.goldLight} strokeWidth="2.2" fill="none" />
      {/* Left tusk */}
      <path d="M32 60 Q22 72 26 80" stroke={C.goldLight} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Right tusk (broken) */}
      <path d="M68 60 Q76 68 72 74" stroke={C.goldLight} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <circle cx="42" cy="44" r="2.5" fill={C.goldLight} />
      <circle cx="58" cy="44" r="2.5" fill={C.goldLight} />
      {/* Third eye */}
      <circle cx="50" cy="38" r="1.5" fill={C.red} />
      {/* Crown */}
      <path
        d="M34 28 Q40 14 50 10 Q60 14 66 28"
        stroke={C.goldLight} strokeWidth="2.4" strokeLinecap="round" fill="none"
      />
      <circle cx="50" cy="10" r="3" fill={C.goldLight} />
      <circle cx="35" cy="27" r="2" fill={C.goldLight} />
      <circle cx="65" cy="27" r="2" fill={C.goldLight} />
      {/* Body */}
      <path
        d="M30 68 Q28 86 50 90 Q72 86 70 68"
        stroke={C.goldLight} strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      {/* Necklace */}
      <path
        d="M36 66 Q50 72 64 66"
        stroke={C.goldPale} strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
      {/* Arms */}
      <path d="M29 72 Q22 76 24 82" stroke={C.goldLight} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M71 72 Q78 76 76 82" stroke={C.goldLight} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="84" r="3" stroke={C.goldLight} strokeWidth="1.8" fill="none" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Gold divider
───────────────────────────────────────────── */
function GoldDivider() {
  return (
    <motion.div
      variants={dividerVariants}
      className="flex items-center justify-center gap-2 w-full"
    >
      <div className="h-px flex-1"
        style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
      <span style={{ color: C.goldLight, fontSize: 13 }}>✦</span>
      <div className="h-px flex-1"
        style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Envelope  — no red dot; ivory / gold / red palette
───────────────────────────────────────────── */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 750);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 cursor-pointer select-none"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative w-72 h-48" style={{ perspective: "700px" }}>

        {/* Back panel — ivory gradient */}
        <div
          className="absolute inset-0 rounded-xl shadow-2xl"
          style={{
            background: `linear-gradient(150deg, ${C.ivory} 0%, ${C.beige} 60%, ${C.beigeDeep} 100%)`,
            border: `1.5px solid ${C.goldLight}`,
            boxShadow: `0 8px 32px rgba(184,134,11,0.22), 0 2px 8px rgba(139,26,26,0.12)`,
          }}
        />

        {/* Bottom fold */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 rounded-b-xl"
          style={{
            background: `linear-gradient(170deg, ${C.ivoryWarm} 0%, ${C.beigeDeep} 100%)`,
            clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
          }}
        />

        {/* Left fold */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 rounded-bl-xl"
          style={{
            background: `linear-gradient(135deg, ${C.beige} 0%, ${C.beigeDeep} 100%)`,
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        />

        {/* Right fold */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 rounded-br-xl"
          style={{
            background: `linear-gradient(225deg, ${C.beige} 0%, ${C.beigeDeep} 100%)`,
            clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
          }}
        />

        {/* Flap — deep red */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-28"
          animate={clicked ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(175deg, ${C.redDeep} 0%, ${C.red} 60%, ${C.redMuted} 100%)`,
            clipPath: "polygon(0 0, 50% 78%, 100% 0)",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Gold trim on flap edge */}
        <motion.div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          animate={clicked ? { opacity: 0 } : { opacity: 1 }}
        >
          <svg width="100%" height="80" viewBox="0 0 288 80" preserveAspectRatio="none">
            <polyline
              points="0,0 144,62 288,0"
              fill="none"
              stroke={C.goldLight}
              strokeWidth="1.4"
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Gold OM seal (no red dot) */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: `radial-gradient(circle at 38% 35%, ${C.goldPale}, ${C.gold})`,
            border: `2px solid ${C.ivory}`,
            boxShadow: `0 2px 16px rgba(184,134,11,0.5)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={clicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: clicked ? 0.08 : 0 }}
        >
          <span
            style={{
              fontSize: 24,
              lineHeight: 1,
              color: C.redDeep,
              fontWeight: 700,
              fontFamily: "serif",
              marginTop: 2,
            }}
          >
            ॐ
          </span>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.p
        animate={clicked ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 14,
          letterSpacing: "0.2em",
          color: C.textMid,
          textTransform: "uppercase",
        }}
      >
        Tap to open your invitation
      </motion.p>

      <motion.div
        animate={clicked ? { opacity: 0 } : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M1 1L10 10L19 1" stroke={C.gold} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Invitation Card
───────────────────────────────────────────── */
function InvitationCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto"
      style={{ width: 360, height: 640, maxWidth: "100vw" }}
    >
      {/* Layer 1 — mandap frame */}
      <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
        <Image
          src="/frame.png"
          alt="Mandap frame"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* Warm tint overlay */}
      <div
        className="absolute inset-0 z-10 rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg,rgba(255,255,240,0.14) 0%,rgba(139,26,26,0.04) 50%,rgba(255,255,240,0.18) 100%)",
        }}
      />

      {/* Layer 2 — top floral (floating, overlaps from top) */}
      <div
        className="absolute z-20 animate-float"
        style={{
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 130,
        }}
      >
        <Image
          src="/top.png"
          alt="Floral top decor"
          fill
          style={{ objectFit: "contain", objectPosition: "top center" }}
          priority
        />
      </div>

      {/* Layer 3 — centre text */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute z-30 flex flex-col items-center justify-center text-center"
        style={{
          inset: 0,
          paddingTop: 88,
          paddingBottom: 44,
          paddingLeft: 28,
          paddingRight: 28,
        }}
      >
        {/* Glass panel */}
        <div
          className="absolute"
          style={{
            inset: "76px 20px 36px",
            borderRadius: 18,
            background: "rgba(255,253,240,0.60)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            border: `1px solid rgba(212,175,55,0.30)`,
            boxShadow: "0 6px 36px rgba(139,26,26,0.08)",
          }}
        />

        <div className="relative flex flex-col items-center gap-3 w-full">

          {/* Ganesha */}
          <motion.div variants={itemVariants} className="mb-0">
            <GaneshaIcon size={70} />
          </motion.div>

          {/* Shubh Vivah */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: 12,
              letterSpacing: "0.3em",
              color: C.red,
              textTransform: "uppercase",
            }}
          >
            Shubh Vivah
          </motion.p>

          {/* Save the Date */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 10,
              letterSpacing: "0.26em",
              color: C.gold,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Save the Date
          </motion.p>

          <GoldDivider />

          {/* Shubhangi — S capital in Great Vibes naturally */}
          <motion.h2
            variants={nameVariants}
            style={{
              fontFamily: "var(--font-allura)",
              fontSize: 50,
              color: C.textDark,
              lineHeight: 1.05,
            }}
          >
            Shubhangi
          </motion.h2>

          {/* weds */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 w-full">
            <div className="h-px flex-1"
              style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 17,
                color: C.red,
                fontWeight: 400,
                letterSpacing: "0.06em",
              }}
            >
              weds
            </span>
            <div className="h-px flex-1"
              style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
          </motion.div>

          {/* Aishwarya — A capital in Great Vibes naturally */}
          <motion.h2
            variants={nameVariants}
            style={{
              fontFamily: "var(--font-allura)",
              fontSize: 50,
              color: C.textDark,
              lineHeight: 1.05,
            }}
          >
            Aishwarya
          </motion.h2>

          <GoldDivider />

          {/* Date & time */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 mt-1">
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 17,
                fontWeight: 600,
                color: C.red,
                letterSpacing: "0.04em",
              }}
            >
              27th June 2026
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: 13,
                color: C.textMid,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              8:00 PM onwards
            </p>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div variants={itemVariants} className="mt-2">
            <span style={{ color: C.goldLight, fontSize: 15, letterSpacing: "0.4em" }}>
              ✦ ✦ ✦
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Music hook — auto-plays /wedding-music.mp3
───────────────────────────────────────────── */
function useMusicOnOpen(opened: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/wedding-music.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (opened && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser — user can tap the music button
      });
    }
  }, [opened]);

  return audioRef;
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Page() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useMusicOnOpen(opened);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setMuted(false);
    } else {
      audioRef.current.pause();
      setMuted(true);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{
        background: `radial-gradient(ellipse at 58% 18%, ${C.ivory} 0%, ${C.ivoryWarm} 28%, ${C.beige} 62%, ${C.beigeDeep} 100%)`,
      }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.55,
          zIndex: 0,
        }}
      />

      {/* Corner ornaments */}
      <div className="fixed top-4 left-4 text-2xl pointer-events-none" style={{ color: C.gold, opacity: 0.3 }}>❧</div>
      <div className="fixed top-4 right-4 text-2xl pointer-events-none" style={{ color: C.gold, opacity: 0.3, transform: "scaleX(-1)" }}>❧</div>
      <div className="fixed bottom-4 left-4 text-2xl pointer-events-none" style={{ color: C.gold, opacity: 0.3, transform: "scaleY(-1)" }}>❧</div>
      <div className="fixed bottom-4 right-4 text-2xl pointer-events-none" style={{ color: C.gold, opacity: 0.3, transform: "scale(-1,-1)" }}>❧</div>

      {/* Music toggle — appears after opening */}
      <AnimatePresence>
        {opened && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            onClick={toggleMusic}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer"
            style={{
              background: "rgba(255,253,240,0.80)",
              border: `1px solid ${C.goldLight}`,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: C.textMid,
              fontFamily: "var(--font-cormorant)",
              textTransform: "uppercase",
              boxShadow: "0 2px 12px rgba(184,134,11,0.18)",
            }}
          >
            <span style={{ fontSize: 14 }}>{muted ? "♪" : "♫"}</span>
            <span>{muted ? "Unmute" : "Mute"}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main scene */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: -24 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Envelope onOpen={() => setOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <InvitationCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
