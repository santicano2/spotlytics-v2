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
    <div className="bg-[#282828] rounded-lg p-4 sm:p-6 h-full">
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <Image
          src={artist.images?.[0]?.url || "/placeholder.svg"}
          alt={artist.name}
          width={192}
          height={192}
          className="object-cover rounded-full shadow-lg mb-3 sm:mb-4"
        />
        <h3 className="text-lg sm:text-xl font-bold text-center">
          {artist.name}
        </h3>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center">
          <Music className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#1DB954]" />
          <div>
            <p className="text-xs sm:text-sm text-gray-400">Genres</p>
            <p className="text-sm sm:text-base">
              {artist.genres?.join(", ") || "No genres available"}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#1DB954]" />
          <div>
            <p className="text-xs sm:text-sm text-gray-400">Followers</p>
            <p className="text-sm sm:text-base">
              {artist.followers?.total?.toLocaleString() || "0"}
            </p>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-4 sm:mt-6 bg-[#1DB954] text-black py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#1ed760] transition-colors"
        onClick={openSpotify}
      >
        View on Spotify
      </button>
    </div>
  );
}
