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
