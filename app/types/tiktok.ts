export interface TikTokUser {
  userInfo: {
    user: {
      id: string;
      uniqueId: string;
      nickname: string;
      avatarLarger: string;
      signature: string;
      verified: boolean;
      secUid: string;
    };
    stats: {
      followerCount: number;
      followingCount: number;
      heartCount: number;
      videoCount: number;
    };
  };
  statusCode: number;
  statusMsg: string;
}

export interface TikTokFollower {
  stats: {
    diggCount: number;
    followerCount: number;
    followingCount: number;
    friendCount: number;
    heart: number;
    heartCount: number;
    videoCount: number;
  };
  user: {
    id: string;
    uniqueId: string;
    nickname: string;
    avatarLarger: string;
    avatarMedium: string;
    avatarThumb: string;
    signature: string;
    verified: boolean;
    secUid: string;
    secret: boolean;
    ftc: boolean;
    isADVirtual: boolean;
    openFavorite: boolean;
    privateAccount: boolean;
    relation: number;
    downloadSetting: number;
    duetSetting?: number;
    stitchSetting?: number;
    commentSetting?: number;
    ttSeller?: boolean;
  };
}

export interface AnalyticsData {
  daily: {
    date: string;
    followers: number;
    likes: number;
    views: number;
  }[];
  trends: {
    followersGrowth: number;
    engagementRate: number;
    avgLikesPerVideo: number;
  };
}

export interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export interface TikTokPost {
  id: string;
  desc: string;
  createTime: number;
  author: TikTokPostAuthor;
  authorStats: Record<string, unknown>;
  stats: TikTokPostStats;
  statsV2: TikTokPostStats;
  video: TikTokVideo;
  music: TikTokMusic;
  textExtra: TikTokTextExtra[];
  challenges: TikTokChallenge[];
  duetEnabled: boolean;
  stitchEnabled: boolean;
  shareEnabled: boolean;
  isAd: boolean;
  collected: boolean;
  duetDisplay: number;
  stitchDisplay: number;
  itemCommentStatus: number;
  diversificationId: string;
  forFriend: boolean;
  digged: boolean;
  itemControl: Record<string, unknown>;
  AIGCDescription: string;
  CategoryType: number;
  HasPromoteEntry: number;
  textLanguage: string;
  textTranslatable: boolean;
  contents: string[];
  backendSourceEventTracking: string;
  officalItem: boolean;
  originalItem: boolean;
  privateItem: boolean;
  secret: boolean;
  videoSuggestWordsList: string[];
}

export interface TikTokPostAuthor {
  id: string;
  uniqueId: string;
  nickname: string;
  avatarThumb: string;
  avatarMedium: string;
  avatarLarger: string;
  signature: string;
  verified: boolean;
  secUid: string;
  secret: boolean;
  ftc: boolean;
  relation: number;
  openFavorite: boolean;
  commentSetting: number;
  duetSetting: number;
  stitchSetting: number;
  privateAccount: boolean;
  isEmbedBanned: boolean;
  downloadSetting: number;
}

export interface TikTokPostStats {
  commentCount?: number;
  diggCount?: number;
  playCount?: number;
  shareCount?: number;
  collectCount?: number;
}

export interface TikTokVideo {
  id?: string;
  cover?: string;
  playAddr?: string;
  downloadAddr?: string;
  duration?: number;
  width?: number;
  height?: number;
  ratio?: string;
  dynamicCover?: string;
  originCover?: string;
}

export interface TikTokMusic {
  id?: string;
  title?: string;
  authorName?: string;
  playUrl?: string;
  coverLarge?: string;
  coverMedium?: string;
  coverThumb?: string;
  duration?: number;
  album?: string;
}

export interface TikTokTextExtra {
  awemeId?: string;
  start?: number;
  end?: number;
  hashtagName?: string;
  hashtagId?: string;
  type?: number;
  userId?: string;
  isCommerce?: boolean;
  userUniqueId?: string;
  secUid?: string;
}

export interface TikTokChallenge {
  id?: string;
  title?: string;
  desc?: string;
  profileLarger?: string;
  profileMedium?: string;
  profileThumb?: string;
  coverLarge?: string;
  coverMedium?: string;
  coverThumb?: string;
  isCommerce?: boolean;
}

export interface TikTokPostsResponse {
  cursor: string;
  hasMore: boolean;
  itemList: TikTokPost[];
}

export interface TikTokUserResponse {
  id: string;
  uniqueId: string;
  nickname: string;
  avatarLarger: string;
  avatarMedium: string;
  signature: string;
  verified: boolean;
  secUid: string;
  privateAccount: boolean;
  stats?: {
    followerCount: number;
    followingCount: number;
    heartCount: number;
    diggCount: number;
  };
} 