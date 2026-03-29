import { NextResponse } from 'next/server';
import { syncGoogleSheets, getLastSyncStatus } from '@/lib/sync/syncEngine';

export async function POST() {
  try {
    const result = await syncGoogleSheets();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const lastSync = await getLastSyncStatus();
    return NextResponse.json({ lastSync });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get sync status' },
      { status: 500 }
    );
  }
}
