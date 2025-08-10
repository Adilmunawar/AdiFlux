import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This will use the GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY environment variable by default.
// We will manage multiple keys within the flow itself.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
