import { CourseCards } from "@/components/cards/course-section";
import { LatestEvents } from "@/components/home/event-section";
import { Hero } from "@/components/home/hero-section";
import { Insights } from "@/components/home/insights-section";
import { JourneyPathways } from "@/components/home/journey-section";
import { ProgrammeGrid } from "@/components/home/program-section";
import { VideoTestimonials } from "@/components/home/videos-sections";
import { WhyChoose } from "@/components/home/why-choose-section";
import CTASection from "@/components/shared/cta-section";
import { videoTestimonials } from "@/data/testominals";

export default function Home() {
  return (
    /* Sections stretch to the full width and each one centres its own content
       through <Container>. Do not put items-center here: it makes every section
       shrink to fit its contents, so their widths stop matching each other. */
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <ProgrammeGrid />
      <WhyChoose />
      <JourneyPathways />
      <CTASection />
      <VideoTestimonials testimonials={videoTestimonials} />
      <LatestEvents />
      <Insights />
      <CourseCards />
    </div>
   
  );
}
