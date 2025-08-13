// IMPORTANT: This file is used to expose the Genkit flows as API endpoints.
// It should not be modified, as it will be managed by the Genkit CLI.
import next from '@genkit-ai/next';
import '@/ai/flows/suggest-style-prompt';
import '@/ai/flows/generate-image-flow';
import '@/ai/flows/upscale-prompt-flow';
import '@/ai/flows/upscale-image-flow';
import '@/ai/flows/edit-image-flow';

export const POST = next();
