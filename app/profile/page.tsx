"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { DefaultSession } from 'next-auth';
import {Post} from '@/app/types';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
    };
  }
}

import Profile from '@/components/Profile';

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if(session?.user.id) fetchPosts();
  }, [session?.user.id])



  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setPosts(posts.filter((p: Post) => p._id !== post._id));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your pesonalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
};

export default MyProfile;
