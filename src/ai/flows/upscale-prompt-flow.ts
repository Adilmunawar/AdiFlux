
'use server';

/**
 * @fileOverview A Genkit flow that "upscales" a user's prompt to be more descriptive.
 *
 * - upscalePrompt - A function that enhances a given prompt.
 * - UpscalePromptInput - The input type for the upscalePrompt function.
 * - UpscalePromptOutput - The return type for the upscalePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getNextKey } from '../keys';

const UpscalePromptInputSchema = z.object({
  prompt: z.string().describe('The user-provided prompt to be upscaled.'),
});
export type UpscalePromptInput = z.infer<typeof UpscalePromptInputSchema>;

const UpscalePromptOutputSchema = z.object({
  upscaledPrompt: z.string().describe('The enhanced, more descriptive prompt.'),
});
export type UpscalePromptOutput = z.infer<typeof UpscalePromptOutputSchema>;

export async function upscalePrompt(input: UpscalePromptInput): Promise<UpscalePromptOutput> {
  return upscalePromptFlow(input);
}

const upscalePromptDefinition = ai.definePrompt({
  name: 'upscalePrompt',
  input: {schema: UpscalePromptInputSchema},
  output: {schema: UpscalePromptOutputSchema},
  prompt: `You are an expert prompt engineer for a text-to-image model. 
  Your task is to take a user's simple prompt and expand it into a rich, detailed, and vivid description that will result in a stunning and high-quality image.
  Focus on adding details about the scene, lighting, composition, and artistic style.
  Return only the upscaled prompt text.

  User Prompt: "{{prompt}}"
  `,
  model: 'googleai/gemini-pro',
  auth: {
      apiKey: getNextKey(),
  }
});

const upscalePromptFlow = ai.defineFlow(
  {
    name: 'upscalePromptFlow',
    inputSchema: UpscalePromptInputSchema,
    outputSchema: UpscalePromptOutputSchema,
  },
  async (input) => {
    const {output} = await upscalePromptDefinition(input);
    return output!;
  }
);
