import { NextRequest, NextResponse } from 'next/server';
import { searchTools } from '@/lib/tools';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const limit = parseInt(searchParams.get('limit') ?? '20');
  const category = searchParams.get('category') ?? '';

  const results = searchTools(q, { category, limit });

  return NextResponse.json({ results, total: results.length, query: q });
}
