import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const colors = [
  "oklch(0.6 0.26 25)",
  "oklch(0.45 0.24 20)",
  "oklch(0.7 0.26 28)",
  "oklch(0.35 0.18 18)",
  "oklch(0.55 0.28 22)",
];

export function BalloonScene({ onNext }: { onNext: () => void }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const balloons = Array.from({ length: 18 }).map((_, i) => {
    const depth = Math.random();
    return {
      id: i,
      color: colors[i % colors.length],
      size: 50 + depth * 80,
      left: Math.random() * 90,
      top: Math.random() * 70 + 10,
      depth,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 4,
      diagonal: Math.random() > 0.6,
    };
  });

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-5xl font-bold text-gradient-rose text-center z-10 mb-8">
        Floating Through Dreams
      </motion.h2>

      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute pointer-events-none"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            transform: `translate(${mouse.x * (1 - b.depth) * 30}px, ${mouse.y * (1 - b.depth) * 30}px)`,
            opacity: 0.4 + b.depth * 0.6,
            filter: `blur(${(1 - b.depth) * 4}px)`,
            zIndex: Math.floor(b.depth * 10),
            transition: "transform 0.4s ease-out",
          }}
          animate={b.diagonal
            ? { x: [0, 30, -20, 0], y: [0, -40, -20, 0], rotate: [-5, 5, -3, 0] }
            : { y: [0, -30, 0], rotate: [-3, 3, -3] }
          }
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              width: b.size, height: b.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.5), ${b.color})`,
              borderRadius: "50%",
              boxShadow: `0 10px 30px ${b.color}`,
            }}
          />
          <div className="mx-auto" style={{ width: 1, height: b.size * 0.8, background: "oklch(1 0 0 / 0.4)" }} />
        </motion.div>
      ))}

      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} onClick={onNext} className="btn-magic z-10 mt-8">
        Continue the Journey
      </motion.button>
    </div>
  );
}
