export function Background() {
  const stars = Array.from({ length: 80 });
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="orb" style={{ width: 500, height: 500, top: -150, left: -150, background: "oklch(0.55 0.28 25 / 0.5)" }} />
      <div className="orb" style={{ width: 450, height: 450, bottom: -100, right: -100, background: "oklch(0.45 0.26 20 / 0.45)", animationDelay: "-5s" }} />
      <div className="orb" style={{ width: 350, height: 350, top: "40%", left: "60%", background: "oklch(0.65 0.27 28 / 0.3)", animationDelay: "-9s" }} />
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size, height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: `0 0 ${size * 3}px white`,
              animation: `pulse-glow ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        );
      })}
    </div>
  );
}
