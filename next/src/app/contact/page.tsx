import { getSiteSettings } from "@/lib/content";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedDivider from "@/components/AnimatedDivider";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const socialLinks = [
  {
    key: "githubUrl",
    label: "GitHub",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    key: "linkedinUrl",
    label: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    key: "scholarUrl",
    label: "Google Scholar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    ),
  },
  {
    key: "mediumUrl",
    label: "Medium",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    key: "substackUrl",
    label: "Substack",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    key: "xUrl",
    label: "X (Twitter)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const;

type SocialKey = (typeof socialLinks)[number]["key"];

export default async function ContactPage() {
  const site = await getSiteSettings();

  const email = site?.email ?? "tongshan@stanford.edu";
  const formspreeId = site?.formspreeId ?? "";

  return (
    <main className="pt-32 pb-24">
      <section className="px-8 md:px-16 lg:px-16 mb-8">
        <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tightest" style={{ color: "#ffffff" }}>
          CONTACT
        </h1>
      </section>

      {/* Email */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll>
          <p className="text-xs tracking-widest uppercase text-secondary mb-3">
            Email
          </p>
          <a
            href={`mailto:${email}`}
            className="text-xl md:text-2xl font-display font-semibold text-white hover:text-accent transition-colors break-all"
          >
            {email}
          </a>
        </AnimateOnScroll>
      </section>

      <AnimatedDivider className="max-w-3xl mx-auto" />

      {/* Social Links */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll>
          <p className="text-xs tracking-widest uppercase text-secondary mb-6">
            Find me online
          </p>
        </AnimateOnScroll>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link, i) => {
            const url = site?.[link.key as SocialKey] as string | undefined;
            if (!url) return null;
            return (
              <AnimateOnScroll key={link.key} delay={i * 0.06}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/15 text-sm text-white hover:bg-accent hover:border-accent hover:text-black transition-colors"
                >
                  {link.icon}
                  {link.label}
                </a>
              </AnimateOnScroll>
            );
          })}
          <AnimateOnScroll delay={socialLinks.length * 0.06}>
            <a
              href="https://cuinmusic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/15 text-sm text-white hover:bg-accent hover:border-accent hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
              Music Portfolio
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Form */}
      {formspreeId && (
        <>
          <AnimatedDivider className="max-w-3xl mx-auto" />
          <section className="px-8 md:px-16 lg:px-16 py-16">
            <AnimateOnScroll>
              <p className="text-xs tracking-widest uppercase text-secondary mb-8">
                Send a message
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <ContactForm formspreeId={formspreeId} />
            </AnimateOnScroll>
          </section>
        </>
      )}
    </main>
  );
}
