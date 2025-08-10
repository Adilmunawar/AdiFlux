
// src/ai/flows/suggest-style-prompt.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests artistic styles for image generation prompts.
 *
 * - suggestStyle - A function that takes a base prompt and suggests artistic styles.
 * - StyleSuggestionInput - The input type for the suggestStyle function, including the base prompt.
 * - StyleSuggestionOutput - The return type for the suggestStyle function, providing a list of suggested styles.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getNextKey } from '../keys';

const StyleSuggestionInputSchema = z.object({
  basePrompt: z.string().describe('The base prompt for image generation.'),
});
export type StyleSuggestionInput = z.infer<typeof StyleSuggestionInputSchema>;

const StyleSuggestionOutputSchema = z.object({
  suggestedStyles: z.array(z.string()).describe('An array of suggested artistic styles.'),
});
export type StyleSuggestionOutput = z.infer<typeof StyleSuggestionOutputSchema>;

export async function suggestStyle(input: StyleSuggestionInput): Promise<StyleSuggestionOutput> {
  return suggestStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStylePrompt',
  input: {schema: StyleSuggestionInputSchema},
  output: {schema: StyleSuggestionOutputSchema},
  prompt: `You are a creative assistant helping users explore artistic styles for image generation.

  Given the following base prompt: "{{basePrompt}}", suggest a list of 10 diverse and interesting artistic styles that would be suitable for generating images from this prompt.
  Return the styles as a JSON array of strings. Do not include any descriptions or introductory text.
  Example: ["Photorealistic", "Surrealist", "Pop Art", "Abstract Expressionism", "Cyberpunk", "Vintage Photo", "Fantasy Art", "Minimalist", "Oil Painting", "Watercolor"]`,
});

const suggestStyleFlow = ai.defineFlow(
  {
    name: 'suggestStyleFlow',
    inputSchema: StyleSuggestionInputSchema,
    outputSchema: StyleSuggestionOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
        prompt: prompt.compile(input),
        model: 'googleai/gemini-pro',
        output: {
            schema: StyleSuggestionOutputSchema
        },
        auth: {
            apiKey: await getNextKey(),
        }
    });
    return output!;
  }
);
