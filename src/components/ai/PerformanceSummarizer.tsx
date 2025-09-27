"use client";

import { useState, useEffect } from "react";
import { summarizeDistributorPerformance, type SummarizeDistributorPerformanceInput, type SummarizeDistributorPerformanceOutput } from "@/ai/flows/summarize-distributor-performance";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

interface PerformanceSummarizerProps {
  performanceData: SummarizeDistributorPerformanceInput["performanceData"];
}

export default function PerformanceSummarizer({ performanceData }: PerformanceSummarizerProps) {
  const [summary, setSummary] = useState<SummarizeDistributorPerformanceOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        setError(null);
        const result = await summarizeDistributorPerformance({ performanceData });
        setSummary(result);
      } catch (e) {
        console.error(e);
        setError("Failed to generate summary.");
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, [performanceData]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive text-xs">{error}</p>;
  }

  return (
    <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Bot className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
        <span>{summary?.summary}</span>
    </div>
  );
}
