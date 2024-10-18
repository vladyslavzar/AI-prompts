
import PromptCard from "./PromptCard";
import { Post } from "@/app/types";
import { FC } from "react";

interface ProfileProps {
  name: string;
  desc: string;
  data: Array<Post>;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
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
        {data.length === 0 && (<h2 className="head_text text-left">No prompts found !</h2>)}
      </div>
    </section>
  )
};

export default Profile
