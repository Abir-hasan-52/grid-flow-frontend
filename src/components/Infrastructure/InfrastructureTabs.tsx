"use client";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type InfrastructureTab =
  | "zones"
  | "substations"
  | "feeders"
  | "areas";

interface InfrastructureTabsProps {
  value: InfrastructureTab;
  onValueChange: (value: InfrastructureTab) => void;
}

export default function InfrastructureTabs({
  value,
  onValueChange,
}: InfrastructureTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(value) =>
        onValueChange(value as InfrastructureTab)
      }
    >
      <TabsList className="grid w-full grid-cols-4 lg:w-fit">
        <TabsTrigger value="zones">Zones</TabsTrigger>
        <TabsTrigger value="substations">Substations</TabsTrigger>
        <TabsTrigger value="feeders">Feeders</TabsTrigger>
        <TabsTrigger value="areas">Areas</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}