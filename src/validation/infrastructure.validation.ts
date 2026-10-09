import { z } from "zod";

export const createZoneSchema = z.object({
  name: z.string().min(2, "Zone name must be at least 2 characters"),
});
export const updateZoneSchema = createZoneSchema.partial();

export const createSubstationSchema = z.object({
  name: z
    .string()
    .min(2, "Substation name must be at least 2 characters")
    .max(100, "Substation name cannot exceed 100 characters"),
  powerZoneId: z.string().min(1, "Please select a zone"),
});
export const updateSubstationSchema = createSubstationSchema.partial();

export const createFeederSchema = z.object({
  name: z.string().min(2, "Feeder name must be at least 2 characters"),
  substationId: z.string().min(1, "Please select a substation"),
});
export const updateFeederSchema = createFeederSchema.partial();

export const createAreaSchema = z.object({
  name: z.string().min(2, "Area name must be at least 2 characters"),
  feederId: z.string().min(1, "Please select a feeder"),
});
export const updateAreaSchema = createAreaSchema.partial();