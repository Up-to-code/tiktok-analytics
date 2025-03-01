import React from 'react';
import { FiAward } from 'react-icons/fi';
import { TikTokFollower } from '../types/tiktok';

interface FollowersListProps {
  followers: TikTokFollower[];
  loadingFollowers: boolean;
  formatNumber: (num: number) => string;
}

export const FollowersList: React.FC<FollowersListProps> = ({ followers, loadingFollowers, formatNumber }) => {
  if (loadingFollowers) {
    return <div className="text-center py-4">Loading followers...</div>;
  }

  if (!followers.length) {
    return <div className="text-center py-4">No followers data available</div>;
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Followers List</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {followers.map((follower) => (
          <div key={follower.user.id} className="flex items-start p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
            <img
              src={follower.user.avatarLarger}
              alt={follower.user.nickname}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-lg">{follower.user.nickname}</h4>
                    {follower.user.verified && (
                      <FiAward className="h-5 w-5 text-blue-500" />
                    )}
                    {follower.user.privateAccount && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Private</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">@{follower.user.uniqueId}</p>
                </div>
              </div>
              
              {follower.user.signature && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{follower.user.signature}</p>
              )}
              
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-gray-50 rounded p-2">
                  <p className="font-semibold text-blue-600">{formatNumber(follower.stats.followerCount)}</p>
                  <p className="text-gray-500 text-xs">Followers</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="font-semibold text-blue-600">{formatNumber(follower.stats.followingCount)}</p>
                  <p className="text-gray-500 text-xs">Following</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="font-semibold text-blue-600">{formatNumber(follower.stats.heartCount || follower.stats.diggCount || 0)}</p>
                  <p className="text-gray-500 text-xs">Likes</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 