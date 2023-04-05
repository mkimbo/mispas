import React from "react";
import { NextSeo } from "next-seo";
import { TPerson } from "../models/missing_person.model";

interface SEOProps {
  title: string;
  description: string;
  slug: string;
  images: string[];
  missingPerson?: TPerson;
}
const siteURL = "https://www.canonicalurl";
export default function SEO({
  title,
  description,
  slug,
  images,
  missingPerson,
}: SEOProps) {
  const pageUrl = siteURL + slug;
  const pageTitle = missingPerson
    ? `${title} | Missing Person`
    : `${title} | Mispas`;
  const names = missingPerson ? title.split(" ") : null;
  const imageData = images.map((image) => {
    return {
      url: image,
      width: 400,
      height: 400,
      alt: title,
    };
  });
  const openGraphProfile = missingPerson
    ? {
        type: "profile",
        profile: {
          firstName: names[0],
          lastName: names[names.length - 1],
          username: title,
          gender: missingPerson?.gender,
        },
      }
    : {};
  return (
    <>
      <NextSeo
        title={pageTitle}
        description={description}
        canonical={pageUrl}
        openGraph={{
          url: pageUrl,
          title: pageTitle,
          description: description,
          images: imageData,
          ...openGraphProfile,
        }}
      />
    </>
  );
}
