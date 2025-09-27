
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { regions } from "@/lib/mock-data";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractFormSchema, type ContractFormData } from "@/lib/firebase/firestore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { addContract } from "@/lib/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const contractFields = [
    { id: "rights", name: "rights", label: "Exclusive/Non-Exclusive Rights", type: "select", options: ["Exclusive", "Non-Exclusive"] },
    { id: "territory", name: "territory", label: "Territory & Sales Scope", placeholder: "e.g., USA and Canada for Model X" },
    { id: "pricing", name: "pricing", label: "Pricing & Payment Terms", placeholder: "e.g., NET 30, 40% discount off MSRP" },
    { id: "requirements", name: "requirements", label: "Minimum Sales or Purchase Requirements", placeholder: "e.g., 1,000 units per quarter" },
    { id: "ip", name: "ip", label: "Intellectual Property & Brand Use", placeholder: "e.g., Use of trademarks for marketing allowed" },
    { id: "term", name: "term", label: "Term, Renewal & Termination", placeholder: "e.g., 2-year initial term, 60-day notice for termination" },
    { id: "confidentiality", name: "confidentiality", label: "Confidentiality & Non-Compete", placeholder: "e.g., Distributor cannot sell competing products" },
] as const;

export default function NewContractPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<ContractFormData>({
        resolver: zodResolver(contractFormSchema),
        defaultValues: {
            title: "",
            product: "",
            region: "",
            rights: "",
            territory: "",
            pricing: "",
            requirements: "",
            ip: "",
            term: "",
            confidentiality: "",
            fullDetails: "",
        },
    });

    async function onSubmit(values: ContractFormData) {
        try {
            await addContract(values);
            toast({
                title: "Contract Published!",
                description: "Your new contract offer is now live for distributors.",
            });
            router.push("/dashboard/vendor");
        } catch (error) {
            toast({
                title: "Publication Failed",
                description: "Could not publish the contract. Please try again.",
                variant: "destructive",
            });
        }
    }

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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contract Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., North America Distribution Agreement" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="product"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product(s)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Z-Phone, X-Tablet" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                             <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target Region</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a region to publish to" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {regions.map(region => (
                                                    <SelectItem key={region} value={region}>{region}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {contractFields.map(fieldInfo => (
                                    <FormField
                                        key={fieldInfo.id}
                                        control={form.control}
                                        name={fieldInfo.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{fieldInfo.label}</FormLabel>
                                                {fieldInfo.type === "select" ? (
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={`Select ${fieldInfo.label}`} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {fieldInfo.options?.map(option => (
                                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <FormControl>
                                                        <Input placeholder={fieldInfo.placeholder} {...field} />
                                                    </FormControl>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>

                            <FormField
                                control={form.control}
                                name="fullDetails"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Contract Details (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Optionally, paste the full legal text of the contract here. Our AI will use this to provide a detailed summary to applicants." rows={6} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="flex justify-end">
                                <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                                     {form.formState.isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Publishing...
                                        </>
                                        ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Publish Contract
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
