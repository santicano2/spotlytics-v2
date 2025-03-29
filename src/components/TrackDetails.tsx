"use client";

import Image from "next/image";
import { Clock, Music, Calendar } from "lucide-react";

import { formatDuration, formatReleaseDate } from "@/lib/utils";
import { Track } from "@/lib/types";

interface TrackDetailsProps {
  track: Track;
}

export default function TrackDetails({ track }: TrackDetailsProps) {
  const openSpotify = () => {
    if (track.external_urls?.spotify) {
      window.open(track.external_urls.spotify, "_blank");
    }
  };

  return (
    <div className="bg-[#282828] rounded-lg p-6 h-full">
      <div className="flex flex-col items-center mb-6">
        <Image
          src={track.album?.images[0]?.url || "/placeholder.png"}
          alt={`${track.name} cover`}
          width={192}
          height={192}
          className="object-cover rounded-md shadow-lg mb-4"
        />
        <h3 className="text-xl font-bold text-center">{track.name}</h3>
        <p className="text-gray-400">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <Music className="w-5 h-5 mr-3 text-[#1DB954]" />
          <div>
            <p className="text-sm text-gray-400">Album</p>
            <p>{track.album?.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-3 text-[#1DB954]" />
          <div>
            <p className="text-sm text-gray-400">Duration</p>
            <p>{formatDuration(track.duration)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-[#1DB954]" />
          <div>
            <p className="text-sm text-gray-400">Release Date</p>
            <p>{formatReleaseDate(track.releaseDate)}</p>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-6 bg-[#1DB954] text-black py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors cursor-pointer"
        onClick={openSpotify}
      >
        Play on Spotify
      </button>
    </div>
  );
}
