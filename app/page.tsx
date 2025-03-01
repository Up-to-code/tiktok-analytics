"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TikTokUser, TikTokFollower, TikTokPost } from './types/tiktok';
import { ProfileCard } from './components/ProfileCard';
import { StatsGrid } from './components/Stats';
import { FollowersList } from './components/FollowersList';
import { FollowingList } from './components/FollowingList';
import { PostsList } from './components/PostsList';

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ProfileCard userData={userData} loading={loading} />
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
              loading={loading}
            />
          )}

          {activeTab === 'followers' && (
            <FollowersList
              followers={followers}
              loadingFollowers={loadingFollowers}
              formatNumber={formatNumber}
            />
          )}

          {activeTab === 'followings' && (
            <FollowingList
              followings={followings}
              loadingFollowings={loadingFollowings}
              formatNumber={formatNumber}
            />
          )}

          {activeTab === 'posts' && (
            <PostsList
              posts={posts}
              loadingPosts={loadingPosts}
              formatNumber={formatNumber}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
