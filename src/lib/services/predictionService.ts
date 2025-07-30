
// src/lib/services/predictionService.ts

import { predictCost } from '../algorithms/costPredictor';
import { predictTimeline } from '../algorithms/timelineIntelligence';
import { CostPredictionInput, TimelinePredictionInput } from '../types/predictions';

export class PredictionService {
  predictCost(input: CostPredictionInput) {
    return predictCost(input);
  }

  predictTimeline(input: TimelinePredictionInput) {
    return predictTimeline(input);
  }
}
