"use client";

import { motion } from "framer-motion";
import FillWidthText from "./FillWidthText";
import HeroWaveform from "./HeroWaveform";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-end overflow-hidden min-h-[80vh] pt-12 md:pt-16">
      {/* Background waveform — fixed so it stays while page scrolls */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HeroWaveform />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Bottom gradient fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Main hero content area */}
      <div className="relative z-10 px-6 md:px-8 lg:px-12 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[clamp(1.6rem,4.5vw,3.5rem)] font-display font-semibold leading-[1.3] tracking-tighter">
            Welcome to my
            <br />
            research and development
            <br />
            repository.
            <br />
            <span className="text-accent">ようこそ</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hidden md:block text-[clamp(1rem,2.5vw,2rem)] font-display font-semibold leading-[1.1] tracking-tighter text-right"
        >
          Science is art.
        </motion.p>
      </div>

      {/* Thin divider line with tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 bg-white text-black py-1.5 px-6 md:px-8 lg:px-12 my-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 md:gap-0 text-xs md:text-sm font-bold">
          <span>RESEARCHER</span>
          <span className="md:text-center">ENGINEER</span>
          <span className="md:text-right">CREATOR</span>
        </div>
      </motion.div>

      {/* Bottom: MASSIVE name filling full width */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 pb-6"
      >
        <FillWidthText className="text-[14vw] font-display font-bold tracking-tightest leading-[0.85]">
          <h1>
            Tong Shan<span className="text-accent">.</span>
            {" "}
<span className="text-accent">单</span>彤
          </h1>
        </FillWidthText>
      </motion.div>
    </section>
  );
}
