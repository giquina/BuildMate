
// src/lib/types/analytics.ts

/**
 * Defines the structure for historical project data used in analytics.
 */
export interface HistoricalData {
  projectId: string;
  completionDate: Date;
  finalCost: number;
  durationDays: number;
  projectType: string;
  region: string;
}

/**
 * Defines the structure for market trend data.
 */
export interface MarketTrend {
  date: Date;
  materialPriceIndex: number;
  laborCostIndex: number;
  regionalDemandFactor: number;
}
