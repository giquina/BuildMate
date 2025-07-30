
// src/app/api/algorithms/budget-optimize/route.ts

import { NextResponse } from 'next/server';
import { allocateBudget, BudgetInput } from '../../../../lib/algorithms/budgetAllocator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const budgetInput: BudgetInput = body;

    if (!budgetInput.totalBudget || !budgetInput.projectType || !budgetInput.qualityLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = allocateBudget(budgetInput);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in budget optimization:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
