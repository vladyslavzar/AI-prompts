"use client";

import { useState, useEffect, useRef } from 'react';
import PromptCard from './PromptCard';

interface Post {
  _id: string;
  prompt: string;
  tag: string;
  creator: {
    image: string;
    username: string;
    email: string;
    _id: string;
  };
}

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  )
}

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}; 

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const debouncedSearchText = useDebounce(searchText, 500);
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

  }

  useEffect(() => {
    if (debouncedSearchText) {
      const fetchPosts = async () => {
        const response = await fetch(`/api/prompt/search/${debouncedSearchText}/posts`);
        const data = await response.json();
        console.log(data, 'DATA');

        setPosts(data);
      }

      fetchPosts();
      return;
    }
    

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, [debouncedSearchText])

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input 
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
};

export default Feed
