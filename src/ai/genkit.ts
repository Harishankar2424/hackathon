import {genkit} from 'genkit';
import {googleAI, gemini15Flash} from '@genkit-ai/googleai';
import next from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI(),
    next(),
  ],
  defaultModel: gemini15Flash,
});
