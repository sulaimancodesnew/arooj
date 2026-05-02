import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function CakeScene({ name, onNext }: { name: string; onNext: () => void }) {
  const [layer, setLayer] = useState(0); // 0..3
  const [candles, setCandles] = useState(0); // 0..5
  const [blown, setBlown] = useState(false);
  const [smokes, setSmokes] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setLayer(1), 400);
    const t2 = setTimeout(() => setLayer(2), 900);
    const t3 = setTimeout(() => setLayer(3), 1400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (layer < 3) return;
    const interval = setInterval(() => {
      setCandles((c) => (c < 5 ? c + 1 : (clearInterval(interval), c)));
    }, 250);
    return () => clearInterval(interval);
  }, [layer]);

  const blow = () => {
    setBlown(true);
    setSmokes(Array.from({ length: 5 }).map((_, i) => ({ id: i, x: i })));
    setTimeout(() => setSmokes([]), 1600);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-5xl font-bold text-gradient-rose text-center">
        Make a Wish, {name}
      </motion.h2>

      <div className="relative w-80 h-80 flex items-end justify-center">
        {/* Plate */}
        <div className="absolute bottom-2 w-72 h-3 rounded-full" style={{ background: "oklch(0.85 0.05 290)", boxShadow: "0 4px 20px oklch(0 0 0 / 0.4)" }} />

        {/* Layer 1 (bottom) */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={layer >= 1 ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute bottom-5 w-64 h-20 rounded-2xl origin-bottom"
          style={{ background: "linear-gradient(180deg, oklch(0.85 0.12 350), oklch(0.65 0.18 340))", boxShadow: "inset 0 -8px 0 oklch(0.55 0.2 330), 0 0 30px oklch(0.78 0.18 350 / 0.5)" }}
        />
        {/* Layer 2 */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={layer >= 2 ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute bottom-24 w-52 h-16 rounded-2xl origin-bottom"
          style={{ background: "linear-gradient(180deg, oklch(0.92 0.1 90), oklch(0.78 0.16 80))", boxShadow: "inset 0 -6px 0 oklch(0.7 0.18 70), 0 0 25px oklch(0.85 0.16 85 / 0.5)" }}
        />
        {/* Layer 3 (top) */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={layer >= 3 ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute bottom-40 w-40 h-14 rounded-2xl origin-bottom"
          style={{ background: "linear-gradient(180deg, oklch(0.9 0.14 320), oklch(0.7 0.2 310))", boxShadow: "inset 0 -5px 0 oklch(0.55 0.22 300), 0 0 25px oklch(0.7 0.22 310 / 0.5)" }}
        />

        {/* Candles */}
        {Array.from({ length: 5 }).map((_, i) => {
          const visible = i < candles;
          const left = `calc(50% + ${(i - 2) * 26}px)`;
          return (
            <AnimatePresence key={i}>
              {visible && (
                <motion.div
                  initial={{ y: -30, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="absolute"
                  style={{ bottom: 208, left, transform: "translateX(-50%)" }}
                >
                  {!blown && <div className="flame mx-auto -mb-1" />}
                  {blown && smokes[i] && (
                    <div className="relative">
                      <span className="smoke" style={{ left: -2 }} />
                      <span className="smoke" style={{ left: 4, animationDelay: "0.2s" }} />
                    </div>
                  )}
                  <div className="w-2 h-8 mx-auto rounded-sm" style={{ background: "linear-gradient(180deg, oklch(0.95 0.1 30), oklch(0.7 0.18 20))" }} />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {!blown && candles === 5 && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={blow} className="btn-magic">
          Blow the Candles 💨
        </motion.button>
      )}
      {blown && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} onClick={onNext} className="btn-magic">
          Catch the Wishing Stars ⭐
        </motion.button>
      )}
    </div>
  );
}
