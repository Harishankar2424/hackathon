
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceReport from "@/components/dashboard/PerformanceReport";
import { mockPerformanceData, mockTrainingCourses } from "@/lib/mock-data";
import { BookOpen, CheckCircle, CircleDotDashed, Circle, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { getAssignedCourses } from "@/lib/firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrainingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assignedCourses, setAssignedCourses] = useState<typeof mockTrainingCourses>([]);

  const myPerformance = mockPerformanceData.filter(d => d.name === "Lakshan");

  useEffect(() => {
    if (!user) return;
    const fetchCourses = async () => {
      setLoading(true);
      const courseIds = await getAssignedCourses(user.uid);
      const myCourses = mockTrainingCourses.filter(course => courseIds.includes(course.id));
      setAssignedCourses(myCourses);
      setLoading(false);
    }
    fetchCourses();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "In Progress":
        return <CircleDotDashed className="h-5 w-5 text-blue-500 animate-spin" />;
      case "Not Started":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  }

  return (
    <div className="grid gap-6">
       <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">My Training Sessions</h1>
      </div>
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Available Courses</CardTitle>
            <CardDescription>Your assigned training courses and current progress.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Course Title</TableHead>
                  <TableHead>Assigned By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[20%]">Progress</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedCourses.length > 0 ? assignedCourses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.assignedBy}</TableCell>
                    <TableCell>
                      <Badge variant={
                        course.status === "Completed" ? "default" :
                        course.status === "In Progress" ? "secondary" : "outline"
                      } className="flex items-center gap-2 w-fit">
                        {getStatusIcon(course.status)}
                        <span>{course.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={course.progress} className="w-[60%]" />
                        <span className="text-xs text-muted-foreground">{course.progress}%</span>
                      </div>
                      </TableCell>
                    <TableCell className="text-right font-medium">{course.score ?? 'N/A'}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">No courses assigned yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
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
    </div>
  )
}
