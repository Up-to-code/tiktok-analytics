import React from 'react';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { TikTokUser } from '../types/tiktok';

interface ProfileCardProps {
  userData?: TikTokUser | null;
  loading?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ userData, loading = false }) => {
  if (loading) {
    return (
      <div className="border rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-3 flex-1">
            <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Early return if required data is missing
  if (!userData?.userInfo?.user) {
    return (
      <div className="border rounded-lg p-6">
        <div className="text-center text-gray-500">
          User information not available
        </div>
      </div>
    );
  }

  const { user } = userData.userInfo;

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <motion.img
          whileHover={{ scale: 1.05 }}
          className="h-24 w-24 rounded-full object-cover"
          src={user.avatarLarger || '/default-avatar.png'} // Add a default avatar fallback
          alt={user.nickname || 'User'}
        />
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold">
              {user.nickname || 'Anonymous User'}
            </h2>
            {user.verified && (
              <FiAward className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <p className="text-gray-500">@{user.uniqueId || 'unknown'}</p>
          {user.signature && (
            <p className="mt-2 max-w-2xl">
              {user.signature}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 