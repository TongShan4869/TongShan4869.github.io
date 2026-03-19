import AnimateOnScroll from "./AnimateOnScroll";

interface NewsItem {
  slug: string;
  title?: string;
  date?: string;
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-8 md:px-16 lg:px-24">
      <AnimateOnScroll>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tightest mb-12">
          NEWS
        </h2>
      </AnimateOnScroll>

      <ul className="max-w-2xl space-y-6">
        {news.map((item, i) => (
          <li key={item.slug}>
            <AnimateOnScroll delay={i * 0.1}>
              <div className="flex items-baseline gap-4">
                <time className="text-accent text-sm font-mono shrink-0 tabular-nums">
                  {item.date ?? ""}
                </time>
                <span className="text-white font-display text-base tracking-tight">
                  {item.title ?? item.slug}
                </span>
              </div>
            </AnimateOnScroll>
          </li>
        ))}
      </ul>
    </section>
  );
}
