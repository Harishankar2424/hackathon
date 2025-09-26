"use client";

import { useState } from "react";
import { automateOfficialMailAndInvite } from "@/ai/flows/automate-official-mail-and-invite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function OnboardingAutomator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);

  const handleApprove = async () => {
    setLoading(true);
    setError(null);
    setDecision("approved");

    try {
      const response = await automateOfficialMailAndInvite({
        vendorEmail: "vendor@synergychain.com",
        distributorEmail: "distributor@example.com",
        contractDetails: "North America Distribution Agreement for Z-Phone",
        slackInviteLink: "https://slack.com/invite/...",
        informationPortalLink: "https://notion.so/synergychain/...",
        trainingSessionDetails: "Assigned 'Z-Phone Sales Training' and 'Advanced Negotiation' courses."
      });
      setResult(response.message);
    } catch (e) {
      console.error(e);
      setError("Failed to automate onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = () => {
    setDecision("rejected");
    setResult("A polite rejection email has been sent to the applicant.");
  };

  if (decision) {
    return (
       <Alert variant={decision === 'approved' ? 'default' : 'destructive'} className="bg-card">
         <CheckCircle className="h-4 w-4" />
        <AlertTitle className="font-headline">Decision Made: {decision === 'approved' ? 'Approved' : 'Rejected'}</AlertTitle>
        <AlertDescription>
          {loading ? (
             <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
             </div>
          ) : (
            result
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Finalize Decision</CardTitle>
        <CardDescription>Approve this applicant to automatically onboard them, or reject the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button className="w-full" size="lg" onClick={handleApprove} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
            Approve & Onboard
          </Button>
          <Button className="w-full" size="lg" variant="destructive" onClick={handleReject} disabled={loading}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
