import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secUid = searchParams.get('secUid');
   const count = searchParams.get('count') || '30';
  const minCursor = searchParams.get('minCursor') || '0';

  if (!secUid) {
    return NextResponse.json({ error: 'secUid is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://tiktok-api23.p.rapidapi.com/api/user/followers`, {
      params: {
        secUid,
        count,
        minCursor
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'b3ea33a726msh89aa9258f7eccc2p1d4e94jsn2a1f22dcbdcd',
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
      }
    });
     return NextResponse.json({
      statusCode: response.data.statusCode,
      minCursor: response.data.minCursor,
      hasMore: response.data.hasMore,
      total: response.data.total,
      followers: response.data.userList || []
    });
  } catch (error) {
    console.error('Error fetching TikTok followers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TikTok followers' },
      { status: 500 }
    );
  }
} 