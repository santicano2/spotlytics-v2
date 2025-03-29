import { Loader2 } from "lucide-react";

export default function LoadingStats() {
  return (
    <div className="flex flex-col items-center justify-center h-[600px]">
      <Loader2 className="h-12 w-12 text-[#1DB954] animate-spin" />
      <p className="mt-4 text-lg">Loading your Spotify stats...</p>
    </div>
  );
}
