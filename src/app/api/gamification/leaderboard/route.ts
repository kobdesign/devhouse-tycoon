import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/gamification/xpEngine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '10', 10);

  try {
    const leaderboard = await getLeaderboard(limit);
    return NextResponse.json({ leaderboard });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get leaderboard' },
      { status: 500 }
    );
  }
}
