import { Suspense } from "react";

import DashboardHeader from "@/components/DashboardHeader";
import LoadingStats from "@/components/LoadingStats";
import StatsContainer from "@/components/StatsContainer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#191414] text-white">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingStats />}>
          <StatsContainer />
        </Suspense>
      </div>
    </main>
  );
}
