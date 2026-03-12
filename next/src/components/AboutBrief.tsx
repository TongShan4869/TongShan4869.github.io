"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollRevealText from "./ScrollRevealText";

interface AboutBriefProps {
  bio: string;
  photo: string;
}

export default function AboutBrief({ bio, photo }: AboutBriefProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const imageY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isDesktop ? [100, 0, -50] : [0, 0, 0]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    isDesktop ? [0.95, 1.05] : [1, 1]
  );
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const linksOpacity = useTransform(scrollYProgress, [0.16, 0.46], [0, 1]);

  // Split bio into segments for ScrollRevealText
  const bioSegments = bio
    ? [{ text: bio }]
    : [{ text: "Researcher, engineer, and creator." }];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-0 pb-8 md:pb-12 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 items-center px-6 md:px-8 lg:px-12">
        {/* Left: text */}
        <div className="order-2 lg:order-1 flex flex-col justify-center lg:pr-12 pb-10 lg:pb-0 relative z-10">
          <motion.h2
            style={{ opacity: headingOpacity }}
            className="hidden lg:block text-8xl lg:text-9xl font-display font-bold tracking-tightest mb-8"
          >
            ABOUT
          </motion.h2>

          <ScrollRevealText
            className="text-[clamp(1rem,1.6vw,1.4rem)] font-display font-medium leading-[1.4] tracking-tight text-white"
            segments={bioSegments}
          />

          {/* Social links */}
          <motion.div
            style={{ opacity: linksOpacity }}
            className="mt-10 flex gap-5 items-center flex-wrap"
          >
            {/* GitHub */}
            <a
              href="https://github.com/tongshan4869"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/tong-shan1994"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Google Scholar */}
            <a
              href="https://scholar.google.com/citations?user=eUVUjXwAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="Google Scholar"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            </a>
            {/* Music Portfolio */}
            <a
              href="https://teenagingcu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors text-sm font-display font-semibold tracking-tight border border-white/30 px-4 py-1.5 rounded-full hover:border-accent"
              aria-label="Music Portfolio"
            >
              Music Portfolio
            </a>
          </motion.div>
        </div>

        {/* Right: profile photo with parallax */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="order-1 lg:order-2 relative z-20 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl"
        >
          {photo && (
            <Image
              src={photo}
              alt="Profile photo"
              fill
              priority
              className="object-cover object-center"
            />
          )}
          {/* ABOUT overlay on mobile */}
          <motion.h2
            style={{ opacity: headingOpacity }}
            className="lg:hidden absolute bottom-6 left-4 text-5xl md:text-8xl font-display font-bold tracking-tightest z-30"
          >
            ABOUT
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
