"use client";

import { useRef, useEffect, useState } from "react";

export default function FillWidthText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      if (textWidth > 0) {
        setScale(containerWidth / textWidth);
      }
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={textRef}
        style={{ transform: `scaleX(${scale})`, transformOrigin: "left" }}
        className={`whitespace-nowrap ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
