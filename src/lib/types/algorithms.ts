
// src/lib/types/algorithms.ts

/**
 * Represents the core inputs for any construction-related algorithm.
 */
export interface AlgorithmInput {
  projectId: string;
  userId: string;
  marketRegion: 'london' | 'south_east' | 'scotland' | 'wales' | 'northern_england' | 'midlands';
}

/**
 * Represents the output of a scoring or prediction algorithm.
 */
export interface AlgorithmOutput<T> {
  result: T;
  confidenceScore: number; // A value between 0 and 1 indicating confidence
  warnings: string[];
}

/**
 * Base interface for recommendation results.
 */
export interface Recommendation {
  id: string;
  name: string;
  reason: string; // Why this item is recommended
  score: number; // Recommendation strength
}
