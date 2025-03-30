"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, AirplayIcon as Spotify, User } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserProfile();
    }
  }, [session]);

  if (!session) {
    redirect("/");
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-[#121212] border-b border-[#282828]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Spotify className="h-8 w-8 text-[#1DB954] mr-3" />
          <h1 className="text-2xl font-bold text-[#1DB954]">Spot-lytics</h1>
        </div>

        <div className="flex items-center gap-4">
          {!loading && user && (
            <div className="hidden md:flex items-center gap-2">
              {user.images && user.images[0] ? (
                <div className="relative w-12 h-12">
                  <Image
                    src={user.images[0].url || "/placeholder.svg"}
                    alt={user.display_name}
                    fill
                    sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 100px"
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#282828] flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              )}
              <span className="text-[#1DB954] font-bold">
                {user.display_name}
              </span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="border-[#333] bg-red-500 hover:bg-[#333] hover:text-red-500 cursor-grab transition duration-200 ease-in-out"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
