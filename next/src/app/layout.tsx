import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CopyrightFooter from "@/components/CopyrightFooter";
import FooterWrapper from "@/components/FooterWrapper";

export const metadata: Metadata = {
  title: {
    default: "Tong Shan",
    template: "%s | Tong Shan",
  },
  description: "Researcher, Engineer, Creator — Auditory neuroscience, hearing science, and music.",
  metadataBase: new URL("https://TongShan4869.github.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <ScrollToTop />
        {children}
        <FooterWrapper
          fullFooter={<Footer />}
          minimalFooter={<CopyrightFooter />}
        />
      </body>
    </html>
  );
}
