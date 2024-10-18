"use client";

import { useState, useEffect } from 'react';
import Profile from '@/components/Profile';
import { useParams } from 'next/navigation';
import { Post } from '@/app/types';

const UserProfile = () => {
  const { userId } = useParams()
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if(userId) fetchPosts();
  }, [userId])

  return (
    <Profile
      name={`${posts[0]?.creator.username}`}
      desc={`Welcome to ${posts[0]?.creator.username}'s profile`}
      data={posts}
    />
  )
};

export default UserProfile;
