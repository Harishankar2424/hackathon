import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceReport from "@/components/dashboard/PerformanceReport";
import { mockPerformanceData } from "@/lib/mock-data";
import { BookOpen } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="grid gap-4">
       <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Distributor Performance Reports</h1>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Detailed Training Performance
            </CardTitle>
            <CardDescription>
                A comprehensive review of distributor progress and scores in assigned training sessions.
            </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
            <PerformanceReport data={mockPerformanceData} />
        </CardContent>
      </Card>
    </div>
  )
}
