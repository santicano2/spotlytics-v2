/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface TrackItemProps {
  track: any;
  position: number;
  onClick: () => void;
  isSelected: boolean;
}

export default function TrackItem({
  track,
  position,
  onClick,
  isSelected,
}: TrackItemProps) {
  return (
    <div
      className={cn(
        "flex items-center p-2 sm:p-3 rounded-md cursor-pointer transition-colors",
        isSelected
          ? "bg-[#1DB954] text-black"
          : "bg-[#282828] hover:bg-[#333333]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3 shrink-0">
        <span className="font-medium text-sm sm:text-base">{position}</span>
      </div>

      <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-4 shrink-0">
        <Image
          src={track.album?.images?.[0]?.url || "/placeholder.png"}
          alt={`${track.album?.name} cover`}
          fill
          sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 100px"
          className="h-full w-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
          <Play size={20} className="text-white" />
        </div>
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-medium truncate text-sm sm:text-base">
          {track.name}
        </h3>
        <p
          className={cn(
            "text-sm truncate",
            isSelected ? "text-black/80" : "text-gray-400"
          )}
        >
          {track.artists.map((artist: { name: any }) => artist.name).join(", ")}
        </p>
      </div>

      <div className="ml-1 sm:ml-2 text-xs sm:text-sm text-right shrink-0">
        <span className={isSelected ? "text-black/80" : "text-gray-400"}>
          {formatDuration(track.duration_ms)}
        </span>
      </div>
    </div>
  );
}
