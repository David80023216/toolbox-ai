import { NextRequest, NextResponse } from 'next/server';
import { runTool } from '@/lib/toolRunner';

export async function POST(req: NextRequest) {
  try {
    const { engine, inputs } = await req.json();

    if (!engine || typeof engine !== 'string') {
      return NextResponse.json({ error: 'Missing engine parameter' }, { status: 400 });
    }

    const result = runTool(engine, inputs ?? {});
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Calculate error:', err);
    return NextResponse.json({ error: err.message ?? 'Calculation failed' }, { status: 500 });
  }
}
