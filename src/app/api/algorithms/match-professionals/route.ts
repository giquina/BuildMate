
// src/app/api/algorithms/match-professionals/route.ts

import { NextResponse } from 'next/server';
import { matchProfessionals, ProfessionalMatcherInput } from '../../../../lib/algorithms/professionalMatcher';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const matcherInput: ProfessionalMatcherInput = body;

    if (!matcherInput.projectType || !matcherInput.requiredSkills || !matcherInput.location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = matchProfessionals(matcherInput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in professional matching:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
