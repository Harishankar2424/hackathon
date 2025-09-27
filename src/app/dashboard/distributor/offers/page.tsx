
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getContracts } from "@/lib/firebase/firestore";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import type { Contract } from "@/lib/types";

export default async function DistributorOffersPage() {
  const vendorLogo = placeholderImages.find(p => p.id === 'vendor-logo');
  const contracts: Contract[] = await getContracts();
  
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Contract Offers</h1>
      </div>
      {contracts.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight font-headline">
              No Contract Offers Available
            </h3>
            <p className="text-sm text-muted-foreground">
              Please check back later for new opportunities.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contracts.map(contract => (
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
      )}
    </>
  )
}
