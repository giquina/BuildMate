
// src/app/api/algorithms/predict-costs/route.ts

import { NextResponse } from 'next/server';
import { predictCost } from '../../../../lib/algorithms/costPredictor';
import { CostPredictionInput } from '../../../../lib/types/predictions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const predictionInput: CostPredictionInput = body;

    if (!predictionInput.squareMeters || !predictionInput.qualityLevel || !predictionInput.marketRegion) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = predictCost(predictionInput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in cost prediction:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
