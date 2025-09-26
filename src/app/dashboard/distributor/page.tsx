import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Briefcase, FileText, CheckCircle } from "lucide-react"

const stats = [
    { title: "Active Offers", value: "2", icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
    { title: "Applications Sent", value: "3", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    { title: "Approved Contracts", value: "1", icon: <CheckCircle className="h-4 w-4 text-muted-foreground" /> },
]

export default function DistributorDashboard() {
  return (
    <>
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
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight font-headline">
            Welcome, Distributor!
          </h3>
          <p className="text-sm text-muted-foreground">
            Explore contract offers and manage your partnerships here.
          </p>
        </div>
      </div>
    </>
  )
}
