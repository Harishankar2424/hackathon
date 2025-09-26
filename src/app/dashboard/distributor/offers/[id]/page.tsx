import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContracts } from "@/lib/mock-data";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import ContractSummarizer from "@/components/ai/ContractSummarizer";

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const contract = mockContracts.find(c => c.id === params.id);
  const contractImage = placeholderImages.find(p => p.id === 'contract-document');

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
                    <p className="text-sm text-muted-foreground mb-4">By applying, you agree to share your profile information with {contract.vendorName} for consideration.</p>
                    <Button className="w-full" size="lg">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Apply Now
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
