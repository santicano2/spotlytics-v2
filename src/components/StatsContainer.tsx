"use client";

import { useState } from "react";

import type { TimePeriod } from "@/lib/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TimePeriodSelector from "@/components/TimePeriodSelector";

export default function StatsContainer() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("short_term");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Your stats</h2>

      <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
    </div>
  );
}
