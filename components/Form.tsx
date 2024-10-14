import Link from "next/link";

interface FormProps {
  type: 'Create' | 'Edit';
  post: {
    prompt: string;
    tag: string;
  };
  setPost: (post: { prompt: string; tag: string }) => void;
  submiting: boolean;
  handleSumbit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({type, post, setPost, submiting, handleSumbit}: FormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum quam provident quia quod aspernatur blanditiis incidunt nihil et temporibus vel illo cumque dolorem quibusdam nam esse, excepturi voluptatem! Earum, eligendi?
      </p>

      <form 
        onSubmit={handleSumbit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-grey-700">Your AI Prompt</span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder="Write your prompt here..."
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-grey-700">Tag{` `}<span>(#product, #webdevelopment, #idea)</span></span>
          <input 
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-grey-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submiting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submiting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
};

export default Form
