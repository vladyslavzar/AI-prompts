import Prompt from '@/models/prompt';
import {connectToDB} from '@/utils/database';

interface RequestBody {
  userId: string;
  prompt: string;
  tag: string;
}

export const POST = async (req: Request): Promise<Response> => {
  const { userId, prompt, tag }: RequestBody = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}
