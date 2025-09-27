
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Briefcase, FileText, CheckCircle, BookOpen } from "lucide-react"
import Link from "next/link";
import PerformanceReport from "@/components/dashboard/PerformanceReport";
import { mockPerformanceData, mockContracts, mockApplicants } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export default function DistributorDashboard() {
  const currentDistributorId = "dist_1"; // Mocking John Doe
  const myPerformance = mockPerformanceData.filter(d => d.name === "John Doe");
  
  const applicationsSent = mockApplicants.filter(app => app.distributorId === currentDistributorId).length;
  const approvedContracts = mockApplicants.filter(app => app.distributorId === currentDistributorId && app.status === "Approved").length;
  const activeOffers = mockContracts.filter(c => c.status === "Open").length;

  const stats = [
    { title: "Active Offers", value: activeOffers.toString(), icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
    { title: "Applications Sent", value: applicationsSent.toString(), icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    { title: "Approved Contracts", value: approvedContracts.toString(), icon: <CheckCircle className="h-4 w-4 text-muted-foreground" /> },
]

  return (
    <div className="grid gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Distributor Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {stats.map(stat => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {stat.title}
                    </CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                    Based on your activity
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>
       <Card>
          <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  My Training Progress
              </CardTitle>
              <CardDescription>
                  Your progress in assigned training sessions. Keep it up!
              </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
              <PerformanceReport data={myPerformance} />
          </CardContent>
      </Card>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[200px]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight font-headline">
            Welcome, John!
          </h3>
          <p className="text-sm text-muted-foreground">
            Explore contract offers and manage your partnerships here.
          </p>
          <Link href="/dashboard/distributor/offers">
            <Button variant="outline" className="mt-4">
                View Contract Offers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
