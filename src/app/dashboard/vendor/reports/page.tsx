import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPerformanceData, mockDistributors, distributorCourses, mockTrainingCourses } from "@/lib/mock-data";
import { BookOpen, Bot, Star, User } from "lucide-react";
import PerformanceSummarizer from "@/components/ai/PerformanceSummarizer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";

type DistributorPerf = {
  id: string;
  name: string;
  coursesCompleted: number;
  averageScore: number;
  overallProgress: number;
}

export default function ReportsPage() {
  const avatar = placeholderImages.find(p => p.id === 'distributor-avatar');

  const performanceWithDetails = mockDistributors.map(dist => {
    const perfData = mockPerformanceData.find(p => p.name === `${dist.firstName} ${dist.lastName}`);
    const assignedCourseIds = distributorCourses[dist.id as keyof typeof distributorCourses] || [];
    const assignedCourses = mockTrainingCourses.filter(c => assignedCourseIds.includes(c.id));
    
    const totalProgress = assignedCourses.reduce((sum, course) => sum + course.progress, 0);
    const overallProgress = assignedCourses.length > 0 ? totalProgress / assignedCourses.length : 0;
    
    return {
      id: dist.id,
      name: `${dist.firstName} ${dist.lastName}`,
      coursesCompleted: perfData ? perfData['courses-completed'] : 0,
      averageScore: perfData ? perfData['average-score'] : 0,
      overallProgress: Math.round(overallProgress),
    }
  });

  return (
    <div className="grid gap-6">
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
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Distributor</TableHead>
                        <TableHead>Courses Completed</TableHead>
                        <TableHead>Avg. Score</TableHead>
                        <TableHead className="w-[20%]">Overall Progress</TableHead>
                        <TableHead>AI Performance Summary</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {performanceWithDetails.map(dist => (
                        <TableRow key={dist.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        {avatar && <AvatarImage src={`${avatar.imageUrl}&${dist.id}`} alt={dist.name} data-ai-hint={avatar.imageHint} />}
                                        <AvatarFallback>{dist.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{dist.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{dist.coursesCompleted}</TableCell>
                            <TableCell className="text-center">{dist.averageScore}%</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Progress value={dist.overallProgress} className="w-[60%]" />
                                    <span className="text-xs text-muted-foreground">{dist.overallProgress}%</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <PerformanceSummarizer performanceData={{
                                    name: dist.name,
                                    coursesCompleted: dist.coursesCompleted,
                                    averageScore: dist.averageScore,
                                    progress: dist.overallProgress,
                                }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
