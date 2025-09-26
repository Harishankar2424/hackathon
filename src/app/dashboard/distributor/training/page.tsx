import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceReport from "@/components/dashboard/PerformanceReport";
import { mockPerformanceData } from "@/lib/mock-data";
import { BookOpen } from "lucide-react";

export default function TrainingPage() {
  const myPerformance = mockPerformanceData.filter(d => d.name === "John Doe");
  
  return (
    <div className="grid gap-4">
       <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">My Training Sessions</h1>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                My Training Performance
            </CardTitle>
            <CardDescription>
                A detailed view of your progress and scores in assigned training sessions.
            </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
            <PerformanceReport data={myPerformance} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Available Courses</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">New courses will be assigned here once you are approved for new contracts.</p>
        </CardContent>
      </Card>
    </div>
  )
}
