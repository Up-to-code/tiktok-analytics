import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiMusic } from 'react-icons/fi';
import { TikTokFollower } from '../types/tiktok';

interface FollowingListProps {
  followings: TikTokFollower[];
  loadingFollowings: boolean;
  formatNumber: (num: number) => string;
}

export const FollowingList: React.FC<FollowingListProps> = ({ followings, loadingFollowings, formatNumber }) => {
  if (loadingFollowings) {
    return <div className="text-center py-4">Loading followings...</div>;
  }

  if (!followings.length) {
    return <div className="text-center py-4">No followings data available</div>;
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4">Following List</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {followings.map((following) => (
          <motion.div
            key={following.user.id}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-all bg-white text-center group"
          >
            <div className="relative mb-3">
              <img
                src={following.user.avatarLarger}
                alt={following.user.nickname}
                className="w-24 h-24 rounded-full object-cover group-hover:ring-2 ring-blue-500 transition-all"
              />
              {following.user.verified && (
                <FiAward className="absolute bottom-0 right-0 h-6 w-6 text-blue-500 bg-white rounded-full p-1" />
              )}
            </div>
            
            <div className="w-full space-y-1">
              <h4 className="font-semibold text-sm truncate">
                {following.user.nickname}
              </h4>
              <p className="text-xs text-gray-500 truncate">@{following.user.uniqueId}</p>
              
              {following.user.signature && (
                <p className="text-xs text-gray-600 line-clamp-2 min-h-[2.5rem]">
                  {following.user.signature}
                </p>
              )}
              
              <div className="pt-2 flex justify-center gap-3 text-xs text-gray-500">
                <div>
                  <p className="font-semibold text-gray-900">{formatNumber(following.stats.followerCount)}</p>
                  <p>Followers</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{formatNumber(following.stats.heartCount || following.stats.diggCount || 0)}</p>
                  <p>Likes</p>
                </div>
              </div>
              
              {following.user.privateAccount && (
                <div className="mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Private</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 