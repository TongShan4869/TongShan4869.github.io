import AnimateOnScroll from "./AnimateOnScroll";
import FillWidthText from "./FillWidthText";
import MotionPill from "./MotionPill";

const socials = [
  {
    url: "https://github.com/tongshan4869",
    label: "GitHub",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    url: "https://linkedin.com/in/tong-shan1994",
    label: "LinkedIn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    url: "https://scholar.google.com/citations?user=eUVUjXwAAAAJ",
    label: "Google Scholar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    ),
  },
  {
    url: "https://www.researchgate.net/profile/Tong-Shan",
    label: "ResearchGate",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.586 0c-1.127 0-2.04.343-2.743 1.028-.703.686-1.054 1.575-1.054 2.669 0 1.062.338 1.926 1.014 2.593.677.666 1.554 1 2.633 1 .42 0 .812-.06 1.18-.178.366-.118.664-.28.89-.486l-.48-.896c-.406.336-.905.504-1.496.504-.675 0-1.21-.218-1.605-.654-.395-.436-.592-1.024-.592-1.764 0-.77.2-1.38.6-1.83.4-.45.936-.676 1.608-.676.583 0 1.074.166 1.473.497l.497-.897c-.208-.2-.5-.358-.875-.472A3.6 3.6 0 0 0 19.586 0zM8.648 7.642c-1.396 0-2.606.265-3.63.796-1.023.53-1.812 1.28-2.365 2.247-.554.968-.83 2.078-.83 3.33 0 1.868.613 3.375 1.838 4.52C4.887 19.68 6.518 20.252 8.56 20.252c1.143 0 2.206-.168 3.19-.504.985-.336 1.724-.77 2.217-1.3l-.917-1.252c-.996.918-2.297 1.377-3.903 1.377-1.35 0-2.442-.393-3.275-1.178-.833-.786-1.25-1.812-1.25-3.08 0-1.387.442-2.49 1.326-3.31.885-.82 2.058-1.23 3.52-1.23.724 0 1.35.1 1.878.3.527.2.945.472 1.253.816l.917-1.252c-.368-.436-.898-.784-1.59-1.045-.693-.26-1.48-.39-2.362-.39h-.014l.098-.562z" />
      </svg>
    ),
  },
  {
    url: "https://x.com/tong_shan_",
    label: "X",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="pt-50 pb-0 px-6 md:px-12 max-w-site mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 md:gap-16 items-start">
        <AnimateOnScroll>
          <div className="text-center md:text-left">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tightest mb-6">
              CONTACT
            </h2>
            <p className="text-sm text-white/50">
              Get in touch — <a href="mailto:tshan@ur.rochester.edu" className="text-accent hover:underline">tshan@ur.rochester.edu</a>
            </p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <div id="socials-grid" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {socials.map((s) => (
              <MotionPill key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 aspect-[4/3] rounded-2xl border border-white/10 bg-white/[0.03] text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
                >
                  {s.icon}
                  <span className="text-sm font-semibold">{s.label}</span>
                </a>
              </MotionPill>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
      <div className="mt-52 border-t border-white/10 pt-16 -mx-6 md:-mx-12 leading-none" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <FillWidthText className="text-[18vw] font-display font-bold tracking-tightest leading-[0.75] text-white mb-0 pb-0">
          ©{new Date().getFullYear()} Tong Shan
        </FillWidthText>
      </div>
    </footer>
  );
}
