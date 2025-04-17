import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') ?? '';

  const res = await fetch(
    `http://localhost:3001/autocomplete?query=${encodeURIComponent(query)}`
  );
  const json = await res.json();
  return NextResponse.json(json);
}