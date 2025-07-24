// app/api/gold/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
    console.log('Fetching gold rate...');
  const res = await fetch('https://www.goldapi.io/api/XAU/INR', {
    headers: {
      'x-access-token': process.env.GOLD_API_KEY || '',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch gold rate' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({
...data,
  });
}
