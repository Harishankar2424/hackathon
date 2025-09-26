"use client";

import { useState, useEffect } from "react";
import { aiPoweredDistributorVetting, type AIPoweredDistributorVettingInput, type AIPoweredDistributorVettingOutput } from "@/ai/flows/ai-powered-distributor-vetting";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, ShieldCheck } from "lucide-react";

export default function DistributorVetting(props: AIPoweredDistributorVettingInput) {
  const [result, setResult] = useState<AIPoweredDistributorVettingOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getVetting() {
      try {
        setLoading(true);
        setError(null);
        const vettingResult = await aiPoweredDistributorVetting(props);
        setResult(vettingResult);
      } catch (e) {
        console.error(e);
        setError("Failed to generate vetting analysis. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getVetting();
  }, [props]);

  if (loading) {
    return (
      <div className="space-y-6">
         <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }
  
  const suitabilityColor = result && result.suitabilityScore > 75 
    ? "bg-green-500" 
    : result && result.suitabilityScore > 50 
    ? "bg-yellow-500" 
    : "bg-red-500";


  return (
    <div className="space-y-6">
        <div>
            <h4 className="font-semibold text-lg">Suitability Score: {result?.suitabilityScore}%</h4>
            <Progress value={result?.suitabilityScore || 0} className="w-full mt-2" indicatorclassname={suitabilityColor} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline flex items-center gap-2"><ShieldCheck className="text-primary"/> Trustworthiness</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{result?.trustworthinessAssessment}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{result?.suggestedOptions}</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
