"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const isKeystatic = pathname.startsWith("/keystatic");

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Show on scroll up, hide on scroll down (after passing the initial nav height)
  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = lastScrollY.current;
    if (current < 100) {
      setVisible(true);
    } else if (current < prev) {
      setVisible(true);
    } else if (current > prev + 5) {
      setVisible(false);
    }
    lastScrollY.current = current;
  });

  // Hide navigation on Keystatic admin pages
  if (isKeystatic) return null;

  return (
    <>
      {/* Desktop: horizontal top bar — 3-column */}
      <motion.nav
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md"
      >
        <div className="grid grid-cols-3 items-center px-8 lg:px-12 py-5">
          <Link href="/" className="tracking-tightest">
            <span className="text-lg font-bold block leading-none">Tong Shan</span>
            <span className="text-lg font-bold block leading-none mt-2">单 彤</span>
          </Link>
          <div className="text-center">
            <p className="text-sm font-semibold mb-0.5">Quick Links</p>
            <p className="text-sm text-secondary">
              {navItems.map((item, i) => (
                <span key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-accent transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                  {i < navItems.length - 1 && " | "}
                </span>
              ))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold mb-0.5">Researcher / Engineer / Creator</p>
            <p className="text-sm text-white">Postdoc @ Stanford</p>
          </div>
        </div>
        <div className="h-px bg-accent" />
      </motion.nav>
      {/* Spacer for fixed nav */}
      <div className="hidden md:block h-[85px] bg-black" />

      {/* Mobile: top bar + hamburger */}
      <motion.nav
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-white/10"
      >
        <Link href="/" className="tracking-tightest">
          <span className="text-lg font-bold block leading-tight">Tong Shan</span>
          <span className="text-lg font-bold block leading-tight mt-1">单 彤</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white w-8 h-8 flex flex-col justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-full h-px bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-full h-px bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-full h-px bg-white"
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                setMobileOpen(false);
              }
            }}
            style={{ touchAction: "none" }}
            className="md:hidden fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => { handleNavClick(e, item.href); setMobileOpen(false); }}
                  className="text-5xl font-display font-bold tracking-tightest hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
