
'use server';

/**
 * @fileOverview A Genkit flow that generates images from a text prompt.
 *
 * - generateImage - A function that generates an image based on a prompt and style.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { upscalePrompt } from './upscale-prompt-flow';
import {googleAI} from '@genkit-ai/googleai';
import { genkit } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt for image generation.'),
  style: z.string().describe('The artistic style for the image.'),
  quality: z.string().optional().describe('The desired quality of the image (e.g., "Standard", "High", "Ultra").'),
  upscale: z.boolean().optional().describe('Whether to upscale the generated image.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const qualityPrompts = {
  Standard: 'A good quality image.',
  High: 'A high-quality, detailed image.',
  Ultra: 'A masterpiece image with hyper-detailed, photorealistic, and cinematic qualities. Emphasize intricate details, professional lighting, and advanced rendering techniques for a breathtaking and visually stunning result. The art direction should be at a professional level, 8k resolution.',
};

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

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({prompt, style, quality = 'High', upscale = false}) => {
    
    // First, upscale the user's prompt to be more descriptive.
    const { upscaledPrompt } = await upscalePrompt({ prompt });
    
    const qualityPrompt = qualityPrompts[quality as keyof typeof qualityPrompts] || qualityPrompts.High;
    const finalPrompt = `${qualityPrompt}
      Style: ${style}.
      Prompt: ${upscaledPrompt}.
      ${upscale ? 'The image should be upscaled to a higher resolution.' : ''}
    `;

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
      throw new Error('Image generation failed.');
    }

    return {imageUrl: media.url};
  }
);
