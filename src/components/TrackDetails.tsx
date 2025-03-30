/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Clock, Music, Calendar } from "lucide-react";

import { formatDuration, formatReleaseDate } from "@/lib/utils";

interface TrackDetailsProps {
  track: any;
}

export default function TrackDetails({ track }: TrackDetailsProps) {
  const openSpotify = () => {
    if (track.external_urls?.spotify) {
      window.open(track.external_urls.spotify, "_blank");
    }
  };

  return (
    <div className="bg-[#282828] rounded-lg p-4 sm:p-6 h-full">
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <Image
          src={track.album?.images[0]?.url || "/placeholder.png"}
          alt={`${track.name} cover`}
          width={192}
          height={192}
          className="object-cover rounded-md shadow-lg mb-4"
        />
        <h3 className="text-lg sm:text-xl font-bold text-center">
          {track.name}
        </h3>
        <p className="text-gray-400 text-sm sm:text-base">
          {track.artists.map((artist: { name: any }) => artist.name).join(", ")}
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center">
          <Music className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#1DB954]" />
          <div>
            <p className="text-xs sm:text-sm text-gray-400">Album</p>
            <p className="text-sm sm:text-base">{track.album?.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#1DB954]" />
          <div>
            <p className="text-xs sm:text-sm text-gray-400">Duration</p>
            <p className="text-sm sm:text-base">
              {formatDuration(track.duration_ms)}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#1DB954]" />
          <div>
            <p className="text-xs sm:text-sm text-gray-400">Release Date</p>
            <p className="text-sm sm:text-base">
              {formatReleaseDate(track.album?.release_date)}
            </p>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-4 sm:mt-6 bg-[#1DB954] text-black py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#1ed760] transition-colors cursor-pointer"
        onClick={openSpotify}
      >
        Play on Spotify
      </button>
    </div>
  );
}
