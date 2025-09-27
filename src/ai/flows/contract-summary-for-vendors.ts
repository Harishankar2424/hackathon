
'use server';

/**
 * @fileOverview Summarizes key points of a contract and presents the main statistics in a tabular format for vendors.
 *
 * - summarizeContract - A function that handles the contract summarization process.
 * - SummarizeContractInput - The input type for the summarizeContract function.
 * - SummarizeContractOutput - The return type for the summarizeContract function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContractInputSchema = z.object({
  contractText: z
    .string()
    .describe('The full text of the contract to be summarized.'),
});
export type SummarizeContractInput = z.infer<typeof SummarizeContractInputSchema>;

const SummarizeContractOutputSchema = z.object({
  summary: z.string().describe('A concise, easy-to-read summary of the entire contract, highlighting the most critical aspects for a distributor to consider.'),
  keyStatistics: z
    .string()
    .describe(
      'Key statistics from the contract presented in a markdown tabular format. The table should include rows for: Exclusive/Non-Exclusive Rights, Territory & Sales Scope, Pricing & Payment Terms, Minimum Sales or Purchase Requirements, Intellectual Property & Brand Use, Term, Renewal & Termination, and Confidentiality & Non-Compete.'
    ),
});
export type SummarizeContractOutput = z.infer<typeof SummarizeContractOutputSchema>;

export async function summarizeContract(input: SummarizeContractInput): Promise<SummarizeContractOutput> {
  return summarizeContractFlow(input);
}

const summarizeContractPrompt = ai.definePrompt({
  name: 'summarizeContractPrompt',
  input: {schema: SummarizeContractInputSchema},
  output: {schema: SummarizeContractOutputSchema},
  model: 'googleai/gemini-2.5-pro',
  prompt: `You are an expert AI legal assistant specializing in B2B distribution agreements. Your task is to help potential distributors quickly understand the key terms of a contract offer by summarizing the contract details.

  Analyze the following contract text and perform two tasks:
  1.  **Write a Summary:** Create a clear and concise summary (3-4 sentences) that explains the core purpose and most important obligations or benefits for the distributor.
  2.  **Extract Key Statistics:** Pull out the specific details for the aspects listed below and format them into a clean markdown table. If a detail is not explicitly mentioned, state "Not Specified".

  **Contract Text:**
  {{{contractText}}}
  `,
});

const summarizeContractFlow = ai.defineFlow(
  {
    name: 'summarizeContractFlow',
    inputSchema: SummarizeContractInputSchema,
    outputSchema: SummarizeContractOutputSchema,
  },
  async input => {
    const {output} = await summarizeContractPrompt(input);
    return output!;
  }
);
