"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const pathname = usePathname();

  // Reset cursor state on route change
  useEffect(() => {
    const reset = () => { setCursorText(""); setHovered(false); };
    reset();
  }, [pathname]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const updateHover = () => {
      const interactive = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
      interactive.forEach((node) => {
        node.addEventListener("mouseenter", () => setHovered(true));
        node.addEventListener("mouseleave", () => setHovered(false));
      });

      const viewTargets = document.querySelectorAll("[data-cursor='view']");
      viewTargets.forEach((node) => {
        node.addEventListener("mouseenter", () => setCursorText("View"));
        node.addEventListener("mouseleave", () => setCursorText(""));
      });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    updateHover();
    const observer = new MutationObserver(updateHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const hasText = cursorText.length > 0;
  const size = hasText ? 80 : hovered ? 32 : 24;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
    >
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        {hasText && (
          <span className="text-black text-xs font-bold uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
