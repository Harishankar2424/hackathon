'use server';

/**
 * @fileOverview An AI agent that analyzes distributor details and product information to provide vendor suggestions.
 *
 * - aiPoweredDistributorVetting - A function that handles the distributor vetting process.
 * - AIPoweredDistributorVettingInput - The input type for the aiPoweredDistributorVetting function.
 * - AIPoweredDistributorVettingOutput - The return type for the aiPoweredDistributorVetting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredDistributorVettingInputSchema = z.object({
  distributorDetails: z
    .string()
    .describe('Details of the distributor including region, trustworthiness, and work history.'),
  productInfo: z.string().describe('Information about the product.'),
  companyDatabase: z.string().describe('Company database info about product'),
  region: z.string().describe('Region the distributor is from.'),
});
export type AIPoweredDistributorVettingInput = z.infer<
  typeof AIPoweredDistributorVettingInputSchema
>;

const AIPoweredDistributorVettingOutputSchema = z.object({
  suggestedOptions: z
    .string()
    .describe('Suggested options for the vendor regarding the distributor.'),
  trustworthinessAssessment: z
    .string()
    .describe('AI assessment of the distributor trustworthiness.'),
  suitabilityScore: z
    .number()
    .describe('A score indicating the distributor suitability for the product.'),
});
export type AIPoweredDistributorVettingOutput = z.infer<
  typeof AIPoweredDistributorVettingOutputSchema
>;

export async function aiPoweredDistributorVetting(
  input: AIPoweredDistributorVettingInput
): Promise<AIPoweredDistributorVettingOutput> {
  return aiPoweredDistributorVettingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredDistributorVettingPrompt',
  input: {schema: AIPoweredDistributorVettingInputSchema},
  output: {schema: AIPoweredDistributorVettingOutputSchema},
  prompt: `You are an AI agent specializing in vetting distributors for vendors.

You will analyze the distributor details, cross-reference them with the product information, and provide suggested options for the vendor.

Distributor Details: {{{distributorDetails}}}
Product Information: {{{productInfo}}}
Company Database Info: {{{companyDatabase}}}
Region: {{{region}}}

Based on this information, provide a trustworthiness assessment, a suitability score (0-100), and suggested options for the vendor.`,
});

const aiPoweredDistributorVettingFlow = ai.defineFlow(
  {
    name: 'aiPoweredDistributorVettingFlow',
    inputSchema: AIPoweredDistributorVettingInputSchema,
    outputSchema: AIPoweredDistributorVettingOutputSchema,
  },
  async input => {
    const {output} = await prompt.generate(input);
    return output!;
  }
);
