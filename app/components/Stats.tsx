import React from 'react';
import { TikTokUser } from '../types/tiktok';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, className, loading = false }) => (
  <div className={`p-6 ${className}`}>
    {loading ? (
      <>
        <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
      </>
    ) : (
      <>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </>
    )}
  </div>
);

interface StatsGridProps {
  userData?: TikTokUser | null;
  formatNumber: (num: number) => string;
  loading?: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ userData, formatNumber, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <StatCard
            key={index}
            label=""
            value=""
            loading={true}
            className="border rounded-lg"
          />
        ))}
      </div>
    );
  }

  // Early return if required data is missing
  if (!userData?.userInfo?.stats) {
    return (
      <div className="text-center text-gray-500 p-6">
        Statistics not available
      </div>
    );
  }

  const { stats } = userData.userInfo;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Followers"
        value={formatNumber(stats.followerCount || 0)}
        className="border rounded-lg"
      />
      <StatCard
        label="Following"
        value={formatNumber(stats.followingCount || 0)}
        className="border rounded-lg"
      />
      <StatCard
        label="Total Likes"
        value={formatNumber(stats.heartCount || 0)}
        className="border rounded-lg"
      />
      <StatCard
        label="Videos"
        value={stats.videoCount || 0}
        className="border rounded-lg"
      />
    </div>
  );
}; 