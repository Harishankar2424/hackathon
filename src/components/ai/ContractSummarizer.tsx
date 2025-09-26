"use client";

import { useState, useEffect } from "react";
import { summarizeContract, type SummarizeContractOutput } from "@/ai/flows/contract-summary-for-vendors";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table";

interface ContractSummarizerProps {
  contractText: string;
}

export default function ContractSummarizer({ contractText }: ContractSummarizerProps) {
  const [summary, setSummary] = useState<SummarizeContractOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        setError(null);
        const result = await summarizeContract({ contractText });
        setSummary(result);
      } catch (e) {
        console.error(e);
        setError("Failed to generate summary. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, [contractText]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-4 w-1/3" />
        <div className="space-y-2">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  const keyStatisticsArray = summary?.keyStatistics
  .split('\n')
  .filter(line => line.includes('|'))
  .slice(2) // Remove header and separator lines
  .map(line => {
    const [key, value] = line.split('|').map(s => s.trim()).slice(1, -1);
    return { key, value };
  })
  .filter(item => item.key && item.value);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Summary</h4>
        <p className="text-sm text-muted-foreground">{summary?.summary}</p>
      </div>
      <div>
        <h4 className="font-semibold">Key Statistics</h4>
         <Table className="mt-2">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[40%]">Aspect</TableHead>
                    <TableHead>Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {keyStatisticsArray?.map((stat, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{stat.key}</TableCell>
                        <TableCell>{stat.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}
