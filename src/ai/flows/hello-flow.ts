'use server';

import {ai} from '@/ai/genkit';

const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
  },
  async name => {
    // make a generation request
    const {output} = await ai.generate({prompt: `Hello Gemini, my name is ${name}`});
    console.log(output);
  }
);

helloFlow('Chris');

export {helloFlow};
