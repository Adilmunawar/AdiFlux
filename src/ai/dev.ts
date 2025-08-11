
import { config } from 'dotenv';
config();

import './keys';
import '@/ai/flows/suggest-style-prompt';
import '@/ai/flows/generate-image-flow';
import '@/ai/flows/upscale-prompt-flow';
import '@/ai/flows/upscale-image-flow';
import '@/ai/flows/edit-image-flow';
