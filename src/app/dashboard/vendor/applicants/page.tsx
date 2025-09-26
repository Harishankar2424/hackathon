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
import { mockApplicants } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { placeholderImages } from "@/lib/placeholder-images"

export default function ApplicantsPage() {
    const avatar = placeholderImages.find(p => p.id === 'distributor-avatar');
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
            {mockApplicants.map(applicant => (
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
                        <Badge variant={applicant.status === "Pending" ? "secondary" : "default"}>
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
