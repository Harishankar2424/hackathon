
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContracts, mockApplicants } from "@/lib/mock-data";
import { ArrowLeft, CheckCircle, FileText, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import ContractSummarizer from "@/components/ai/ContractSummarizer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function OfferDetailPage({ params: { id } }: { params: { id: string } }) {
  const contract = mockContracts.find(c => c.id === id);
  const contractImage = placeholderImages.find(p => p.id === 'contract-document');
  const { toast } = useToast();

  // In a real app, you'd get the current user's ID
  const currentDistributorId = "dist_1"; 
  const existingApplication = mockApplicants.find(app => app.contractId === id && app.distributorId === currentDistributorId);
  
  const [applicationStatus, setApplicationStatus] = useState(existingApplication?.status);

  const handleApply = () => {
    // This is a mock function. In a real app, you'd write to a database.
    if (!existingApplication) {
        mockApplicants.push({
            id: `app_${mockApplicants.length + 1}`,
            distributorId: currentDistributorId,
            distributorName: "Lakshan", // Mock name
            contractId: id,
            contractTitle: contract!.title,
            status: "Pending",
            date: new Date().toISOString().split('T')[0],
            distributorDetails: "Region: North America, Trustworthiness: 85/100, Work History: 5 years experience in tech distribution. Strong sales record in the US and Canada.",
            productInfo: "Z-Phone is a high-end smartphone targeting professionals and tech enthusiasts.",
            companyDatabase: "Internal sales data indicates strong demand for premium smartphones in the NA region."
        });
    }
    setApplicationStatus("Pending");
    toast({
        title: "Application Sent!",
        description: `Your application for the ${contract?.title} has been submitted.`
    });
  }


  if (!contract) {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Contract not found</h1>
            <p className="text-muted-foreground">This contract offer may have been removed or is no longer available.</p>
             <Link href="/dashboard/distributor/offers">
                <Button variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Offers
                </Button>
            </Link>
        </div>
    )
  }
  
  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    switch(status) {
        case 'Approved':
            return <Badge variant="default" className="bg-green-500/80">{status}</Badge>;
        case 'Pending':
            return <Badge variant="secondary">{status}</Badge>;
        case 'Rejected':
            return <Badge variant="destructive">{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
  }


  return (
    <div className="grid gap-6">
        <div>
            <Link href="/dashboard/distributor/offers">
                <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Offers
                </Button>
            </Link>
        </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{contract.title}</CardTitle>
                    <CardDescription>By {contract.vendorName}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-lg">Full Contract Details</p>
                    <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{contract.details}</p>
                </CardContent>
            </Card>
            {contractImage && 
            <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                    src={contractImage.imageUrl}
                    fill
                    alt="Contract Document"
                    data-ai-hint={contractImage.imageHint}
                    className="object-cover"
                />
            </div>
            }
        </div>
        <div className="space-y-6">
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><FileText /> AI Contract Summary</CardTitle>
                    <CardDescription>Key points summarized by SynergyChain AI.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ContractSummarizer contractText={contract.details} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Apply for this Contract</CardTitle>
                    <CardDescription>Ready to partner with {contract.vendorName}?</CardDescription>
                </CardHeader>
                <CardContent>
                    {applicationStatus ? (
                         <div className="flex flex-col items-center justify-center text-center p-4 bg-muted rounded-lg">
                            <p className="font-semibold">Your Application Status:</p>
                            <div className="mt-2">{getStatusBadge(applicationStatus)}</div>
                            <p className="text-xs text-muted-foreground mt-2">The vendor has been notified. You will be updated on any progress.</p>
                        </div>
                    ) : (
                        <>
                         <p className="text-sm text-muted-foreground mb-4">By applying, you agree to share your profile information with {contract.vendorName} for consideration.</p>
                        <Button className="w-full" size="lg" onClick={handleApply}>
                            <Send className="mr-2 h-4 w-4" />
                            Apply Now
                        </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
