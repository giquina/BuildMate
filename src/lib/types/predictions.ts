
// src/lib/types/predictions.ts

import { AlgorithmInput, AlgorithmOutput } from './algorithms';

/**
 * Input for the cost prediction model.
 */
export interface CostPredictionInput extends AlgorithmInput {
  projectType: string;
  squareMeters: number;
  qualityLevel: 'basic' | 'standard' | 'premium';
}

/**
 * Output for the cost prediction model.
 */
export interface CostPredictionOutput {
  predictedCost: number;
  costRange: {
    min: number;
    max: number;
  };
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    contingency: number;
  };
}

/**
 * Input for the timeline prediction model.
 */
export interface TimelinePredictionInput extends AlgorithmInput {
  projectType: string;
  squareMeters: number;
  complexity: 'low' | 'medium' | 'high';
}

/**
 * Output for the timeline prediction model.
 */
export interface TimelinePredictionOutput {
  predictedDurationDays: number;
  durationRange: {
    min: number;
    max: number;
  };
  phases: {
    planning: number;
    construction: number;
    finishing: number;
  };
}
