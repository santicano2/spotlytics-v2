"use client";

import { useState, useEffect } from "react";

import type { TimePeriod, Track } from "@/lib/types";

import { ScrollArea } from "@/components/ui/scroll-area";

import TrackItem from "./TrackItem";
import TrackDetails from "./TrackDetails";

interface TopTracksProps {
  timePeriod: TimePeriod;
}

export default function TopTracks({ timePeriod }: TopTracksProps) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/top-tracks?time_range=${timePeriod}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch top tracks");
        }
        const data = await response.json();
        setTracks(data.items);
        // Reset selected track when time period changes
        setSelectedTrack(null);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
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

  if (tracks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-center">
        <p className="text-gray-400">
          No tracks found for this time period. Try listening to more music or
          selecting a different time range.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="md:col-span-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
          Your top tracks
        </h2>
        <ScrollArea className="h-[400px] sm:h-[600px] rounded-md border border-[#333333]">
          <div className="p-2 sm:p-4 space-y-2 sm:space-y-4">
            {tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                position={index + 1}
                onClick={() => setSelectedTrack(track)}
                isSelected={selectedTrack?.id === track.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="md:col-span-1">
        {selectedTrack ? (
          <TrackDetails track={selectedTrack} />
        ) : (
          <div className="h-[200px] md:h-full flex items-center justify-center bg-[#282828] rounded-lg p-4 sm:p-6">
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Select a track to see details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
