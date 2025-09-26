import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Welcome to SynergyChain</h1>
            <p className="text-muted-foreground mt-2">Choose your role to continue</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">I am a Vendor</CardTitle>
                    <CardDescription>Manage contracts, view applicants, and grow your distribution network.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/vendor">
                        <Button className="w-full">
                            Go to Vendor Dashboard
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">I am a Distributor</CardTitle>
                    <CardDescription>Discover new opportunities, apply for contracts, and manage partnerships.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Link href="/dashboard/distributor">
                        <Button className="w-full">
                            Go to Distributor Dashboard
                             <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
