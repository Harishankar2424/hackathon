"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PerformanceReportProps {
    data: any[];
}

const chartConfig = {
  "courses-completed": {
    label: "Courses Completed",
    color: "hsl(var(--chart-1))",
  },
  "average-score": {
    label: "Average Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function PerformanceReport({ data }: PerformanceReportProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="courses-completed" fill="var(--color-courses-completed)" radius={4} />
            <Bar dataKey="average-score" fill="var(--color-average-score)" radius={4} />
        </BarChart>
    </ChartContainer>
  )
}
