"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ProjectCardProps {
  slug: string;
  title: string;
  description?: string | null;
  cover?: string | null;
  tags?: readonly string[];
  index: number;
}

export default function ProjectCard({
  slug,
  title,
  description,
  cover,
  tags = [],
  index,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    const update = () => setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    update();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isDesktop || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(deltaX * 3);
    rotateX.set(-deltaY * 3);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: isDesktop && !shouldReduceMotion ? springRotateX : 0,
          rotateY: isDesktop && !shouldReduceMotion ? springRotateY : 0,
        }}
      >
        <Link
          href={`/projects/${slug}`}
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="block relative cursor-pointer group"
          data-cursor="view"
        >
          {cover && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <motion.div
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image src={cover} alt={title} fill className="object-cover" />
              </motion.div>

              <motion.div
                animate={{ opacity: hovered ? 0.4 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black z-10"
              />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="absolute top-3 left-3 z-20 flex gap-1.5 flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title overlay on hover */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <motion.div
                  animate={{
                    scaleY: hovered ? 1 : 0,
                    opacity: hovered ? 1 : 0,
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-white/80 backdrop-blur-sm py-0.5 text-center origin-center"
                >
                  <span className="text-black text-sm font-display font-semibold tracking-tight">
                    {title}
                  </span>
                </motion.div>
              </div>
            </div>
          )}

          {/* Text below card */}
          <div className="mt-3">
            <h3 className="text-white font-display font-bold text-lg tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-secondary text-sm mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
