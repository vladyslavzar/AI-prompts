
import PromptCard from "./PromptCard";

import { FC } from "react";

interface ProfileProps {
  name: string;
  desc: string;
  data: Array<{ _id: string; prompt: string; tag: string; creator: { image: string; username: string; email: string; _id: string } }>;
  handleEdit?: (post: { _id: string; [key: string]: unknown }) => void;
  handleDelete?: (post: { _id: string; [key: string]: unknown }) => void;
}

const Profile: FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
};

export default Profile
