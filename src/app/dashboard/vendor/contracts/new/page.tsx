import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { regions } from "@/lib/mock-data"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

const contractFields = [
    { id: "rights", label: "Exclusive/Non-Exclusive Rights", type: "select", options: ["Exclusive", "Non-Exclusive"] },
    { id: "territory", label: "Territory & Sales Scope", placeholder: "e.g., USA and Canada for Model X" },
    { id: "pricing", label: "Pricing & Payment Terms", placeholder: "e.g., NET 30, 40% discount off MSRP" },
    { id: "requirements", label: "Minimum Sales or Purchase Requirements", placeholder: "e.g., 1,000 units per quarter" },
    { id: "ip", label: "Intellectual Property & Brand Use", placeholder: "e.g., Use of trademarks for marketing allowed" },
    { id: "term", label: "Term, Renewal & Termination", placeholder: "e.g., 2-year initial term, 60-day notice for termination" },
    { id: "confidentiality", label: "Confidentiality & Non-Compete", placeholder: "e.g., Distributor cannot sell competing products" },
]

export default function NewContractPage() {
    return (
        <div className="grid gap-6">
            <div>
                <Link href="/dashboard/vendor">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Create New Contract</CardTitle>
                    <CardDescription>Fill out the details below to create a new contract offer for distributors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Contract Title</Label>
                                <Input id="title" placeholder="e.g., North America Distribution Agreement" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="product">Product(s)</Label>
                                <Input id="product" placeholder="e.g., Z-Phone, X-Tablet" />
                            </div>
                        </div>

                         <div className="grid gap-2">
                            <Label htmlFor="region">Target Region</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a region to publish to" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions.map(region => (
                                        <SelectItem key={region} value={region}>{region}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            {contractFields.map(field => (
                                <div key={field.id} className="grid gap-2">
                                    <Label htmlFor={field.id}>{field.label}</Label>
                                    {field.type === "select" ? (
                                        <Select>
                                            <SelectTrigger id={field.id}>
                                                <SelectValue placeholder={`Select ${field.label}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map(option => (
                                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input id={field.id} placeholder={field.placeholder} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="full-details">Full Contract Details (Optional)</Label>
                            <Textarea id="full-details" placeholder="Optionally, paste the full legal text of the contract here. Our AI will use this to provide a detailed summary to applicants." rows={6} />
                        </div>
                        
                        <div className="flex justify-end">
                            <Button type="submit" size="lg">
                                <Send className="mr-2 h-4 w-4" />
                                Publish Contract
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
