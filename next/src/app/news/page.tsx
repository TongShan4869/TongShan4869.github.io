import type { Metadata } from "next";
import { getAllNews } from "@/lib/content";
import NewsList from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News",
  description:
    "News, invited talks, events, and media coverage from Tong Shan.",
};

export default async function NewsPage() {
  // Strip the non-serializable Markdoc `body` resolver before handing data
  // to the client component.
  const news = (await getAllNews()).map((n) => ({
    slug: n.slug,
    title: n.title ?? null,
    date: n.date ?? null,
    category: n.category ?? null,
    location: n.location ?? null,
    description: n.description ?? null,
    link: n.link ?? null,
  }));

  return (
    <main className="pt-32 pb-8">
      <section className="px-8 md:px-16 lg:px-16 mb-12">
        <h1
          className="text-7xl md:text-9xl font-display font-bold tracking-tightest mb-6"
          style={{ color: "#ffffff" }}
        >
          NEWS
        </h1>
        <p className="text-secondary text-lg max-w-2xl">
          Invited talks, science events, and media coverage.
        </p>
      </section>

      <NewsList news={news} />
    </main>
  );
}
