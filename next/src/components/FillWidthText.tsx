"use client";

import { useRef, useEffect, useState } from "react";

export default function FillWidthText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current || !textRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      const textHeight = textRef.current.scrollHeight;
      if (textWidth > 0) {
        const s = containerWidth / textWidth;
        setScale(s);
        setHeight(textHeight * s);
      }
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden flex justify-center" style={{ height }}>
      <div
        ref={textRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
        className={`whitespace-nowrap ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
