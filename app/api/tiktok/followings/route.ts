import { NextResponse } from 'next/server';
import axios from 'axios';
import { TikTokUserResponse } from '@/app/types/tiktok';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secUid = searchParams.get('secUid');
  const count = searchParams.get('count') || '30';
  const cursor = searchParams.get('cursor') || '0';

  if (!secUid) {
    return NextResponse.json({ error: 'secUid is required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://tiktok-api23.p.rapidapi.com/api/user/followings', {
      params: {
        secUid,
        count,
        minCursor: cursor,
        maxCursor: cursor
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'b3ea33a726msh89aa9258f7eccc2p1d4e94jsn2a1f22dcbdcd',
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
      }
    });

    // Extract userList from the response and format it
    const userList = response.data.data?.userList || [];
    return NextResponse.json({
      followings: userList.map((user: TikTokUserResponse) => ({
        user: {
          id: user.id,
          uniqueId: user.uniqueId,
          nickname: user.nickname,
          avatarLarger: user.avatarLarger,
          avatarMedium: user.avatarMedium,
          signature: user.signature,
          verified: user.verified,
          secUid: user.secUid,
          privateAccount: user.privateAccount
        },
        stats: {
          followerCount: user.stats?.followerCount || 0,
          followingCount: user.stats?.followingCount || 0,
          heartCount: user.stats?.heartCount || 0,
          diggCount: user.stats?.diggCount || 0
        }
      }))
    });
  } catch (error) {
    console.error('Error fetching TikTok followings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TikTok followings' },
      { status: 500 }
    );
  }
} 