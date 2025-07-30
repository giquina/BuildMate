
// src/app/api/algorithms/recommend-materials/route.ts

import { NextResponse } from 'next/server';
import { recommendMaterials, MaterialRecommenderInput } from '../../../../lib/algorithms/materialRecommender';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recommenderInput: MaterialRecommenderInput = body;

    if (!recommenderInput.projectType || !recommenderInput.currentMaterials) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = recommendMaterials(recommenderInput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in material recommendation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
