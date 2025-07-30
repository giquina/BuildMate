
// src/lib/services/recommendationService.ts

import { allocateBudget } from '../algorithms/budgetAllocator';
import { matchProfessionals } from '../algorithms/professionalMatcher';
import { recommendMaterials } from '../algorithms/materialRecommender';
import { BudgetInput } from '../algorithms/budgetAllocator';
import { ProfessionalMatcherInput } from '../algorithms/professionalMatcher';
import { MaterialRecommenderInput } from '../algorithms/materialRecommender';

export class RecommendationService {
  getBudgetRecommendations(input: BudgetInput) {
    return allocateBudget(input);
  }

  getProfessionalRecommendations(input: ProfessionalMatcherInput) {
    return matchProfessionals(input);
  }

  getMaterialRecommendations(input: MaterialRecommenderInput) {
    return recommendMaterials(input);
  }
}
