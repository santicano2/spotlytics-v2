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
        "flex items-center p-3 rounded-md cursor-pointer transition-colors",
        isSelected
          ? "bg-[#1DB954] text-black"
          : "bg-[#282828] hover:bg-[#333333]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-8 h-8 mr-3">
        <span className="font-medium">{position}</span>
      </div>

      <div className="relative h-12 w-12 mr-4 shrink-0">
        <Image
          src={artist.images?.[0]?.url || "/placeholder.svg"}
          alt={artist.name}
          fill
          className="h-full w-full object-cover rounded-full"
        />
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-medium truncate">{artist.name}</h3>
        <p
          className={cn(
            "text-sm truncate",
            isSelected ? "text-black/80" : "text-gray-400"
          )}
        >
          {artist.genres?.slice(0, 2).join(", ") || "No genres available"}
        </p>
      </div>
    </div>
  );
}
