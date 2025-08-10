import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-style-prompt.ts';
import '@/ai/flows/generate-image-flow.ts';
import '@/ai/flows/upscale-prompt-flow.ts';
import '@/ai/flows/upscale-image-flow.ts';
