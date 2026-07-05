import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import { formatMonthYear, CATEGORY_LABELS } from "@/lib/date";

interface NewsItem {
  slug: string;
  title?: string | null;
  date?: string | null;
  category?: string | null;
  location?: string | null;
  link?: string | null;
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-8 md:px-16 lg:px-24">
      <AnimateOnScroll>
        <div className="flex items-end justify-between mb-12 gap-4">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tightest">
            NEWS
          </h2>
          <Link
            href="/news"
            className="text-sm text-secondary hover:text-accent transition-colors shrink-0 whitespace-nowrap"
          >
            View all →
          </Link>
        </div>
      </AnimateOnScroll>

      <ul className="max-w-3xl space-y-8">
        {news.map((item, i) => (
          <li key={item.slug}>
            <AnimateOnScroll delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-1 md:gap-6">
                <time className="text-accent text-sm font-mono shrink-0 tabular-nums pt-0.5">
                  {formatMonthYear(item.date)}
                </time>
                <div className="min-w-0">
                  <span className="inline-block text-xs uppercase tracking-wider text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-1.5">
                    {CATEGORY_LABELS[item.category ?? "talk"] ?? "News"}
                  </span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white font-display text-base tracking-tight hover:text-accent transition-colors"
                    >
                      {item.title ?? item.slug}
                    </a>
                  ) : (
                    <span className="block text-white font-display text-base tracking-tight">
                      {item.title ?? item.slug}
                    </span>
                  )}
                  {item.location && (
                    <p className="text-sm text-secondary mt-1">{item.location}</p>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          </li>
        ))}
      </ul>
    </section>
  );
}
