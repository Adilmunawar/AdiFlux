
import { config } from 'dotenv';
config();

// This file is used for local development only.
// It is not needed for the production build.
import './flows/suggest-style-prompt';
import './flows/generate-image-flow';
import './flows/upscale-prompt-flow';
import './flows/upscale-image-flow';
import './flows/edit-image-flow';
