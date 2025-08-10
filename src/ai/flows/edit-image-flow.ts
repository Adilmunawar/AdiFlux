
'use server';

/**
 * @fileOverview A Genkit flow that edits an image based on a text prompt.
 *
 * - editImage - A function that modifies an image based on a prompt.
 * - EditImageInput - The input type for the editImage function.
 * - EditImageOutput - The return type for the editImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { genkit } from 'genkit';

const EditImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt describing the desired edits.'),
  image: z.string().describe("A data URI of the image to edit. It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type EditImageInput = z.infer<typeof EditImageInputSchema>;

const EditImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the edited image.'),
});
export type EditImageOutput = z.infer<typeof EditImageOutputSchema>;

export async function editImage(input: EditImageInput): Promise<EditImageOutput> {
  return editImageFlow(input);
}

// Simple round-robin for API keys
let apiKeyIndex = 0;
const apiKeys = [
  'AIzaSyBE-SkmQO-yqDyn51HaenX8Xw3BCLjCcM0',
  'AIzaSyC_cnrlsxeIx7i3MjIe5rl9QFbyk0qKlgA',
  'AIzaSyDkCxExhTKwUAASINusHXMAFDZAhsLhC40',
  'AIzaSyCrosJpaddyi6Upxj0bnApPT-spZUh2yMs',
  'AIzaSyBa2T4Kb2Mty6vSdoQ9NKDPCCNb6SIbFjk'
];

function getNextApiKey() {
  if (apiKeys.length === 0) {
    return undefined;
  }
  const key = apiKeys[apiKeyIndex];
  apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
  return key;
}

const editImageFlow = ai.defineFlow(
  {
    name: 'editImageFlow',
    inputSchema: EditImageInputSchema,
    outputSchema: EditImageOutputSchema,
  },
  async ({prompt, image}) => {
    
    const finalPrompt = [
        {media: {url: image}},
        {text: prompt},
    ];

    const apiKey = getNextApiKey();
    if (!apiKey) {
      throw new Error('No API keys are available in the hardcoded list.');
    }
    
    const customAI = genkit({
      plugins: [googleAI({ apiKey })],
    });

    const {media} = await customAI.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: finalPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image editing failed.');
    }

    return {imageUrl: media.url};
  }
);
