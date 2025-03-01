"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TikTokUser, StatCardProps, TikTokFollower, TikTokPost } from './types/tiktok';
import { FiAward, FiHeart, FiMusic, FiPlay } from 'react-icons/fi';

export default function TikTokAnalysisTool() {
  const [username, setUsername] = useState<string>('ahmed_psychologyhub');
  const [userData, setUserData] = useState<TikTokUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'followers' | 'followings' | 'posts'>('overview');
  const [followers, setFollowers] = useState<TikTokFollower[]>([]);
  const [followings, setFollowings] = useState<TikTokFollower[]>([]);
  const [posts, setPosts] = useState<TikTokPost[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState<boolean>(false);
  const [loadingFollowings, setLoadingFollowings] = useState<boolean>(false);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);

  const fetchUserData = async (username: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tiktok?username=${username}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowers = async (secUid: string): Promise<void> => {
    setLoadingFollowers(true);
    try {
      const response = await fetch(`/api/tiktok/followers?secUid=${secUid}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setFollowers(data.followers || []);
    } catch (err) {
      console.error('Error fetching followers:', err);
    } finally {
      setLoadingFollowers(false);
    }
  };

  const fetchFollowings = async (secUid: string): Promise<void> => {
    setLoadingFollowings(true);
    try {
      const response = await fetch(`/api/tiktok/followings?secUid=${secUid}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setFollowings(data.followings || []);
    } catch (err) {
      console.error('Error fetching followings:', err);
    } finally {
      setLoadingFollowings(false);
    }
  };

  const fetchPosts = async (secUid: string): Promise<void> => {
    setLoadingPosts(true);
    try {
      const response = await fetch(`/api/tiktok/posts?secUid=${secUid}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setPosts(data.itemList || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, []);

  useEffect(() => {
    if (userData?.userInfo?.user?.secUid) {
      if (activeTab === 'followers') {
        fetchFollowers(userData.userInfo.user.secUid);
      } else if (activeTab === 'followings') {
        fetchFollowings(userData.userInfo.user.secUid);
      } else if (activeTab === 'posts') {
        fetchPosts(userData.userInfo.user.secUid);
      }
    }
  }, [userData?.userInfo?.user?.secUid, activeTab]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username);
    }
  };

  const formatNumber = (num: number): string => {
    return num >= 1000000 
      ? (num / 1000000).toFixed(1) + 'M' 
      : num >= 1000 
        ? (num / 1000).toFixed(1) + 'K' 
        : num.toString();
  };

  // Calculate engagement rate (likes per video)
  // Calculate average likes per video
  
  // Calculate follower-to-following ratio

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-500">
                TikTok Analytics
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ color: '#9CA3AF' }}>
                  @
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--background-color)',
                    borderColor: '#E5E7EB'
                  }}
                  placeholder="Enter TikTok username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-lg"
                style={{ 
                  backgroundColor: '#3B82F6',
                  color: '#ffffff'
                }}
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </form>
          </div>
        </motion.div>

        {error && (
          <div className="border rounded-lg px-4 py-3 mb-6 border-red-500 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {userData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <ProfileCard userData={userData} />
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('followers')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'followers' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => setActiveTab('followings')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'followings' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Following
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Posts
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <StatsGrid 
                userData={userData} 
                formatNumber={formatNumber}
              />
            )}

            {activeTab === 'followers' && (
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Followers List</h3>
                {loadingFollowers ? (
                  <div className="text-center py-4">Loading followers...</div>
                ) : followers.length > 0 ? (
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
                ) : (
                  <div className="text-center py-4">No followers data available</div>
                )}
              </div>
            )}

            {activeTab === 'followings' && (
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-4">Following List</h3>
                {loadingFollowings ? (
                  <div className="text-center py-4">Loading followings...</div>
                ) : followings.length > 0 ? (
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
                ) : (
                  <div className="text-center py-4">No followings data available</div>
                )}
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                {loadingPosts ? (
                  <div className="text-center py-4">Loading posts...</div>
                ) : posts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post: TikTokPost) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ scale: 1.02 }}
                        className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-[9/16] overflow-hidden">
                          {post.video?.cover && (
                            <img
                              src={post.video.cover}
                              alt={post.desc}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <FiPlay className="h-12 w-12 text-white" />
                          </div>
                          {/* Stats overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                            <div className="flex items-center space-x-3 text-white">
                              <div className="flex items-center space-x-1">
                                <FiHeart className="h-4 w-4" />
                                <span className="text-sm">{formatNumber(post.stats.diggCount || 0)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiPlay className="h-4 w-4" />
                                <span className="text-sm">{formatNumber(post.stats.playCount || 0)}</span>
                              </div>
                            </div>
                          </div>
                          {/* Duration badge */}
                          {post.video?.duration && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                              {Math.floor(post.video.duration / 60)}:{(post.video.duration % 60).toString().padStart(2, '0')}
                            </div>
                          )}
                        </div>
                        
                        {/* Post info */}
                        <div className="p-3 space-y-2">
                          <p className="text-gray-900 text-sm line-clamp-2">{post.desc}</p>
                          
                          {post.music && (
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <FiMusic className="h-3 w-3 animate-spin-slow" />
                              <span className="truncate">{post.music.title} - {post.music.authorName}</span>
                            </div>
                          )}
                          
                          {post.textExtra && post.textExtra.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.textExtra.map((extra, index) => (
                                extra.hashtagName && (
                                  <span key={index} className="text-blue-500 text-xs hover:underline">
                                    #{extra.hashtagName}
                                  </span>
                                )
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">No posts available</div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

const ProfileCard: React.FC<{ userData: TikTokUser }> = ({ userData }) => (
  <div className="border rounded-lg p-6">
    <div className="flex items-center space-x-6">
      <motion.img
        whileHover={{ scale: 1.05 }}
        className="h-24 w-24 rounded-full object-cover"
        src={userData.userInfo.user.avatarLarger}
        alt={userData.userInfo.user.nickname}
      />
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">
            {userData.userInfo.user.nickname}
          </h2>
          {userData.userInfo.user.verified && (
            <FiAward className="h-5 w-5 text-blue-500" />
          )}
        </div>
        <p className="text-gray-500">@{userData.userInfo.user.uniqueId}</p>
        <p className="mt-2 max-w-2xl">
          {userData.userInfo.user.signature}
        </p>
      </div>
    </div>
  </div>
);

interface StatsGridProps {
  userData: TikTokUser;
  formatNumber: (num: number) => string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ userData, formatNumber }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <StatCard
      label="Followers"
      value={formatNumber(userData.userInfo.stats.followerCount)}
      className="border rounded-lg"
    />
    <StatCard
      label="Following"
      value={formatNumber(userData.userInfo.stats.followingCount)}
      className="border rounded-lg"
    />
    <StatCard
      label="Total Likes"
      value={formatNumber(userData.userInfo.stats.heartCount)}
      className="border rounded-lg"
    />
    <StatCard
      label="Videos"
      value={userData.userInfo.stats.videoCount}
      className="border rounded-lg"
    />
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ label, value, className }) => (
  <div className={`p-6 ${className}`}>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

// Add Excel-like DataTable component
