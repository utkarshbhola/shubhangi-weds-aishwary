"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const nameVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   Envelope component
───────────────────────────────────────────── */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 700);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 cursor-pointer select-none"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Envelope body */}
      <div className="relative w-72 h-48" style={{ perspective: "600px" }}>
        {/* Back panel */}
        <div
          className="absolute inset-0 rounded-lg shadow-2xl"
          style={{
            background:
              "linear-gradient(145deg, #f5e0b0 0%, #e8c87a 50%, #d4a843 100%)",
            border: "1.5px solid #c9922a",
          }}
        />

        {/* Envelope bottom triangle */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 rounded-b-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #eedda0 0%, #d4a843 100%)",
          }}
        />

        {/* Left fold */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 rounded-bl-lg"
          style={{
            background:
              "linear-gradient(135deg, #e8c87a 0%, #c9922a 100%)",
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}
        />

        {/* Right fold */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 rounded-br-lg"
          style={{
            background:
              "linear-gradient(225deg, #e8c87a 0%, #c9922a 100%)",
            clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
          }}
        />

        {/* Flap (top triangle) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-28 origin-top"
          animate={clicked ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(180deg, #c9922a 0%, #e8c87a 100%)",
            clipPath: "polygon(0 0, 50% 75%, 100% 0)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Wax seal */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 35%, #c0392b, #8b1a1a)",
            border: "2px solid #e8b84b",
            boxShadow: "0 2px 12px rgba(139,26,26,0.45)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={clicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: clicked ? 0.1 : 0 }}
        >
          <span
            style={{
              fontFamily: "var(--font-great-vibes)",
              color: "#f5e6cc",
              fontSize: 22,
              lineHeight: 1,
              marginTop: 2,
            }}
          >
            ✦
          </span>
        </motion.div>
      </div>

      {/* CTA text */}
      <motion.p
        className="text-center"
        animate={clicked ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 15,
          letterSpacing: "0.18em",
          color: "#6b3a1f",
          textTransform: "uppercase",
        }}
      >
        Tap to open your invitation
      </motion.p>

      {/* Animated chevron */}
      <motion.div
        animate={clicked ? { opacity: 0 } : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M1 1L10 10L19 1" stroke="#c9922a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Decorative divider
───────────────────────────────────────────── */
function GoldDivider() {
  return (
    <motion.div
      variants={dividerVariants}
      className="flex items-center justify-center gap-2 w-full"
    >
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #c9922a)" }} />
      <span style={{ color: "#c9922a", fontSize: 14 }}>✦</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #c9922a)" }} />
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
      style={{
        width: 360,
        height: 640,
        /* safety for very small screens */
        maxWidth: "100vw",
      }}
    >
      {/* ── Layer 1: Background frame (mandap / arch) ── */}
      <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
        <Image
          src="/frame.png"
          alt="Mandap frame"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* ── Warm tinted overlay for richness ── */}
      <div
        className="absolute inset-0 z-10 rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,240,210,0.18) 0%, rgba(139,26,26,0.06) 50%, rgba(253,240,210,0.22) 100%)",
        }}
      />

      {/* ── Layer 2: Top floral hanging decor ── */}
      <div
        className="absolute z-20 animate-float"
        style={{
          top: -28,
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

      {/* ── Layer 3: Bottom stage decor ── */}
      <div
        className="absolute z-20"
        style={{
          bottom: -28,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          height: 130,
        }}
      >
        <Image
          src="/bottom.png"
          alt="Stage bottom decor"
          fill
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
        />
      </div>

      {/* ── Layer 4: Centre content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute z-30 flex flex-col items-center justify-center text-center"
        style={{
          inset: 0,
          paddingTop: 90,
          paddingBottom: 90,
          paddingLeft: 28,
          paddingRight: 28,
        }}
      >
        {/* Glass blur card behind text */}
        <div
          className="absolute"
          style={{
            inset: "80px 24px",
            borderRadius: 16,
            background: "rgba(253, 246, 230, 0.52)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(201,146,42,0.22)",
            boxShadow: "0 4px 32px rgba(139,26,26,0.08)",
          }}
        />

        {/* Content sits above glass */}
        <div className="relative flex flex-col items-center gap-3 w-full">
          {/* Small ornament top */}
          <motion.div variants={itemVariants}>
            <span style={{ color: "#c9922a", fontSize: 20, letterSpacing: "0.3em" }}>
              ✦ ✦ ✦
            </span>
          </motion.div>

          {/* "Save the Date" */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "#8b1a1a",
              textTransform: "uppercase",
            }}
          >
            Save the Date
          </motion.p>

          <GoldDivider />

          {/* Groom name */}
          <motion.h2
            variants={nameVariants}
            style={{
              fontFamily: "var(--font-great-vibes)",
              fontSize: 52,
              color: "#3a1f0d",
              lineHeight: 1.1,
            }}
          >
            Aishwarya
          </motion.h2>

          {/* "&" connector */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 w-full"
          >
            <div className="h-px flex-1" style={{ background: "rgba(201,146,42,0.4)" }} />
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 18,
                color: "#c9922a",
                fontWeight: 400,
              }}
            >
              &amp;
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(201,146,42,0.4)" }} />
          </motion.div>

          {/* Bride name */}
          <motion.h2
            variants={nameVariants}
            style={{
              fontFamily: "var(--font-great-vibes)",
              fontSize: 52,
              color: "#3a1f0d",
              lineHeight: 1.1,
            }}
          >
            Shubhangi
          </motion.h2>

          <GoldDivider />

          {/* Date & time */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 mt-1">
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 17,
                fontWeight: 600,
                color: "#8b1a1a",
                letterSpacing: "0.04em",
              }}
            >
              27th June 2026
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: 14,
                color: "#6b3a1f",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              8:00 PM onwards
            </p>
          </motion.div>

          {/* Venue */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-0.5">
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 15,
                fontWeight: 500,
                color: "#3a1f0d",
                letterSpacing: "0.04em",
              }}
            >
              Veone
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 13,
                color: "#6b3a1f",
                letterSpacing: "0.08em",
              }}
            >
              Near Akshardham, New Delhi
            </p>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div variants={itemVariants} className="mt-1">
            <span style={{ color: "#c9922a", fontSize: 16, letterSpacing: "0.4em" }}>
              ✦ ✦ ✦
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse at 60% 20%, #fdf0d2 0%, #f5e6cc 40%, #ecd4a8 100%)",
      }}
    >
      {/* Subtle noise/texture overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Decorative corner motifs */}
      <div className="fixed top-4 left-4 text-2xl pointer-events-none" style={{ color: "#c9922a", opacity: 0.35 }}>❧</div>
      <div className="fixed top-4 right-4 text-2xl pointer-events-none" style={{ color: "#c9922a", opacity: 0.35, transform: "scaleX(-1)" }}>❧</div>
      <div className="fixed bottom-4 left-4 text-2xl pointer-events-none" style={{ color: "#c9922a", opacity: 0.35, transform: "scaleY(-1)" }}>❧</div>
      <div className="fixed bottom-4 right-4 text-2xl pointer-events-none" style={{ color: "#c9922a", opacity: 0.35, transform: "scale(-1,-1)" }}>❧</div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Envelope onOpen={() => setOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <InvitationCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
