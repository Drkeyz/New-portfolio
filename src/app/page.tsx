import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Creative } from "@/components/Creative";
import { Hero, Intro } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { about } from "@content/site";

export default function Home() {
  return (
    <>
      <Intro />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Approach />
        <ScrollMarquee items={about.skills} />
        <About />
        <Creative />
        <Contact />
      </main>
    </>
  );
}
