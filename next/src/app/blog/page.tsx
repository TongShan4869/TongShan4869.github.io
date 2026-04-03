import { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BlogPostCard from "@/components/BlogPostCard";
import { StaggeredGrid, StaggeredGridItem } from "@/components/StaggeredGrid";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Tong Shan on research, engineering, and music.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main>
      <section className="pt-32 md:pt-40 px-8 md:px-16 lg:px-16">
        <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tightest" style={{ color: "#ffffff" }}>
          BLOG
        </h1>
      </section>

      <section className="py-16 md:py-24 px-8 md:px-16 lg:px-16">
        {posts.length === 0 ? (
          <AnimateOnScroll>
            <div className="text-center py-20 md:py-32">
              <p className="text-4xl md:text-5xl font-display font-bold tracking-tightest text-white/20">
                No posts yet
              </p>
              <p className="text-secondary mt-4 text-lg">
                Check back soon for new content.
              </p>
            </div>
          </AnimateOnScroll>
        ) : (
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <StaggeredGridItem key={post.slug}>
                <BlogPostCard
                  title={post.title ?? ""}
                  slug={post.slug}
                  date={post.date ?? ""}
                  description={post.description ?? undefined}
                  tags={post.tags ? [...post.tags] : undefined}
                  cover={post.cover ?? undefined}
                />
              </StaggeredGridItem>
            ))}
          </StaggeredGrid>
        )}
      </section>
    </main>
  );
}
