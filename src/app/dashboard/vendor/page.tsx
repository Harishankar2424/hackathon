import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FilePlus, Users, CheckSquare } from "lucide-react"
import Link from "next/link"

const stats = [
    { title: "Open Contracts", value: "2", icon: <FilePlus className="h-4 w-4 text-muted-foreground" />, change: "+1 from last month" },
    { title: "New Applicants", value: "5", icon: <Users className="h-4 w-4 text-muted-foreground" />, change: "+3 this week" },
    { title: "Partnerships Formed", value: "12", icon: <CheckSquare className="h-4 w-4 text-muted-foreground" />, change: "since joining" },
]

export default function VendorDashboard() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Vendor Dashboard</h1>
        <div className="ml-auto">
          <Link href="/dashboard/vendor/contracts/new">
            <Button>
              <FilePlus className="h-4 w-4 mr-2" />
              New Contract
            </Button>
          </Link>
        </div>
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
                    {stat.change}
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight font-headline">
            Welcome, Vendor!
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your contracts and find the best distributors for your products.
          </p>
        </div>
      </div>
    </div>
  )
}
