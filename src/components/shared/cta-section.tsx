import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./container";

export default function CTASection() {
  return (
    <section className="w-full relative isolate overflow-hidden bg-navy-900 py-[clamp(4.5rem,9vw,9rem)] text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/twi-classroom-study.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.12_0.038_245_/_0.82),oklch(0.12_0.038_245_/_0.65)_36%,oklch(0.11_0.034_245_/_0.95)_100%)]"
      />
      <Container>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.02] tracking-[-0.025em] text-white text-balance">
          Ready to take the next step?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/78 text-pretty">
          Start your application or speak with admissions to learn more about
          this programme.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/apply" intent="primary" size="lg">
            Start Your Application
            <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            href="/courses"
            intent="secondary"
            size="lg"
            surface="dark"
          >
            Browse All Programmes
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
