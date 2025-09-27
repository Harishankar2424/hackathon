
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Bot, Loader2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";
import DistributorVetting from "@/components/ai/DistributorVetting";
import OnboardingAutomator from "@/components/ai/OnboardingAutomator";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { getApplication, updateApplicationStatus, getDistributorData, type Application } from "@/lib/firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import type { DistributorData } from "@/lib/firebase/firestore";

export default function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const [applicant, setApplicant] = useState<Application | null>(null);
  const [distributor, setDistributor] = useState<DistributorData | null>(null);
  const [loading, setLoading] = useState(true);

  const avatar = placeholderImages.find(p => p.id === 'distributor-avatar');
  
  useEffect(() => {
    const fetchApplicantData = async () => {
        setLoading(true);
        const appData = await getApplication(params.id);
        setApplicant(appData);

        if (appData) {
            const distData = await getDistributorData(appData.distributorId);
            setDistributor(distData);
        }

        setLoading(false);
    }
    fetchApplicantData();
  }, [params.id]);


  const handleStatusChange = async (newStatus: "Approved" | "Rejected") => {
    if (applicant) {
        await updateApplicationStatus(applicant.id, newStatus);
        setApplicant(prev => prev ? {...prev, status: newStatus} : null);
    }
  }

  if (loading) {
      return (
        <div className="space-y-6">
            <Skeleton className="h-9 w-32" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        </div>
      )
  }
  
  if (!applicant || !distributor) {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Applicant not found</h1>
            <p className="text-muted-foreground">This application may have been withdrawn or does not exist.</p>
             <Link href="/dashboard/vendor/applicants">
                <Button variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Applicants
                </Button>
            </Link>
        </div>
    )
  }

  return (
    <div className="grid gap-6">
        <div>
            <Link href="/dashboard/vendor/applicants">
                <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Applicants
                </Button>
            </Link>
        </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                         <Avatar className="h-16 w-16">
                            {avatar && <AvatarImage src={`${avatar.imageUrl}&${applicant.distributorId}`} alt={applicant.distributorName} data-ai-hint={avatar.imageHint} />}
                            <AvatarFallback>{applicant.distributorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="font-headline text-2xl">{applicant.distributorName}</CardTitle>
                            <CardDescription>Application for: {applicant.contractTitle}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                    <div>
                        <span className="font-semibold">Status:</span>
                        <Badge variant={applicant.status === "Pending" ? "secondary" : applicant.status === "Approved" ? "default" : "destructive"} className="ml-2">
                            {applicant.status}
                        </Badge>
                    </div>
                    <p><span className="font-semibold">Applied on:</span> {applicant.date}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><User /> Distributor Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                   <p className="text-muted-foreground whitespace-pre-wrap">{applicant.distributorDetails}</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Bot /> AI Vetting Analysis</CardTitle>
                    <CardDescription>Analysis of distributor suitability by SynergyChain AI.</CardDescription>
                </CardHeader>
                <CardContent>
                   <DistributorVetting 
                        distributorDetails={applicant.distributorDetails}
                        productInfo={applicant.productInfo}
                        companyDatabase={applicant.companyDatabase}
                        region={applicant.distributorDetails.split(',')[0].split(':')[1].trim()}
                   />
                </CardContent>
            </Card>
            <OnboardingAutomator 
                applicantName={applicant.distributorName}
                applicantEmail={distributor.email}
                contractTitle={applicant.contractTitle}
                onStatusChange={handleStatusChange}
                currentStatus={applicant.status}
            />
        </div>
      </div>
    </div>
  )
}
