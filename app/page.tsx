import Feed from "@/components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="min-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod veniam doloremque dolore doloribus molestiae ad, asperiores placeat deleniti eius repellat natus enim dolorum itaque, accusamus, optio unde. Error, molestiae expedita.
      </p>

      <Feed/>
    </section>
  )
};


export default Home;