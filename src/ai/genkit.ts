import {genkit, type GenkitErrorCode, type GenkitError} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import next from '@genkit-ai/next';

// This will use the GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY environment variable by default.
export const ai = genkit({
  plugins: [
    googleAI(),
    next({
      // We are not using the Next.js plugin for auth.
      auth: async () => {},
    }),
  ],
  // We can also configure Genkit to log to a file or other service.
  // logSinker: (log) => { console.log(log) },
  enableTracing: true, // Enable tracing for debugging.
  // This is a custom error handler that will be called when a flow throws an error.
  // We can use this to log the error to a service like Sentry or to customize the error response.
  errorHandler: (err: GenkitError) => {
    const code: GenkitErrorCode = err.code || 'internal';

    // By default, we will just log the error to the console.
    console.error(err);

    // We can also return a custom error message to the user.
    return {
      code, // The HTTP status code to return.
      message: err.message,
    };
  },
});
