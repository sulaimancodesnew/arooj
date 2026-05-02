import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function EnvelopeScene({ name, message, onNext }: { name: string; message: string; onNext: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-gradient-rose text-center">
        A Letter For You
      </motion.h2>

      <div className="relative w-80 h-56 bg-black" onClick={() => setOpen(true)}>
        {/* Letter */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: 0, opacity: 0, scale: 0.9 }}
              animate={{ y: -180, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute inset-x-4 top-4 glass-strong rounded-xl p-6 z-10"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <p className="text-sm text-muted-foreground mb-2">Dear {name},</p>
              <p className="text-lg text-gradient-gold font-semibold leading-relaxed">{message}</p>
              {/* Sparkles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute text-yellow-200 pointer-events-none"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${10 + Math.random() * 14}px`,
                    animation: `sparkle ${1.5 + Math.random()}s ease-in-out ${Math.random() * 2}s infinite`,
                  }}
                >
                  ✨
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope */}
        <div className="absolute inset-0 cursor-pointer">
          <div className="absolute inset-0 rounded-lg" style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }} />
          <motion.div
            animate={open ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-x-0 top-0 h-1/2 origin-top"
            style={{
              background: "oklch(0.7 0.2 340)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(180deg, oklch(0.6 0.22 340), oklch(0.5 0.2 320))", clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 50%, 0 0)" }} />
          {!open && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)", animation: "pulse-glow 2s infinite" }}>
              💌
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} onClick={onNext} className="btn-magic mt-8">
            On to the Cake 🎂
          </motion.button>
        )}
        {!open && <p className="text-muted-foreground text-sm">Click the envelope</p>}
      </AnimatePresence>
    </div>
  );
}
