import { NextResponse } from 'next/server';
import { awardXp, XP_VALUES } from '@/lib/gamification/xpEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, source, sourceId } = body;

    if (!userId || !source) {
      return NextResponse.json({ error: 'userId and source are required' }, { status: 400 });
    }

    const amount = XP_VALUES[source as keyof typeof XP_VALUES];
    if (amount === undefined) {
      return NextResponse.json({ error: `Unknown XP source: ${source}` }, { status: 400 });
    }

    const record = await awardXp(userId, amount, source, sourceId);
    return NextResponse.json({ success: true, record });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to award XP' },
      { status: 500 }
    );
  }
}
