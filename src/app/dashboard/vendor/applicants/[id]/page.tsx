import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockApplicants } from "@/lib/mock-data";
import { ArrowLeft, User, FileText, Bot } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";
import DistributorVetting from "@/components/ai/DistributorVetting";
import OnboardingAutomator from "@/components/ai/OnboardingAutomator";

export default function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const applicant = mockApplicants.find(a => a.id === params.id);
  const avatar = placeholderImages.find(p => p.id === 'distributor-avatar');

  if (!applicant) {
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
                    <div className="flex items-center gap-4">
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
                <CardContent className="text-sm space-y-2">
                    <p><span className="font-semibold">Status:</span> {applicant.status}</p>
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
            <OnboardingAutomator />
        </div>
      </div>
    </div>
  )
}
