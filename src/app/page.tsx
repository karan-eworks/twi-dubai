import { JourneyPathways } from "@/components/home/journey-section";
import { ProgrammeGrid } from "@/components/home/program-section";
import { VideoTestimonials } from "@/components/home/videos-sections";
import { WhyChoose } from "@/components/home/why-choose-section";
import CTASection from "@/components/shared/cta-section";
import PageHero from "@/components/shared/page-hero";
import { videoTestimonials } from "@/data/testominals";

export default function Home() {
  return (
    /* Sections stretch to the full width and each one centres its own content
       through <Container>. Do not put items-center here: it makes every section
       shrink to fit its contents, so their widths stop matching each other. */
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <PageHero 
        title="About Us"
        eyebrow="About Twi Dubai"
        body="This is the body text for the Page Hero component. It can be a brief description or introduction."
        imageSrc="https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Description of the image"
      />
      <ProgrammeGrid />
      <WhyChoose />
      <JourneyPathways />
      <CTASection />
      <VideoTestimonials testimonials={videoTestimonials} />
    </div>
   
  );
}
