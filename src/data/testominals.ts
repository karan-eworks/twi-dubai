import { Testimonial } from "@/components/home/videos-sections";


/** Portrait crops sized for the 9:16 card. Swap for real poster frames
 *  pulled from each video once the files are exported. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=720&h=1280&fit=crop&crop=faces&q=80&auto=format`;

/** Placeholder clips — replace with the exported reels. */
const sampleVideo =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const videoTestimonials: Testimonial[] = [
  {
    id: "aarav-s",
    name: "Aarav S.",
    programme: "Hospitality Management",
    quote:
      "The placement module put me in a Business Bay hotel in my second term. I had a job offer before I finished.",
    poster: unsplash("1507003211169-0a1dd7228f2d"),
    videoSrc: sampleVideo,
    instagramUrl: "https://www.instagram.com/woolwichinstitutedubai/",
  },
  {
    id: "priya-m",
    name: "Priya M.",
    programme: "Business · Level 5",
    quote:
      "I came for the BTEC and stayed for the top-up. Progression to a UK degree was mapped out from day one.",
    poster: unsplash("1494790108377-be9c29b29330"),
    videoSrc: sampleVideo,
    instagramUrl: "https://www.instagram.com/woolwichinstitutedubai/",
  },
  {
    id: "yusuf-a",
    name: "Yusuf A.",
    programme: "Computing",
    quote:
      "Classes are small enough that the tutors know what you are working on. That changed how much I asked.",
    poster: unsplash("1500648767791-00dcc994a43e"),
    videoSrc: sampleVideo,
    instagramUrl: "https://www.instagram.com/woolwichinstitutedubai/",
  },
  {
    id: "meera-t",
    name: "Meera T.",
    programme: "ACCA · Applied Skills",
    quote:
      "Evening sessions meant I could keep working while I studied. The instalment plan made it possible at all.",
    poster: unsplash("1573497019940-1c28c88b4f3e"),
    instagramUrl: "https://www.instagram.com/woolwichinstitutedubai/",
  },
  {
    id: "daniel-o",
    name: "Daniel O.",
    programme: "Business · Level 4",
    quote:
      "Moving from Lagos to Dubai was the hard part. Student services handled the visa and the accommodation.",
    poster: unsplash("1506794778202-cad84cf45f1d"),
    videoSrc: sampleVideo,
    instagramUrl: "https://www.instagram.com/woolwichinstitutedubai/",
  },
  {
    id: "sana-k",
    name: "Sana K.",
    programme: "Hospitality Management",
    quote:
      "Forty-two nationalities on one campus. You learn the service side of the industry just by being here.",
    poster: unsplash("1544005313-94ddf0286df2"),
    instagramUrl: "https://www.instagram.com/woolwichinstitutedubai/",
  },
];