import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiPlay, FiMusic } from 'react-icons/fi';
import { TikTokPost } from '../types/tiktok';

interface PostsListProps {
  posts: TikTokPost[];
  loadingPosts: boolean;
  formatNumber: (num: number) => string;
}

export const PostsList: React.FC<PostsListProps> = ({ posts, loadingPosts, formatNumber }) => {
  if (loadingPosts) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (!posts.length) {
    return <div className="text-center py-4">No posts available</div>;
  }

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
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
    </div>
  );
}; 