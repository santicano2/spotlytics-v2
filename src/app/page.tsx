"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { AirplayIcon as Spotify } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#191414] text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-[#282828] p-8 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <Spotify className="h-16 w-16 text-[#1DB954] mb-4" />
          <h1 className="text-3xl font-bold">Spotlytics</h1>
          <p className="mt-2 text-gray-400">
            View your top tracks and artists from Spotify
          </p>
        </div>

        <div className="space-y-4">
          {session ? (
            <>
              <p className="mt-4">Welcome, {session.user?.name}</p>
              <Button
                asChild
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] hover:text-black text-white font-medium py-6 cursor-pointer"
              >
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
              <Button
                onClick={() => signOut()}
                className="w-full hover:bg-red-500 text-white font-medium py-6 cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <p className="text-center text-sm text-gray-400">
                Connect your Spotify account to see your listening stats
              </p>

              <Button
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-medium py-6 cursor-pointer"
                onClick={() => signIn("spotify")}
              >
                <Spotify className="mr-2 h-5 w-5" />
                Login with Spotify
              </Button>

              <p className="text-xs text-center text-gray-400 mt-4">
                By connecting, you authorize this app to view your Spotify
                listening history and stats. We don&apos;t store your personal
                data.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
