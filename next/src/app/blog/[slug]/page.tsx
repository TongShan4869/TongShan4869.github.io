import { getAllPosts, getPost } from "@/lib/content";
import Markdoc from "@markdoc/markdoc";
import Image from "next/image";
import Link from "next/link";
import MotionPill from "@/components/MotionPill";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: typeof post.title === "string" ? post.title : slug,
    description: post.description ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const title = typeof post.title === "string" ? post.title : slug;
  const bodyContent = await post.body();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Cover image */}
      {post.cover && (
        <AnimateOnScroll>
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-10">
            <Image
              src={post.cover}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </AnimateOnScroll>
      )}

      {/* Title */}
      <AnimateOnScroll delay={0.1}>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">
          {title}
        </h1>
      </AnimateOnScroll>

      {/* Date */}
      {post.date && (
        <AnimateOnScroll delay={0.15}>
          <time className="block text-secondary text-sm mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </AnimateOnScroll>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <AnimateOnScroll delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <MotionPill key={tag} as="span">
                <span className="inline-block bg-white/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              </MotionPill>
            ))}
          </div>
        </AnimateOnScroll>
      )}

      {/* Body */}
      <AnimateOnScroll delay={0.25}>
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: Markdoc.renderers.html(
              Markdoc.transform(bodyContent.node)
            ),
          }}
        />
      </AnimateOnScroll>

      {/* Back link */}
      <AnimateOnScroll delay={0.1}>
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/blog"
            className="text-accent hover:underline font-semibold"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </AnimateOnScroll>
    </article>
  );
}
