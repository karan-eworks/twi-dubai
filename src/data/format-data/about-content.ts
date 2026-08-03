import { clean, getPlainText, normalizeBoolean } from "@/lib/clean";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { PageApiItem } from "../types/pages";
import DOMPurify from "isomorphic-dompurify";

const STATIC_ABOUT_TITLE = "About The Woolwich Institute Dubai";
const STATIC_ABOUT_META_DESCRIPTION =
  "Learn about The Woolwich Institute Dubai, a KHDA-licensed and Pearson-approved vocational college delivering career-focused education in Dubai.";
const STATIC_ABOUT_IMAGE = "/images/twi-hero-students.jpg";


function isPublishedPage(page: PageApiItem | null | undefined) {
  if (!page) return false;
  if (page.publish === undefined || page.publish === null) return true;
  return normalizeBoolean(page.publish);
}


export function getAboutMeta(page: PageApiItem | null | undefined) {
  const publishedPage = isPublishedPage(page) ? page : null;
  const featuredImage = mediaUrl(publishedPage?.featured_image) ?? STATIC_ABOUT_IMAGE;

  return {
    title:
      clean(publishedPage?.meta_tag?.meta_title) ??
      clean(publishedPage?.meta_tag?.og_title) ??
      STATIC_ABOUT_TITLE,
    description:
      clean(publishedPage?.meta_tag?.meta_description) ??
      clean(publishedPage?.meta_tag?.og_description) ??
      STATIC_ABOUT_META_DESCRIPTION,
    image: featuredImage,
  };
}



export function getAboutData(page: PageApiItem | null | undefined) {
  const publishedPage = isPublishedPage(page) ? page : null;
  const featuredImage = publishedPage?.featured_image;
  const description =
    getPlainText(publishedPage?.excerpt) ||
    getPlainText(publishedPage?.description);

  return {
    hero: {
      eyebrow: "About TWI Dubai",
      title: clean(publishedPage?.name) ?? STATIC_ABOUT_TITLE,
      description,
      media: {
        src: mediaUrl(featuredImage) ?? STATIC_ABOUT_IMAGE,
        alt:
          mediaAlt(featuredImage) ??
          "Students seated in a lecture hall during a class session.",
        priority: true,
      },
    },
    purpose: {
      heading: "Shaping the Next Generation of Global Leaders",
    //   deck:
    //     "TWI Dubai combines British-quality vocational education with Dubai-based academic support, career guidance, and global progression routes.",
      html: publishedPage?.description,
    },
    // campusImages,
  };
}