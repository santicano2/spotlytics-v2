"use client";

import { useState } from "react";

import type { TimePeriod } from "@/lib/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TimePeriodSelector from "@/components/TimePeriodSelector";

import TopTracks from "./TopTracks";

export default function StatsContainer() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("short_term");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Your stats</h2>

      <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />

      <Tabs defaultValue="tracks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#282828]">
          <TabsTrigger
            value="tracks"
            className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black cursor-pointer text-white"
          >
            Top tracks
          </TabsTrigger>
          <TabsTrigger
            value="artists"
            className="data-[state=active]:bg-[#1DB954] data-[state=active]:text-black cursor-pointer text-white"
          >
            Top artists
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tracks" className="mt-6">
          <TopTracks timePeriod={timePeriod} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
