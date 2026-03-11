import FillWidthText from "./FillWidthText";

export default function CopyrightFooter() {
  return (
    <footer className="pt-16 px-6 md:px-12 max-w-site mx-auto">
      <div className="border-t border-white/10 pt-16 -mx-6 md:-mx-12 leading-none" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <FillWidthText className="text-[18vw] font-display font-bold tracking-tightest leading-[0.75] text-white mb-0 pb-0">
          ©{new Date().getFullYear()} Tong Shan
        </FillWidthText>
      </div>
    </footer>
  );
}
