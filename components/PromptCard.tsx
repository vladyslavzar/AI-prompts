"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Post } from "@/app/types";

interface PromptCardProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const handleCreatorClick = () => {
    router.push(`/profile/${post.creator._id}`);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleCreatorClick}>
          <Image
            src={post.creator.image || '/assets/images/default-profile.svg'}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-grey-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
              alt="Copy button"
              width={12}
              height={12}
            />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="flex gap-3 mt-5">
          <button 
            className="outline_btn"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button 
            className="outline_btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
};

export default PromptCard
