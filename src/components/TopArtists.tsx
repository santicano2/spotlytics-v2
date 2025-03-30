"use client";

import { useState, useEffect } from "react";

import type { Artist, TimePeriod } from "@/lib/types";

import { ScrollArea } from "@/components/ui/scroll-area";

import ArtistItem from "@/components/ArtistItem";
import ArtistDetails from "@/components/ArtistDetails";

interface TopArtistsProps {
  timePeriod: TimePeriod;
}

export default function TopArtists({ timePeriod }: TopArtistsProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/top-artists?time_range=${timePeriod}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch top artists");
        }
        const data = await response.json();
        setArtists(data.items);
        // Reset selected artist when time period changes
        setSelectedArtist(null);
      } catch (err) {
        console.error("Error fetching top artists:", err);
        setError("Failed to load your top artists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, [timePeriod]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] text-center">
        <div>
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-gray-400">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-center">
        <p className="text-gray-400">
          No artists found for this time period. Try listening to more music or
          selecting a different time range.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="md:col-span-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
          Your top artists
        </h2>
        <ScrollArea className="h-[400px] sm:h-[600px] rounded-md border border-[#333333]">
          <div className="p-2 sm:p-4 space-y-2 sm:space-y-4">
            {artists.map((artist, index) => (
              <ArtistItem
                key={artist.id}
                artist={artist}
                position={index + 1}
                onClick={() => setSelectedArtist(artist)}
                isSelected={selectedArtist?.id === artist.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="md:col-span-1">
        {selectedArtist ? (
          <ArtistDetails artist={selectedArtist} />
        ) : (
          <div className="h-[200px] md:h-full flex items-center justify-center bg-[#282828] rounded-lg p-4 sm:p-6">
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Select an artist to see details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
