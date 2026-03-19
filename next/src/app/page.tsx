import Hero from "@/components/Hero";
import AboutBrief from "@/components/AboutBrief";
import FeaturedProjects from "@/components/FeaturedProjects";
import PublicationHighlights from "@/components/PublicationHighlights";
import NewsSection from "@/components/NewsSection";
import { getFeaturedProjects, getAbout, getAllNews } from "@/lib/content";
import { getSelectedPublications } from "@/lib/publications";

export default async function Home() {
  const [projects, about, news] = await Promise.all([
    getFeaturedProjects(),
    getAbout(),
    getAllNews(),
  ]);
  const publications = getSelectedPublications();

  return (
    <main>
      <Hero />
      <AboutBrief bio={about?.bioShort ?? ""} photo={about?.photo ?? ""} />
      <FeaturedProjects projects={projects} />
      <PublicationHighlights publications={publications} />
      <NewsSection news={news.slice(0, 5)} />
    </main>
  );
}
