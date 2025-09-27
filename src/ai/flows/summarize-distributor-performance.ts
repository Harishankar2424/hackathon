
'use server';

/**
 * @fileOverview An AI agent that summarizes distributor training performance.
 *
 * - summarizeDistributorPerformance - A function that generates a performance summary.
 * - SummarizeDistributorPerformanceInput - The input type for the function.
 * - SummarizeDistributorPerformanceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerformanceDataSchema = z.object({
  name: z.string().describe('The name of the distributor.'),
  coursesCompleted: z.number().describe('The number of courses the distributor has completed.'),
  averageScore: z.number().describe('The average score achieved by the distributor in completed courses.'),
  progress: z.number().describe('The overall progress percentage across all assigned courses.'),
});

const SummarizeDistributorPerformanceInputSchema = z.object({
  performanceData: PerformanceDataSchema.describe('The performance data for a single distributor.'),
});

export type SummarizeDistributorPerformanceInput = z.infer<typeof SummarizeDistributorPerformanceInputSchema>;

const SummarizeDistributorPerformanceOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise AI-generated summary of the distributor\'s training performance, highlighting strengths, areas for improvement, and overall engagement.'),
});
export type SummarizeDistributorPerformanceOutput = z.infer<typeof SummarizeDistributorPerformanceOutputSchema>;

export async function summarizeDistributorPerformance(
  input: SummarizeDistributorPerformanceInput
): Promise<SummarizeDistributorPerformanceOutput> {
  return summarizeDistributorPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDistributorPerformancePrompt',
  input: {schema: SummarizeDistributorPerformanceInputSchema},
  output: {schema: SummarizeDistributorPerformanceOutputSchema},
  model: 'googleai/gemini-2.5-pro',
  prompt: `You are an expert performance analyst for a B2B supply chain platform.

Your task is to analyze the provided training performance data for a distributor and write a brief, insightful summary. The summary should be about 2-3 sentences long.

Focus on:
- Overall engagement and completion rate.
- Performance level based on the average score.
- Identifying if they are a high-performer, an average learner, or someone who might need support.

Distributor Performance Data:
- Name: {{{performanceData.name}}}
- Courses Completed: {{{performanceData.coursesCompleted}}}
- Average Score: {{{performanceData.averageScore}}}%
- Overall Progress: {{{performanceData.progress}}}%

Generate a summary based on this data.`,
});

const summarizeDistributorPerformanceFlow = ai.defineFlow(
  {
    name: 'summarizeDistributorPerformanceFlow',
    inputSchema: SummarizeDistributorPerformanceInputSchema,
    outputSchema: SummarizeDistributorPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
