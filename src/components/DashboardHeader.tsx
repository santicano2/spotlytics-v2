"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, AirplayIcon as Spotify, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function DashboardHeader() {
  const { data: session } = useSession();

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
          <h1 className="text-2xl font-bold text-[#1DB954]">Spotlytics</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#282828] flex items-center justify-center">
              {/* TODO: Cambiar a datos de Spotify */}
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <span className="text-gray-300">User123</span>
          </div>

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
