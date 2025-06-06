import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(
    'https://app.asana.com/api/1.0/tasks',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.ASANA_PAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          ...body,
          workspace: '1210484205723058',   // required unless you pass `projects`
        }
      })
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : 400 });
}
