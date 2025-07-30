
// src/lib/services/analyticsService.ts

import { HistoricalData, MarketTrend } from '../types/analytics';

export class AnalyticsService {
  getHistoricalData(projectId: string): HistoricalData[] {
    // Mock implementation
    return [
      {
        projectId: 'proj-001',
        completionDate: new Date('2023-10-01'),
        finalCost: 300000,
        durationDays: 240,
        projectType: 'new_build',
        region: 'london',
      },
    ];
  }

  getMarketTrends(): MarketTrend[] {
    // Mock implementation
    return [
      {
        date: new Date(),
        materialPriceIndex: 1.2,
        laborCostIndex: 1.1,
        regionalDemandFactor: 1.3,
      },
    ];
  }
}
