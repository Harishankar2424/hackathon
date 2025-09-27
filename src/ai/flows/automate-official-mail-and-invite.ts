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

  Your task is to act as the platform (SynergyChain) and send welcoming, professional, and informative emails to both the vendor and the distributor.

  **Instructions:**
  1.  **Generate two distinct emails:** One for the vendor and one for the distributor.
  2.  **Vendor Email:**
      *   Congratulate them on the new partnership.
      *   Mention the specific contract and distributor.
      *   Provide the Slack invitation link for direct communication.
      *   Provide the link to the information portal where they can manage contracts and view distributor performance.
  3.  **Distributor Email:**
      *   Welcome them aboard and express excitement for the partnership.
      *   Mention the vendor and the contract they've been approved for.
      *   Provide the Slack invitation link to collaborate with the vendor.
      *   Provide the link to the information portal to access resources.
      *   Inform them about the assigned training sessions and how to access them.
  4.  **Confirm Actions:** After planning the emails, output a JSON object confirming the successful completion of the task.

  **Provided Information:**
  - Vendor Email: {{{vendorEmail}}}
  - Distributor Email: {{{distributorEmail}}}
  - Contract Details: {{{contractDetails}}}
  - Slack Invite Link: {{{slackInviteLink}}}
  - Information Portal Link: {{{informationPortalLink}}}
  - Training Session Details: {{{trainingSessionDetails}}}

  **Final Output:**
  Return a single JSON object with a "success" field set to true and a "message" field summarizing the actions taken (e.g., "Welcome emails have been sent to both the vendor and the distributor with all necessary links and information.").
  `,
});

const automateOfficialMailAndInviteFlow = ai.defineFlow(
  {
    name: 'automateOfficialMailAndInviteFlow',
    inputSchema: AutomateOfficialMailAndInviteInputSchema,
    outputSchema: AutomateOfficialMailAndInviteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
