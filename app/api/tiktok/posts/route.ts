import { NextResponse } from 'next/server';
import axios from 'axios';
import { TikTokPost } from '@/app/types/tiktok';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secUid = searchParams.get('secUid');
  const count = searchParams.get('count') || '35';
  const cursor = searchParams.get('cursor') || '0';

  if (!secUid) {
    return NextResponse.json({ error: 'secUid is required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://tiktok-api23.p.rapidapi.com/api/user/posts', {
      params: {
        secUid,
        count,
        cursor
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'b3ea33a726msh89aa9258f7eccc2p1d4e94jsn2a1f22dcbdcd',
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
      }
    });

    const data = response.data;
     return NextResponse.json({
      cursor: data.data.cursor,
      hasMore: data.data.hasMore,
      itemList: data.data.itemList as TikTokPost[]
    });
  } catch (error) {
    console.error('Error fetching TikTok posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TikTok posts' },
      { status: 500 }
    );
  }
} 