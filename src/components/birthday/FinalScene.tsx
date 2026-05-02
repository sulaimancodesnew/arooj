import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export function FinalScene({ name, message }: { name: string; message: string }) {
  useEffect(() => {
    const fire = () => {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ["#ff2d2d", "#b30000", "#ff6b6b", "#1a0000", "#ffffff"] });
      confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 } });
    };
    fire();
    const interval = setInterval(fire, 2500);
    return () => clearInterval(interval);
  }, []);

  // Firework bursts (CSS)
  const fireworks = Array.from({ length: 6 }).map((_, i) => ({
    left: 10 + Math.random() * 80,
    top: 15 + Math.random() * 50,
    delay: i * 0.4,
    color: ["oklch(0.65 0.28 25)", "oklch(0.5 0.26 20)", "oklch(0.75 0.24 30)", "oklch(0.9 0.05 25)"][i % 4],
  }));

  // Floating hearts
  const hearts = Array.from({ length: 14 });

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Fireworks */}
      {fireworks.map((f, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: `${f.left}%`, top: `${f.top}%` }}>
          {Array.from({ length: 18 }).map((_, j) => {
            const a = (j / 18) * Math.PI * 2;
            return (
              <span
                key={j}
                className="absolute block w-1.5 h-1.5 rounded-full"
                style={{
                  background: f.color,
                  boxShadow: `0 0 8px ${f.color}`,
                  ['--x' as string]: `${Math.cos(a) * 100}px`,
                  ['--y' as string]: `${Math.sin(a) * 100}px`,
                  animation: `firework 1.6s ease-out ${f.delay + (i * 0.1)}s infinite`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Hearts */}
      {hearts.map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0,
            animation: `heart-rise ${6 + Math.random() * 5}s linear ${Math.random() * 5}s infinite`,
          }}
        >
          {["💖", "💗", "💕", "❤️"][i % 4]}
        </span>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="glass-strong rounded-3xl p-10 md:p-14 max-w-2xl tilt-card relative z-10"
        style={{ boxShadow: "var(--shadow-glow)" }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold text-gradient-gold glow-text mb-4"
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-6"
        >
          {name} 💖
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-xl text-foreground/90 leading-relaxed"
        >
          {message}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-8 text-3xl">
          🎂 🎈 ✨ 🎁 🌟
        </motion.div>
      </motion.div>
    </div>
  );
}
