/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface ArtistItemProps {
  artist: any;
  position: number;
  onClick: () => void;
  isSelected: boolean;
}

export default function ArtistItem({
  artist,
  position,
  onClick,
  isSelected,
}: ArtistItemProps) {
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

      <div className="h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-4 flex-shrink-0 relative">
        <Image
          src={artist.images?.[0]?.url || "/placeholder.svg"}
          alt={artist.name}
          fill
          sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 100px"
          className="h-full w-full object-cover rounded-full"
        />
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-medium truncate text-sm sm:text-base">
          {artist.name}
        </h3>
        <p
          className={cn(
            "text-xs sm:text-sm truncate",
            isSelected ? "text-black/80" : "text-gray-400"
          )}
        >
          {artist.genres?.slice(0, 2).join(", ") || "No genres available"}
        </p>
      </div>
    </div>
  );
}
