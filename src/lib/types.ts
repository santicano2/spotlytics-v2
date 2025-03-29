export type TimePeriod = "short_term" | "medium_term" | "long_term";

export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}
