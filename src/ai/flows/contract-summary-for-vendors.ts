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
  summary: z.string().describe('A concise summary of the contract.'),
  keyStatistics: z
    .string()
    .describe(
      'Key statistics from the contract presented in a tabular format, including: Exclusive/Non-Exclusive Rights, Territory & Sales Scope, Pricing & Payment Terms, Minimum Sales or Purchase Requirements, Intellectual Property & Brand Use, Term, Renewal & Termination, Confidentiality & Non-Compete.'
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
  prompt: `You are an AI assistant helping vendors quickly understand key aspects of their contracts.

  Your task is to summarize the contract provided and extract key statistics into a tabular format.

  Contract: {{{contractText}}}

  Summary:
  Key Statistics (Tabular Format):
  `,
});

const summarizeContractFlow = ai.defineFlow(
  {
    name: 'summarizeContractFlow',
    inputSchema: SummarizeContractInputSchema,
    outputSchema: SummarizeContractOutputSchema,
  },
  async input => {
    const {output} = await summarizeContractPrompt.generate(input);
    return output!;
  }
);
