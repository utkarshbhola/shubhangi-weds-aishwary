"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* ─────────────────────────────────────────────
   Palette — ivory · warm cream · gold · dark text
   (no coral, no red except Ganesh bindi)
───────────────────────────────────────────── */
const C = {
  card:       "#FAF6EE",          // ivory card background
  cardEdge:   "#F0E8D8",
  gold:       "#A07830",          // reference gold text
  goldLight:  "#C8A84B",
  goldPale:   "#E8D098",
  textDark:   "#1A1A1A",          // near-black for names
  textMid:    "#3A3020",
  textGrey:   "#5A4E3A",
  sage:       "#7A9A6A",          // botanical greens
  sageDark:   "#4A6A3A",
  blush:      "#D4998A",          // very muted; only for flower centres
  bindRed:    "#8B1A1A",          // bindi only
};

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const cardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.9, y: 28 },
  visible: { opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const scaleFade: Variants = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────────
   Ganesha SVG  — close to reference style:
   sitting figure, OM below, sage-green / gold
───────────────────────────────────────────── */
function GaneshaIcon() {
  const g = C.gold;
  const gs = C.sageDark;
  return (
    <svg width="58" height="68" viewBox="0 0 58 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crown / mukut */}
      <path d="M29 4 L22 13 L29 10 L36 13 Z" fill={gs} opacity="0.85"/>
      <circle cx="29" cy="3.5" r="2.2" fill={g}/>
      <circle cx="22" cy="13" r="1.6" fill={g}/>
      <circle cx="36" cy="13" r="1.6" fill={g}/>
      {/* Head */}
      <ellipse cx="29" cy="22" rx="13" ry="13" fill={g} opacity="0.12"/>
      <ellipse cx="29" cy="22" rx="13" ry="13" stroke={gs} strokeWidth="1.6" fill="none"/>
      {/* Left ear — large */}
      <ellipse cx="12" cy="21" rx="5.5" ry="8" stroke={gs} strokeWidth="1.4" fill={g} fillOpacity="0.08"/>
      {/* Right ear */}
      <ellipse cx="46" cy="21" rx="5.5" ry="8" stroke={gs} strokeWidth="1.4" fill={g} fillOpacity="0.08"/>
      {/* Eyes */}
      <circle cx="24" cy="20" r="1.8" fill={gs}/>
      <circle cx="34" cy="20" r="1.8" fill={gs}/>
      <circle cx="24.6" cy="19.5" r="0.6" fill="#fff"/>
      <circle cx="34.6" cy="19.5" r="0.6" fill="#fff"/>
      {/* Bindi */}
      <circle cx="29" cy="15" r="1.2" fill={C.bindRed}/>
      {/* Trunk — curls to right/down */}
      <path d="M26 32 Q18 40 20 48 Q21 53 27 52 Q31 51 30 47" stroke={gs} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Left tusk */}
      <path d="M18 30 Q10 40 13 47" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Right tusk (broken shorter) */}
      <path d="M40 30 Q46 37 43 42" stroke={g} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <ellipse cx="29" cy="52" rx="12" ry="10" fill={g} fillOpacity="0.1" stroke={gs} strokeWidth="1.4"/>
      {/* Necklace */}
      <path d="M20 36 Q29 41 38 36" stroke={g} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Left arm */}
      <path d="M17 44 Q11 48 13 54" stroke={gs} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      {/* Right arm holds modak */}
      <path d="M41 44 Q47 48 45 54" stroke={gs} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <circle cx="45" cy="56" r="2.5" fill={g} fillOpacity="0.6" stroke={gs} strokeWidth="1"/>
      {/* Lotus seat */}
      <ellipse cx="29" cy="63" rx="14" ry="3.5" fill={g} fillOpacity="0.18" stroke={g} strokeWidth="1"/>
      <path d="M15 63 Q22 58 29 63 Q36 58 43 63" stroke={g} strokeWidth="1" fill="none" opacity="0.6"/>
      {/* OM text below */}
      <text x="29" y="70" textAnchor="middle" fontSize="9" fill={g} fontFamily="serif" fontWeight="600">ॐ</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Botanical side foliage SVGs  (left & right)
   Matches the lush green plants in reference
───────────────────────────────────────────── */
function LeftFoliage() {
  return (
    <svg width="120" height="420" viewBox="0 0 120 420" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", left: 0, top: 40, zIndex: 5, pointerEvents: "none" }}>
      {/* Large palm-like leaves from left edge */}
      <path d="M0 80 Q30 60 60 90 Q40 80 20 100Z" fill="#6B9A58" opacity="0.85"/>
      <path d="M0 80 Q25 50 70 70 Q45 72 20 95Z" fill="#5A8A48" opacity="0.75"/>
      <path d="M0 110 Q35 80 75 115 Q50 105 15 130Z" fill="#7AAA65" opacity="0.8"/>
      <path d="M0 60 Q20 30 55 55 Q30 52 8 78Z" fill="#8BBB72" opacity="0.7"/>
      {/* Fern-like branches */}
      <path d="M5 150 Q40 130 80 155" stroke="#6B9A58" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M15 150 Q22 142 30 150" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M25 150 Q32 142 40 150" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M35 151 Q42 143 50 151" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M45 153 Q52 145 60 153" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M5 170 Q38 148 78 170" stroke="#6B9A58" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M10 170 Q17 162 25 170" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M22 170 Q29 162 37 170" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M34 171 Q41 163 49 171" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Round bushy shrubs at bottom */}
      <ellipse cx="18" cy="320" rx="22" ry="18" fill="#5A8060" opacity="0.85"/>
      <ellipse cx="40" cy="335" rx="20" ry="16" fill="#6A9A6A" opacity="0.8"/>
      <ellipse cx="10" cy="340" rx="14" ry="12" fill="#4A7050" opacity="0.8"/>
      <ellipse cx="55" cy="345" rx="16" ry="13" fill="#7AAA78" opacity="0.75"/>
      {/* Floral sprigs */}
      <circle cx="48" cy="120" r="4" fill="#D4998A" opacity="0.7"/>
      <circle cx="60" cy="108" r="3" fill="#C88878" opacity="0.6"/>
      <circle cx="38" cy="130" r="3.5" fill="#D4998A" opacity="0.65"/>
      {/* Tall stems */}
      <path d="M60 200 Q55 250 58 310" stroke="#7AAA65" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M68 190 Q62 240 65 300" stroke="#6B9A58" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

function RightFoliage() {
  return (
    <svg width="120" height="420" viewBox="0 0 120 420" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", right: 0, top: 40, zIndex: 5, pointerEvents: "none" }}>
      {/* Mirror of left — reflected */}
      <path d="M120 80 Q90 60 60 90 Q80 80 100 100Z" fill="#6B9A58" opacity="0.85"/>
      <path d="M120 80 Q95 50 50 70 Q75 72 100 95Z" fill="#5A8A48" opacity="0.75"/>
      <path d="M120 110 Q85 80 45 115 Q70 105 105 130Z" fill="#7AAA65" opacity="0.8"/>
      <path d="M120 60 Q100 30 65 55 Q90 52 112 78Z" fill="#8BBB72" opacity="0.7"/>
      {/* Fern-like branches */}
      <path d="M115 150 Q80 130 40 155" stroke="#6B9A58" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M105 150 Q98 142 90 150" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M95 150 Q88 142 80 150" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M85 151 Q78 143 70 151" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M75 153 Q68 145 60 153" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M115 170 Q82 148 42 170" stroke="#6B9A58" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M110 170 Q103 162 95 170" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M98 170 Q91 162 83 170" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M86 171 Q79 163 71 171" stroke="#5A8A48" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Round bushy shrubs */}
      <ellipse cx="102" cy="320" rx="22" ry="18" fill="#5A8060" opacity="0.85"/>
      <ellipse cx="80" cy="335" rx="20" ry="16" fill="#6A9A6A" opacity="0.8"/>
      <ellipse cx="110" cy="340" rx="14" ry="12" fill="#4A7050" opacity="0.8"/>
      <ellipse cx="65" cy="345" rx="16" ry="13" fill="#7AAA78" opacity="0.75"/>
      {/* Floral sprigs */}
      <circle cx="72" cy="120" r="4" fill="#D4998A" opacity="0.7"/>
      <circle cx="60" cy="108" r="3" fill="#C88878" opacity="0.6"/>
      <circle cx="82" cy="130" r="3.5" fill="#D4998A" opacity="0.65"/>
      {/* Tall stems */}
      <path d="M60 200 Q65 250 62 310" stroke="#7AAA65" strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M52 190 Q58 240 55 300" stroke="#6B9A58" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Mandap illustration  — watercolour-style SVG
   matching reference: domed pavilion with fire
───────────────────────────────────────────── */
function MandapIllustration() {
  return (
    <svg width="320" height="160" viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Side domed structures (reference: small pink domes L & R) */}
      {/* Left dome */}
      <ellipse cx="42" cy="112" rx="32" ry="22" fill="#E8C8A8" opacity="0.6"/>
      <path d="M10 112 Q10 88 42 82 Q74 88 74 112Z" fill="#D4A888" opacity="0.55"/>
      <ellipse cx="42" cy="82" rx="12" ry="6" fill="#C89870" opacity="0.5"/>
      {/* Right dome */}
      <ellipse cx="278" cy="112" rx="32" ry="22" fill="#E8C8A8" opacity="0.6"/>
      <path d="M246 112 Q246 88 278 82 Q310 88 310 112Z" fill="#D4A888" opacity="0.55"/>
      <ellipse cx="278" cy="82" rx="12" ry="6" fill="#C89870" opacity="0.5"/>

      {/* Main mandap columns */}
      <rect x="95" y="70" width="8" height="70" rx="3" fill="#C8A870" opacity="0.8"/>
      <rect x="217" y="70" width="8" height="70" rx="3" fill="#C8A870" opacity="0.8"/>
      <rect x="120" y="75" width="6" height="65" rx="2" fill="#D4B880" opacity="0.7"/>
      <rect x="194" y="75" width="6" height="65" rx="2" fill="#D4B880" opacity="0.7"/>

      {/* Main dome top */}
      <path d="M130 58 Q160 28 190 58Z" fill="#C8A048" opacity="0.75"/>
      <ellipse cx="160" cy="58" rx="35" ry="12" fill="#D4AF37" opacity="0.65"/>
      <path d="M125 58 Q160 40 195 58" fill="#B89030" opacity="0.7"/>
      {/* Dome finial */}
      <line x1="160" y1="28" x2="160" y2="18" stroke="#C8A048" strokeWidth="2"/>
      <circle cx="160" cy="16" r="3" fill="#D4AF37"/>

      {/* Garland / flowers on top arch */}
      <path d="M100 70 Q130 50 160 55 Q190 50 220 70" stroke="#C87848" strokeWidth="2" fill="none" opacity="0.6"/>
      {/* Flower clusters on garland */}
      {[108,125,142,160,178,195,212].map((x,i) => (
        <circle key={i} cx={x} cy={58 + Math.sin(i)*4} r="4.5"
          fill={i%2===0 ? "#E8A878" : "#F0C090"} opacity="0.8"/>
      ))}
      {/* Hanging flowers/wisteria */}
      {[115,135,155,175,195].map((x,i) => (
        <path key={i} d={`M${x} 70 Q${x-2} 82 ${x} 90`}
          stroke="#D4888A" strokeWidth="1.5" fill="none" opacity="0.6"/>
      ))}

      {/* Sacred fire / havan kund */}
      <rect x="145" y="118" width="30" height="18" rx="2" fill="#C8A870" opacity="0.7"/>
      {/* Fire flames */}
      <path d="M155 118 Q158 100 160 95 Q162 100 165 118Z" fill="#E8A030" opacity="0.8"/>
      <path d="M152 118 Q154 106 156 102 Q158 106 158 118Z" fill="#F0B840" opacity="0.75"/>
      <path d="M162 118 Q164 108 166 104 Q168 108 168 118Z" fill="#E89020" opacity="0.75"/>
      <path d="M157 118 Q159 96 160 90 Q161 96 163 118Z" fill="#F8C850" opacity="0.7"/>

      {/* Ground base */}
      <rect x="88" y="138" width="144" height="6" rx="3" fill="#C8A870" opacity="0.4"/>

      {/* Peacock (left lower, reference has one) */}
      <ellipse cx="55" cy="145" rx="10" ry="6" fill="#2A6848" opacity="0.7"/>
      <circle cx="48" cy="140" r="4" fill="#3A7858" opacity="0.75"/>
      {/* Peacock tail feathers */}
      <path d="M65 145 Q80 132 85 138 Q78 140 65 145Z" fill="#2A6848" opacity="0.6"/>
      <path d="M65 145 Q82 140 86 145 Q78 145 65 145Z" fill="#3A8858" opacity="0.5"/>
      <circle cx="82" cy="136" r="3" fill="#1A5838" opacity="0.55"/>
      <circle cx="84" cy="143" r="2.5" fill="#2A6848" opacity="0.5"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Envelope (unchanged interaction, updated palette)
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
        {/* Back panel */}
        <div className="absolute inset-0 rounded-xl shadow-2xl"
          style={{
            background: `linear-gradient(150deg, ${C.card} 0%, ${C.cardEdge} 60%, #DDD0B0 100%)`,
            border: `1.5px solid ${C.goldLight}`,
            boxShadow: `0 8px 32px rgba(160,120,48,0.22)`,
          }}/>
        {/* Bottom fold */}
        <div className="absolute bottom-0 left-0 right-0 h-28 rounded-b-xl"
          style={{
            background: `linear-gradient(170deg, ${C.card} 0%, #DDD0B0 100%)`,
            clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
          }}/>
        {/* Left fold */}
        <div className="absolute top-0 bottom-0 left-0 w-1/2 rounded-bl-xl"
          style={{
            background: `linear-gradient(135deg, ${C.cardEdge} 0%, #DDD0B0 100%)`,
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
          }}/>
        {/* Right fold */}
        <div className="absolute top-0 bottom-0 right-0 w-1/2 rounded-br-xl"
          style={{
            background: `linear-gradient(225deg, ${C.cardEdge} 0%, #DDD0B0 100%)`,
            clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
          }}/>
        {/* Flap — sage green matching botanical theme */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-28"
          animate={clicked ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(175deg, ${C.sageDark} 0%, ${C.sage} 100%)`,
            clipPath: "polygon(0 0, 50% 78%, 100% 0)",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}/>
        {/* Gold trim line on flap */}
        <motion.div className="absolute top-0 left-0 right-0 pointer-events-none"
          animate={clicked ? { opacity: 0 } : { opacity: 1 }}>
          <svg width="100%" height="80" viewBox="0 0 288 80" preserveAspectRatio="none">
            <polyline points="0,0 144,62 288,0" fill="none" stroke={C.goldLight} strokeWidth="1.4" opacity="0.7"/>
          </svg>
        </motion.div>
        {/* Gold OM seal */}
        <motion.div className="absolute z-10 flex items-center justify-center"
          style={{
            width: 50, height: 50, borderRadius: "50%",
            background: `radial-gradient(circle at 38% 35%, ${C.goldPale}, ${C.gold})`,
            border: `2px solid ${C.card}`,
            boxShadow: `0 2px 16px rgba(160,120,48,0.5)`,
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          }}
          animate={clicked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: clicked ? 0.08 : 0 }}>
          <span style={{ fontSize: 24, lineHeight: 1, color: C.card, fontWeight: 700, fontFamily: "serif", marginTop: 2 }}>ॐ</span>
        </motion.div>
      </div>

      <motion.p
        animate={clicked ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: "var(--font-cormorant)", fontSize: 13, letterSpacing: "0.22em", color: C.textMid, textTransform: "uppercase" }}>
        Tap to open your invitation
      </motion.p>

      <motion.div
        animate={clicked ? { opacity: 0 } : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M1 1L10 10L19 1" stroke={C.gold} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Invitation Card  — reference-faithful layout
───────────────────────────────────────────── */
function InvitationCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto overflow-hidden"
      style={{
        width: 360,
        minHeight: 640,
        maxWidth: "100vw",
        background: C.card,
        borderRadius: 4,
        boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)",
        border: `1px solid ${C.cardEdge}`,
      }}
    >
      {/* Botanical foliage — left & right, positioned within card */}
      <LeftFoliage />
      <RightFoliage />

      {/* Mandap at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 4 }}>
        <MandapIllustration />
      </div>

      {/* ── Text content layer ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: 28,
          paddingBottom: 170,   /* space for mandap */
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {/* Ganesha icon */}
        <motion.div variants={fadeUp} style={{ marginBottom: 14 }}>
          <GaneshaIcon />
        </motion.div>

        {/* SAVE the DATE — reference style: SAVE & DATE uppercase spaced, "the" script */}
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: C.gold,
            textTransform: "uppercase",
          }}>SAVE</span>
          <span style={{
            fontFamily: "var(--font-great-vibes)",
            fontSize: 26,
            color: C.textMid,
            lineHeight: 1,
            marginTop: 2,
          }}>the</span>
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: C.gold,
            textTransform: "uppercase",
          }}>DATE</span>
        </motion.div>

        {/* FOR THE WEDDING OF */}
        <motion.p variants={fadeUp} style={{
          fontFamily: "var(--font-playfair)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: C.textGrey,
          textTransform: "uppercase",
          marginBottom: 22,
          fontWeight: 500,
        }}>
          For the Wedding of
        </motion.p>

        {/* Shubhangi — script, large */}
        <motion.h1 variants={scaleFade} style={{
          fontFamily: "var(--font-great-vibes)",
          fontSize: 58,
          color: C.textDark,
          lineHeight: 1,
          marginBottom: 4,
        }}>
          Shubhangi
        </motion.h1>

        {/* & */}
        <motion.p variants={fadeUp} style={{
          fontFamily: "var(--font-great-vibes)",
          fontSize: 38,
          color: C.textDark,
          lineHeight: 1,
          marginBottom: 4,
        }}>
          &amp;
        </motion.p>

        {/* Aishwarya — script, large */}
        <motion.h1 variants={scaleFade} style={{
          fontFamily: "var(--font-great-vibes)",
          fontSize: 58,
          color: C.textDark,
          lineHeight: 1,
          marginBottom: 28,
        }}>
          Aishwarya
        </motion.h1>

        {/* Date */}
        <motion.p variants={fadeUp} style={{
          fontFamily: "var(--font-playfair)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: C.textGrey,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 3,
        }}>
          June 27th, 2026
        </motion.p>

        {/* Venue */}
        <motion.p variants={fadeUp} style={{
          fontFamily: "var(--font-playfair)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: C.textGrey,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 10,
        }}>
          Vione, Akshardham, Delhi
        </motion.p>

        {/* Formal invitation to follow — italic script style */}
        <motion.p variants={fadeUp} style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontSize: 13,
          color: C.textGrey,
          letterSpacing: "0.04em",
        }}>
          formal invitation to follow
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Music hook
───────────────────────────────────────────── */
function useMusicOnOpen(opened: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/wedding-music.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  useEffect(() => {
    if (opened && audioRef.current) {
      audioRef.current.play().catch(() => {});
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
    if (audioRef.current.paused) { audioRef.current.play(); setMuted(false); }
    else { audioRef.current.pause(); setMuted(true); }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: `linear-gradient(160deg, #EDE8DC 0%, #E0D8C8 50%, #D8CEBC 100%)` }}
    >
      {/* Music toggle */}
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
              background: "rgba(250,246,238,0.85)",
              border: `1px solid ${C.goldLight}`,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: C.textMid,
              fontFamily: "var(--font-cormorant)",
              textTransform: "uppercase",
              boxShadow: "0 2px 12px rgba(160,120,48,0.18)",
            }}
          >
            <span style={{ fontSize: 14 }}>{muted ? "♪" : "♫"}</span>
            <span>{muted ? "Unmute" : "Mute"}</span>
          </motion.button>
        )}
      </AnimatePresence>

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
