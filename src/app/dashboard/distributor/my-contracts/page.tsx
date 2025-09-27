
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { getApplicationsByDistributor, getContract, type Application } from "@/lib/firebase/firestore";
import type { Contract } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyContractsPage() {
  const { user } = useAuth();
  const [approvedContracts, setApprovedContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  const vendorLogo = placeholderImages.find(p => p.id === 'vendor-logo');

  useEffect(() => {
    const fetchApprovedContracts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const myApplications = await getApplicationsByDistributor(user.uid);
        const approvedApps = myApplications.filter(app => app.status === "Approved");
        const contractIds = approvedApps.map(app => app.contractId);

        const contractPromises = contractIds.map(id => getContract(id));
        const contracts = await Promise.all(contractPromises);
        
        setApprovedContracts(contracts.filter(c => c !== null) as Contract[]);
      } catch (error) {
        console.error("Failed to fetch approved contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedContracts();
  }, [user]);

  if (loading) {
    return (
        <div className="grid gap-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl font-headline">My Active Contracts</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-2/3 mt-2" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">My Active Contracts</h1>
      </div>
      {approvedContracts.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight font-headline">
              No Active Contracts
            </h3>
            <p className="text-sm text-muted-foreground">
              You have not been approved for any contracts yet.
            </p>
             <Link href="/dashboard/distributor/offers">
                <Button variant="outline" className="mt-4">Browse Contract Offers</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {approvedContracts.map(contract => (
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
                   <div className="text-sm text-green-500 font-semibold p-2 bg-green-500/10 rounded-md whitespace-nowrap flex items-center gap-2">
                       <CheckCircle className="h-4 w-4" />
                       Approved
                   </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-semibold text-foreground">Product: {contract.product}</p>
                  <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4"/>
                      <span>Region: {contract.region}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <Link href={`/dashboard/distributor/offers/${contract.id}`} className="w-full">
                  <Button className="w-full" variant="secondary">
                    View Original Offer
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
