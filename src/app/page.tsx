import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { TheWork } from "@/components/the-work";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <TheWork />
        <Experience />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
