
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
    
    // For simplicity, edit also uses the primary key. If needed, this could also use the pool.
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
      throw new Error('Image editing failed.');
    }

    return {imageUrl: media.url};
  }
);
