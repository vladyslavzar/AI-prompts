import Prompt from '@/models/prompt';
import {connectToDB} from '@/utils/database';

export const GET = async (request: Request, {params}: { params: { id: string } }) => {
  if (request.method !== 'GET') console.log('Invalid request method');

  try {
    await connectToDB();

    const prompts = await Prompt.find({tag: params.id}).populate('creator');

    return new Response(JSON.stringify(prompts), {status:200})
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch all prompts', {status:500})
  }
}