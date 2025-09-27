
"use client";

import { useState } from "react";
import { automateOfficialMailAndInvite } from "@/ai/flows/automate-official-mail-and-invite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OnboardingAutomatorProps {
    applicantName: string;
    applicantEmail: string;
    contractTitle: string;
    onStatusChange: (newStatus: "Approved" | "Rejected") => void;
    currentStatus: "Pending" | "Approved" | "Rejected";
}

export default function OnboardingAutomator({ applicantName, applicantEmail, contractTitle, onStatusChange, currentStatus }: OnboardingAutomatorProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleApprove = async () => {
    setLoading(true);
    setError(null);
    onStatusChange("Approved");

    try {
      const response = await automateOfficialMailAndInvite({
        vendorEmail: "vendor@synergychain.com",
        distributorEmail: applicantEmail,
        contractDetails: contractTitle,
        slackInviteLink: "https://slack.com/invite/...",
        informationPortalLink: "https://notion.so/synergychain/...",
        trainingSessionDetails: "Assigned 'Z-Phone Sales Training' and 'Advanced Negotiation' courses."
      });
      setResult(response.message);
    } catch (e) {
      console.error(e);
      setError("Failed to automate onboarding. Please try again.");
      setResult("The applicant has been approved, but the automated email failed to send. Please contact them manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    onStatusChange("Rejected");
    // In a real app, you'd send a rejection email.
    setResult(`A polite rejection email has been sent to ${applicantName}.`);
  };
  
  if (currentStatus !== "Pending") {
    return (
       <Alert variant={currentStatus === 'Approved' ? 'default' : 'destructive'} className="bg-card">
         {currentStatus === 'Approved' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        <AlertTitle className="font-headline">Decision Made: {currentStatus}</AlertTitle>
        <AlertDescription>
          {result || `This applicant was ${currentStatus.toLowerCase()}. You can find their details in your active partners list.`}
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
         {result && (
           <Alert className="mt-4">
             <CheckCircle className="h-4 w-4" />
             <AlertTitle>Action Complete</AlertTitle>
             <AlertDescription>{result}</AlertDescription>
           </Alert>
         )}
         {error && (
            <Alert variant="destructive" className="mt-4">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
         )}
      </CardContent>
    </Card>
  );
}
