import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function GiftBoxScene({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState(false);

  const burst = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const dist = 180 + Math.random() * 120;
    const emojis = ["⭐", "💖", "🎈", "✨", "🌟", "💫"];
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, emoji: emojis[i % emojis.length], delay: Math.random() * 0.2 };
  });

  return (
    <div className="flex flex-col items-center justify-center gap-12 py-10">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-gradient-rose text-center">
        A Magical Gift Awaits
      </motion.h2>

      <div className="relative w-72 h-72 flex items-center justify-center">
        <AnimatePresence>
          {open && burst.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: p.x, y: p.y, scale: [0, 1.4, 1], opacity: [1, 1, 0], rotate: 360 }}
              transition={{ duration: 1.8, delay: p.delay, ease: "easeOut" }}
              className="absolute text-3xl pointer-events-none"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          onClick={() => !open && setOpen(true)}
          whileHover={{ scale: open ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer"
          aria-label="Open gift box"
        >
          {/* Lid */}
          <motion.div
            animate={open ? { y: -120, rotate: -25, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="absolute left-1/2 -translate-x-1/2 -top-4 w-44 h-12 rounded-md z-20"
            style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-10 h-12" style={{ background: "var(--gradient-gold)", clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }} />
          </motion.div>
          {/* Box */}
          <motion.div
            animate={open ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="w-40 h-40 rounded-lg relative"
            style={{ background: "linear-gradient(135deg, oklch(0.55 0.22 300), oklch(0.4 0.2 290))", boxShadow: "var(--shadow-glow)" }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }} />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-6" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }} />
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} onClick={onNext} className="btn-magic">
            Begin the Journey ✨
          </motion.button>
        )}
        {!open && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground text-sm">Tap the box to open</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
