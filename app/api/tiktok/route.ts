/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { TikTokUser } from '@/app/types/tiktok';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(
      `https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=${username}`,
      options
    );
  
    const data: TikTokUser = await response.json();
    console.log(data , 'data');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch TikTok data' },
      { status: 500 }
    );
  }
} 