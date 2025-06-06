import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const project = req.nextUrl.searchParams.get('project');
  if (!project) return NextResponse.json({ error: 'project gid required' }, { status: 400 });

  const res = await fetch(
    `https://app.asana.com/api/1.0/projects/${project}/tasks`,
    { headers: { Authorization: `Bearer ${process.env.ASANA_PAT}` } }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
