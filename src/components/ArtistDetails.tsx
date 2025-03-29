/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Music, Users } from "lucide-react";

interface ArtistDetailsProps {
  artist: any;
}

export default function ArtistDetails({ artist }: ArtistDetailsProps) {
  const openSpotify = () => {
    if (artist.external_urls?.spotify) {
      window.open(artist.external_urls.spotify, "_blank");
    }
  };

  return (
    <div className="bg-[#282828] rounded-lg p-6 h-full">
      <div className="flex flex-col items-center mb-6">
        <Image
          src={artist.images?.[0]?.url || "/placeholder.svg"}
          alt={artist.name}
          width={192}
          height={192}
          className="object-cover rounded-full shadow-lg mb-4"
        />
        <h3 className="text-xl font-bold text-center">{artist.name}</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <Music className="w-5 h-5 mr-3 text-[#1DB954]" />
          <div>
            <p className="text-sm text-gray-400">Genres</p>
            <p>{artist.genres?.join(", ") || "No genres available"}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Users className="w-5 h-5 mr-3 text-[#1DB954]" />
          <div>
            <p className="text-sm text-gray-400">Followers</p>
            <p>{artist.followers?.total?.toLocaleString() || "0"}</p>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-6 bg-[#1DB954] text-black py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors cursor-pointer"
        onClick={openSpotify}
      >
        View on Spotify
      </button>
    </div>
  );
}
