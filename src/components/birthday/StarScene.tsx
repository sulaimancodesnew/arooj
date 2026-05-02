import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Star { id: number; x: number; y: number; collected: boolean; }

export function StarScene({ onNext }: { onNext: () => void }) {
  const [stars, setStars] = useState<Star[]>(
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 60,
      collected: false,
    }))
  );
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const collected = stars.filter((s) => s.collected).length;

  const collect = (id: number, x: number, y: number) => {
    setStars((prev) => prev.map((s) => (s.id === id ? { ...s, collected: true } : s)));
    const burstId = Date.now();
    setBursts((b) => [...b, { id: burstId, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== burstId)), 1000);
  };

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-5xl font-bold text-gradient-rose text-center mb-2">
        Catch 3 Wishing Stars
      </motion.h2>
      <p className="text-muted-foreground mb-6">Collected: <span className="text-gradient-gold font-bold">{Math.min(collected, 3)}/3</span></p>

      <div className="relative w-full flex-1 min-h-[400px]">
        {stars.map((s) => (
          <AnimatePresence key={s.id}>
            {!s.collected && (
              <motion.button
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0], y: [0, -15, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ rotate: { duration: 4, repeat: Infinity }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, scale: { type: "spring" } }}
                whileHover={{ scale: 1.3 }}
                onClick={() => collect(s.id, s.x, s.y)}
                className="absolute text-4xl cursor-pointer"
                style={{ left: `${s.x}%`, top: `${s.y}%`, filter: "drop-shadow(0 0 12px oklch(0.85 0.16 85))" }}
                aria-label="Collect star"
              >
                ⭐
              </motion.button>
            )}
          </AnimatePresence>
        ))}

        {bursts.map((b) => (
          <div key={b.id} className="absolute pointer-events-none" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(a) * 80, y: Math.sin(a) * 80, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute text-xl"
                >
                  ✨
                </motion.span>
              );
            })}
          </div>
        ))}
      </div>

      {collected >= 3 && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={onNext} className="btn-magic">
          Unlock Final Surprise 🎆
        </motion.button>
      )}
    </div>
  );
}
