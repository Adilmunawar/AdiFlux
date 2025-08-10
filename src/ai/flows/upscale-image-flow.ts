
'use server';

/**
 * @fileOverview A Genkit flow that upscales an existing image.
 *
 * - upscaleImage - A function that takes an image URL and returns an upscaled version.
 * - UpscaleImageInput - The input type for the upscaleImage function.
 * - UpscaleImageOutput - The return type for the upscaleImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkit} from 'genkit';

const UpscaleImageInputSchema = z.object({
  imageUrl: z.string().describe("A data URI of the image to upscale. It must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type UpscaleImageInput = z.infer<typeof UpscaleImageInputSchema>;

const UpscaleImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the upscaled image.'),
});
export type UpscaleImageOutput = z.infer<typeof UpscaleImageOutputSchema>;

export async function upscaleImage(input: UpscaleImageInput): Promise<UpscaleImageOutput> {
  return upscaleImageFlow(input);
}

const upscaleImageFlow = ai.defineFlow(
  {
    name: 'upscaleImageFlow',
    inputSchema: UpscaleImageInputSchema,
    outputSchema: UpscaleImageOutputSchema,
  },
  async ({imageUrl}) => {
    
    const finalPrompt = [
        {media: {url: imageUrl}},
        {text: 'Upscale this image to a higher resolution, enhancing details and clarity. Make it photorealistic and 8k resolution.'},
      ]
    
    const customAI = genkit({
        plugins: [googleAI()],
    });

    const {media} = await customAI.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: finalPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image upscaling failed.');
    }

    return {imageUrl: media.url};
  }
);
