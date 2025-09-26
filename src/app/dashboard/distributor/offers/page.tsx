import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContracts } from "@/lib/mock-data";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";

export default function DistributorOffersPage() {
  const vendorLogo = placeholderImages.find(p => p.id === 'vendor-logo');
  
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Contract Offers</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockContracts.map(contract => (
          <Card key={contract.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-headline">{contract.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-2">
                    {vendorLogo && <Image src={vendorLogo.imageUrl} width={20} height={20} alt={contract.vendorName} data-ai-hint={vendorLogo.imageHint} className="rounded-full" />}
                    {contract.vendorName}
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground p-2 bg-secondary rounded-md whitespace-nowrap">{contract.status}</div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Product: {contract.product}</p>
                <div className="flex items-center gap-2 mt-2">
                    <Globe className="h-4 w-4"/>
                    <span>Region: {contract.region}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/distributor/offers/${contract.id}`} className="w-full">
                <Button className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
