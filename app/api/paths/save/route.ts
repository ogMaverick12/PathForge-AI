import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { profile, results } = await req.json();

    if (!profile || !results) {
      return NextResponse.json({ error: 'Missing profile or results data' }, { status: 400 });
    }

    // Save is handled client-side via localStorage in the dashboard
    // This endpoint exists as a future hook for when Prisma/Supabase is re-enabled
    // For now, return success so the UI flow works
    return NextResponse.json({ 
      success: true, 
      message: 'Profile saved to local storage. Cloud persistence will be enabled in a future update.'
    });

  } catch (error) {
    console.error('Save Path Error:', error);
    return NextResponse.json({ error: 'Failed to save path' }, { status: 500 });
  }
}
