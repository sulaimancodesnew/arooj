import { motion } from "framer-motion";

const STEPS = ["Gift", "Balloons", "Letter", "Cake", "Stars", "Wish"];

export function Timeline({ current }: { current: number }) {
  const points = STEPS.map((_, i) => {
    const x = 50 + i * 110;
    const y = 36 + Math.sin(i * 0.9) * 16;
    return { x, y };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q ${cx} ${prev.y} ${p.x} ${p.y}`;
  }, "");

  const progress = current / (STEPS.length - 1);
  const width = points[points.length - 1].x + 50;

  return (
    <div
      className="glass-strong rounded-full px-6 py-4 mx-auto max-w-full overflow-x-auto"
      style={{ background: "oklch(0.08 0.04 22 / 0.85)", border: "1px solid oklch(0.7 0.26 25 / 0.5)", boxShadow: "0 0 30px oklch(0 0 0 / 0.6), inset 0 0 20px oklch(0.6 0.26 25 / 0.15)" }}
    >
      <svg viewBox={`0 0 ${width} 80`} width={width} height="80" className="block max-w-full h-auto">
        <defs>
          <linearGradient id="pathgrad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.22 35)" />
            <stop offset="100%" stopColor="oklch(0.65 0.28 22)" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <path d={pathD} stroke="oklch(1 0 0 / 0.35)" strokeWidth="2.5" fill="none" strokeDasharray="6 5" />
        <motion.path
          d={pathD}
          stroke="url(#pathgrad)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
          initial={false}
          animate={{ pathLength: progress }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ pathLength: progress }}
        />
        {points.map((p, i) => {
          const active = i === current;
          const done = i < current;
          const dotFill = active
            ? "oklch(0.85 0.25 30)"
            : done
            ? "oklch(0.7 0.26 25)"
            : "oklch(0.98 0.01 25)";
          return (
            <g key={i}>
              {/* Dark halo behind dot for contrast over any background */}
              <circle cx={p.x} cy={p.y} r={active ? 14 : 11} fill="oklch(0.05 0.02 20 / 0.95)" />
              <circle
                cx={p.x} cy={p.y} r={active ? 10 : 7}
                fill={dotFill}
                stroke="oklch(0.98 0.01 25)"
                strokeWidth={active ? 2 : 1.5}
                style={{ filter: active ? "drop-shadow(0 0 14px oklch(0.85 0.28 30))" : "drop-shadow(0 0 4px oklch(0 0 0 / 0.8))" }}
              >
                {active && <animate attributeName="r" values="8;13;8" dur="1.6s" repeatCount="indefinite" />}
              </circle>
              {/* Text shadow plate for legibility */}
              <text
                x={p.x} y={p.y + 32}
                textAnchor="middle"
                fill="oklch(0.05 0.02 20)"
                fontSize="14"
                fontWeight={900}
                style={{ letterSpacing: "0.5px" }}
                stroke="oklch(0.05 0.02 20)"
                strokeWidth="4"
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {STEPS[i]}
              </text>
              <text
                x={p.x} y={p.y + 32}
                textAnchor="middle"
                fill={active ? "oklch(0.95 0.18 35)" : "oklch(0.98 0.01 25)"}
                fontSize="14"
                fontWeight={active ? 900 : 700}
                style={{ letterSpacing: "0.5px" }}
              >
                {STEPS[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
