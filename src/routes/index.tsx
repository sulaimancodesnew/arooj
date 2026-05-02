import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Background } from "@/components/birthday/Background";
import { Timeline } from "@/components/birthday/Timeline";
import { GiftBoxScene } from "@/components/birthday/GiftBoxScene";
import { BalloonScene } from "@/components/birthday/BalloonScene";
import { EnvelopeScene } from "@/components/birthday/EnvelopeScene";
import { CakeScene } from "@/components/birthday/CakeScene";
import { StarScene } from "@/components/birthday/StarScene";
import { FinalScene } from "@/components/birthday/FinalScene";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday Arooj — A Magical Journey" },
      { name: "description", content: "An interactive cinematic birthday experience filled with gifts, balloons, candles and wishes — made with love for Arooj." },
    ],
  }),
});

const birthdayPersonName = "Arooj";
const mainMessage = "Happy Birthday! You make life more beautiful just by being in it.";

function Index() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, 5));

  const scenes = [
    <GiftBoxScene key="gift" onNext={next} />,
    <BalloonScene key="balloon" onNext={next} />,
    <EnvelopeScene key="env" name={birthdayPersonName} message={mainMessage} onNext={next} />,
    <CakeScene key="cake" name={birthdayPersonName} onNext={next} />,
    <StarScene key="stars" onNext={next} />,
    <FinalScene key="final" name={birthdayPersonName} message={mainMessage} />,
  ];

  return (
    <main className="relative min-h-screen">
      <Background />

      <header className="pt-6 px-4 flex flex-col items-center gap-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          A Magical Journey for {birthdayPersonName}
        </motion.div>
        <Timeline current={step} />
      </header>

      <section className="px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {scenes[step]}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
