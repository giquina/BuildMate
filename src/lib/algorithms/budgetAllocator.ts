
// src/lib/algorithms/budgetAllocator.ts

import { AlgorithmInput, AlgorithmOutput, Recommendation } from '../types/algorithms';

export interface BudgetInput extends AlgorithmInput {
  totalBudget: number;
  projectType: string;
  qualityLevel: 'basic' | 'standard' | 'premium';
}

export interface BudgetOutput {
  allocations: {
    materials: number;
    labor: number;
    permits: number;
    contingency: number;
  };
  recommendations: Recommendation[];
}

export function allocateBudget(input: BudgetInput): AlgorithmOutput<BudgetOutput> {
  // Mock implementation for budget allocation
  const { totalBudget, qualityLevel } = input;

  let materialRatio = 0.4;
  let laborRatio = 0.4;

  switch (qualityLevel) {
    case 'premium':
      materialRatio = 0.5;
      laborRatio = 0.35;
      break;
    case 'basic':
      materialRatio = 0.35;
      laborRatio = 0.45;
      break;
  }

  const allocations = {
    materials: totalBudget * materialRatio,
    labor: totalBudget * laborRatio,
    permits: totalBudget * 0.1,
    contingency: totalBudget * 0.05,
  };

  const recommendations: Recommendation[] = [];

  if (qualityLevel !== 'premium') {
    recommendations.push({
      id: 'mat-001',
      name: 'Upgrade to Premium Materials',
      reason: 'Higher quality materials can increase the property value and durability.',
      score: 0.75,
    });
  }

  return {
    result: {
      allocations,
      recommendations,
    },
    confidenceScore: 0.85,
    warnings: [],
  };
}
