"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

function ScrollWord({
  word,
  progress,
  range,
  bold,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  bold?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.3em] ${bold ? "font-bold" : ""}`}
    >
      {word}
    </motion.span>
  );
}

interface Segment {
  text: string;
  bold?: boolean;
}

export default function ScrollRevealText({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Flatten all words with their bold flag
  const allWords: { word: string; bold?: boolean }[] = [];
  for (const seg of segments) {
    for (const w of seg.text.split(" ")) {
      if (w) allWords.push({ word: w, bold: seg.bold });
    }
  }

  const total = allWords.length;

  return (
    <p ref={ref} className={className}>
      {allWords.map((item, i) => {
        const start = i / total;
        const end = (i + 1) / total;
        return (
          <ScrollWord
            key={i}
            word={item.word}
            progress={scrollYProgress}
            range={[start, end]}
            bold={item.bold}
          />
        );
      })}
    </p>
  );
}
