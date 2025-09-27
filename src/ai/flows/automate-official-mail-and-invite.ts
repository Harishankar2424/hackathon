'use server';
/**
 * @fileOverview Automates official communication, distributes resources, and invites both Vendor and distributor to collaborate on other platforms after a contract is signed.
 *
 * - automateOfficialMailAndInvite - A function that automates the process.
 * - AutomateOfficialMailAndInviteInput - The input type for the automateOfficialMailAndInvite function.
 * - AutomateOfficialMailAndInviteOutput - The return type for the automateOfficialMailAndInvite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateOfficialMailAndInviteInputSchema = z.object({
  vendorEmail: z.string().email().describe('The email address of the vendor.'),
  distributorEmail: z.string().email().describe('The email address of the distributor.'),
  contractDetails: z.string().describe('Details of the signed contract.'),
  slackInviteLink: z.string().url().describe('The invitation link for the Slack channel.'),
  informationPortalLink: z.string().url().describe('The link to the information portal.'),
  trainingSessionDetails: z.string().describe('Details of the assigned training sessions.'),
});
export type AutomateOfficialMailAndInviteInput = z.infer<typeof AutomateOfficialMailAndInviteInputSchema>;

const AutomateOfficialMailAndInviteOutputSchema = z.object({
  success: z.boolean().describe('Indicates whether the automation process was successful.'),
  message: z.string().describe('A message indicating the status of the automation process.'),
});
export type AutomateOfficialMailAndInviteOutput = z.infer<typeof AutomateOfficialMailAndInviteOutputSchema>;

export async function automateOfficialMailAndInvite(input: AutomateOfficialMailAndInviteInput): Promise<AutomateOfficialMailAndInviteOutput> {
  return automateOfficialMailAndInviteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automateOfficialMailAndInvitePrompt',
  input: {schema: AutomateOfficialMailAndInviteInputSchema},
  output: {schema: AutomateOfficialMailAndInviteOutputSchema},
  prompt: `You are an AI assistant tasked with automating the onboarding process after a vendor and distributor have signed a contract.

  Based on the provided information, generate personalized emails to both the vendor and the distributor, providing them with the necessary resources and invitations to collaborate on various platforms.

  Vendor Email: {{{vendorEmail}}}
  Distributor Email: {{{distributorEmail}}}
  Contract Details: {{{contractDetails}}}
  Slack Invite Link: {{{slackInviteLink}}}
  Information Portal Link: {{{informationPortalLink}}}
  Training Session Details: {{{trainingSessionDetails}}}

  Ensure that the emails are professional, informative, and welcoming. The goal is to facilitate a smooth transition into the partnership and encourage active participation.

  Output a JSON object with a "success" field indicating whether the process was successful and a "message" field providing a summary of the actions taken.
  {
    "success": true/false,
    "message": "Summary of actions taken, including emails sent and invitations issued."
  }`,
});

const automateOfficialMailAndInviteFlow = ai.defineFlow(
  {
    name: 'automateOfficialMailAndInviteFlow',
    inputSchema: AutomateOfficialMailAndInviteInputSchema,
    outputSchema: AutomateOfficialMailAndInviteOutputSchema,
  },
  async input => {
    const {output} = await prompt.generate(input);
    return output!;
  }
);
