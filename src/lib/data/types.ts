import type { Lang } from "@/lib/translations";

export type GolfCourseRow = {
  id: string;
  slug: string;
  display_order: number;
  featured_on_home: boolean;
  name_vi: string;
  name_kr: string;
  location_vi: string;
  location_kr: string;
  distance_vi: string;
  distance_kr: string;
  distance_from_homestay_vi: string | null;
  distance_from_homestay_kr: string | null;
  holes_vi: string;
  holes_kr: string;
  highlight_vi: string;
  highlight_kr: string;
  text_vi: string;
  text_kr: string;
  details_vi: string[];
  details_kr: string[];
  images: string[];
  video_url: string | null;
};

export type PackageRow = {
  id: string;
  slug: string;
  display_order: number;
  featured: boolean;
  flight_included: boolean;
  tag_vi: string;
  tag_kr: string;
  name_vi: string;
  name_kr: string;
  text_vi: string;
  text_kr: string;
  includes_vi: string[];
  includes_kr: string[];
  image_url: string | null;
};

export type LangGolfCourse = {
  slug: string;
  name: string;
  location: string;
  distance: string;
  distanceFromHomestay: string | null;
  holes: string;
  highlight: string;
  text: string;
  details: string[];
  images: string[];
  videoUrl: string | null;
};

export type LangPackage = {
  slug: string;
  tag: string;
  name: string;
  text: string;
  includes: string[];
  imageUrl: string | null;
  featured: boolean;
  flightIncluded: boolean;
};

export function toLangGolfCourse(row: GolfCourseRow, lang: Lang): LangGolfCourse {
  const isVi = lang === "vi";
  return {
    slug: row.slug,
    name: isVi ? row.name_vi : row.name_kr,
    location: isVi ? row.location_vi : row.location_kr,
    distance: isVi ? row.distance_vi : row.distance_kr,
    distanceFromHomestay: isVi
      ? row.distance_from_homestay_vi
      : row.distance_from_homestay_kr,
    holes: isVi ? row.holes_vi : row.holes_kr,
    highlight: isVi ? row.highlight_vi : row.highlight_kr,
    text: isVi ? row.text_vi : row.text_kr,
    details: isVi ? row.details_vi : row.details_kr,
    images: row.images,
    videoUrl: row.video_url,
  };
}

export function toLangPackage(row: PackageRow, lang: Lang): LangPackage {
  const isVi = lang === "vi";
  return {
    slug: row.slug,
    tag: isVi ? row.tag_vi : row.tag_kr,
    name: isVi ? row.name_vi : row.name_kr,
    text: isVi ? row.text_vi : row.text_kr,
    includes: isVi ? row.includes_vi : row.includes_kr,
    imageUrl: row.image_url,
    featured: row.featured,
    flightIncluded: row.flight_included,
  };
}
