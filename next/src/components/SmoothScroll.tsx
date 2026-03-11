"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const prevPathname = useRef(pathname);

  // Disable browser scroll restoration — always start at top on refresh
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialize Lenis once
  useEffect(() => {
    if (pathname.startsWith("/keystatic")) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle hash on initial load
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          lenis.scrollTo(el, { offset: -100 });
        }
      }, 300);
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top or hash on route change
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    const lenis = lenisRef.current;

    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el && lenis) {
          lenis.scrollTo(el, { offset: -100 });
        }
      }, 300);
    } else {
      // Force scroll to top through both native and Lenis
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return null;
}
