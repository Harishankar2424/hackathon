
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import ContractSummarizer from "@/components/ai/ContractSummarizer";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { getContract, addApplication, getApplicationByContractAndDistributor, type Application } from "@/lib/firebase/firestore";
import type { Contract } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";

function OfferDetailClient({ contract }: { contract: Contract }) {
  const { user, userData } = useAuth();
  const contractImage = placeholderImages.find(p => p.id === 'contract-document');
  const { toast } = useToast();

  const [application, setApplication] = useState<Application | null>(null);
  const [loadingApplication, setLoadingApplication] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const fetchApplication = async () => {
        setLoadingApplication(true);
        const existingApp = await getApplicationByContractAndDistributor(contract.id, user.uid);
        setApplication(existingApp);
        setLoadingApplication(false);
      };
      fetchApplication();
    } else {
        setLoadingApplication(false);
    }
  }, [user, contract.id]);

  const handleApply = async () => {
    if (!user || !userData) {
        toast({
            title: "Please log in",
            description: "You must be logged in as a distributor to apply.",
            variant: "destructive"
        });
        return;
    }

    if (application) {
        toast({
            title: "Already Applied",
            description: "You have already submitted an application for this contract."
        });
        return;
    }
    
    const newApplicationData = {
        distributorId: user.uid,
        distributorName: `${userData.firstName} ${userData.lastName}`,
        contractId: contract.id,
        contractTitle: contract.title,
        status: "Pending" as const,
        date: new Date().toISOString().split('T')[0],
        distributorDetails: `Region: ${userData.region}, Trustworthiness: 85/100, Work History: 5 years experience in tech distribution. Strong sales record in the US and Canada.`,
        productInfo: "Z-Phone is a high-end smartphone targeting professionals and tech enthusiasts.",
        companyDatabase: "Internal sales data indicates strong demand for premium smartphones in the NA region."
    };

    try {
        const newAppId = await addApplication(newApplicationData);
        setApplication({ id: newAppId, ...newApplicationData });
        
        toast({
            title: "Application Sent!",
            description: `Your application for the ${contract.title} has been submitted.`
        });

    } catch (error) {
        toast({
            title: "Application Failed",
            description: "Could not submit your application. Please try again.",
            variant: "destructive"
        });
    }
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
          {contractImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={contractImage.imageUrl}
                fill
                alt="Contract Document"
                data-ai-hint={contractImage.imageHint}
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="space-y-6">
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <FileText /> AI Contract Summary
              </CardTitle>
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
              {loadingApplication ? <Skeleton className="h-20 w-full" /> : application ? (
                <div className="flex flex-col items-center justify-center text-center p-4 bg-muted rounded-lg">
                  <p className="font-semibold">Your Application Status:</p>
                  <div className="mt-2">{getStatusBadge(application.status)}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    The vendor has been notified. You will be updated on any progress.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    By applying, you agree to share your profile information with {contract.vendorName} for consideration.
                  </p>
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
  );
}


export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchContract = async () => {
      if (!params.id) return;
      setLoading(true);
      const fetchedContract = await getContract(params.id);
      setContract(fetchedContract);
      setLoading(false);
    };
    fetchContract();
  }, [params.id]);


  if (loading) {
    return (
      <div className="grid gap-6">
        <div>
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="aspect-video w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    )
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
  
  return <OfferDetailClient contract={contract} />;
}
