
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { placeholderImages } from "@/lib/placeholder-images"
import { getApplications, type Application } from "@/lib/firebase/firestore"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicantsPage() {
    const avatar = placeholderImages.find(p => p.id === 'distributor-avatar');
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            const apps = await getApplications();
            setApplications(apps);
            setLoading(false);
        }
        fetchApplications();
    }, [])

    if (loading) {
        return (
             <div className="grid gap-4">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl font-headline">Contract Applicants</h1>
                </div>
                <div className="rounded-lg border shadow-sm p-4">
                     <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Contract Applicants</h1>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Distributor</TableHead>
              <TableHead>Contract</TableHead>
              <TableHead className="hidden md:table-cell">Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">No applicants yet.</TableCell>
                </TableRow>
            ) : applications.map(applicant => (
                <TableRow key={applicant.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                {avatar && <AvatarImage src={`${avatar.imageUrl}&${applicant.distributorId}`} alt={applicant.distributorName} data-ai-hint={avatar.imageHint} />}
                                <AvatarFallback>{applicant.distributorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{applicant.distributorName}</div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{applicant.contractTitle}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{applicant.date}</TableCell>
                    <TableCell>
                        <Badge variant={applicant.status === "Pending" ? "secondary" : applicant.status === "Approved" ? "default" : "destructive"}>
                            {applicant.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Link href={`/dashboard/vendor/applicants/${applicant.id}`}>
                            <Button variant="outline" size="sm">
                                View
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
