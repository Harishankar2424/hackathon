import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import next from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI({
      // Use the full model name string for the default model
      model: 'googleai/gemini-2.5-flash', 
    }),
    next(),
  ],
});
