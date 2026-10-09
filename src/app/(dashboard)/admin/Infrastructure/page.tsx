/** biome-ignore-all lint/style/useImportType: <explanation> */
"use client";

import AreaSection from "@/components/Infrastructure/AreaSection";
import FeederSection from "@/components/Infrastructure/FeederSection";
import InfrastructureTabs, { InfrastructureTab } from "@/components/Infrastructure/InfrastructureTabs";
import SubstationSection from "@/components/Infrastructure/SubstationSection";
import ZoneSection from "@/components/Infrastructure/ZoneSection";
import { useState } from "react";

 

export default function InfrastructurePage() {
  const [activeTab, setActiveTab] =
    useState<InfrastructureTab>("zones");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Infrastructure Management
        </h1>

        <p className="text-muted-foreground">
          Manage zones, substations, feeders, and areas.
        </p>
      </div>

      <InfrastructureTabs
        value={activeTab}
        onValueChange={setActiveTab}
      />

      <div className="rounded-xl border bg-background p-5">
        {activeTab === "zones" && <ZoneSection />}

        {activeTab === "substations" && (
          <SubstationSection />
        )}

        {activeTab === "feeders" && <FeederSection />}

        {activeTab === "areas" && <AreaSection />}
      </div>
    </div>
  );
}