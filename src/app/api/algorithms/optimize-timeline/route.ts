
// src/app/api/algorithms/optimize-timeline/route.ts

import { NextResponse } from 'next/server';
import { predictTimeline } from '../../../../lib/algorithms/timelineIntelligence';
import { TimelinePredictionInput } from '../../../../lib/types/predictions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const predictionInput: TimelinePredictionInput = body;

    if (!predictionInput.squareMeters || !predictionInput.complexity || !predictionInput.marketRegion) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = predictTimeline(predictionInput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in timeline optimization:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
