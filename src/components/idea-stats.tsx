"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Idea } from "@/lib/types"

interface IdeaStatsProps {
  ideas: Idea[];
}

const chartConfig = {
  count: {
    label: "Ideas",
  },
  ai: { label: "AI", color: "hsl(var(--chart-1))" },
  fashion: { label: "Fashion", color: "hsl(var(--chart-1))" },
  "mobile app": { label: "Mobile App", color: "hsl(var(--chart-1))" },
  education: { label: "Education", color: "hsl(var(--chart-2))" },
  gamification: { label: "Gamification", color: "hsl(var(--chart-2))" },
  culture: { label: "Culture", color: "hsl(var(--chart-2))" },
  iot: { label: "IoT", color: "hsl(var(--chart-3))" },
  "home automation": { label: "Home Automation", color: "hsl(var(--chart-3))" },
  gardening: { label: "Gardening", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig

export function IdeaStats({ ideas }: IdeaStatsProps) {
    const tagCounts = React.useMemo(() => {
        const counts: { [key: string]: number } = {};
        ideas.forEach(idea => {
            idea.tags.forEach(tag => {
                const normalizedTag = tag.toLowerCase();
                counts[normalizedTag] = (counts[normalizedTag] || 0) + 1;
            });
        });

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }, [ideas]);


    if (tagCounts.length === 0) {
        return (
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>Tag Distribution</CardTitle>
                <CardDescription>No tags found. Add ideas with tags to see stats.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground">No data to display</p>
              </CardContent>
            </Card>
        )
    }

  return (
    <Card className="col-span-1 lg:col-span-4 backdrop-blur-sm bg-card/80 border-primary/10">
      <CardHeader>
        <CardTitle>Tag Distribution</CardTitle>
        <CardDescription>An overview of your most used tags.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
                <BarChart data={tagCounts} margin={{ top: 20, right: 20, left: -10, bottom: 5 }} accessibilityLayer>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="name" 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={10}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        interval={0}
                        />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="count" radius={8} fill="hsl(var(--primary))" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
