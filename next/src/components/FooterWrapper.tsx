"use client";

import { usePathname } from "next/navigation";

export default function FooterWrapper({
  fullFooter,
  minimalFooter,
}: {
  fullFooter: React.ReactNode;
  minimalFooter: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/keystatic")) return null;

  const showFull = pathname === "/";

  return (
    <div className="relative z-10 bg-black">
      {showFull ? fullFooter : minimalFooter}
    </div>
  );
}
