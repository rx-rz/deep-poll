import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart as RechartsAreaChart, // Renamed
  Bar,
  BarChart as RechartsBarChart, // Renamed
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// Assuming these are shared/local components
import { NoResponsesFallback } from "./no-responses-fallback"; // Adjust path as needed
import { Stat } from "./stat"; // Adjust path as needed

type AnswerEntry = {
  id: string;
  questionId: string | null;
  createdAt: Date;
  answerText: string | null; // Expected to be a parsable date-time string
  answerNumber: number | null;
  answerJson: any;
};

type Props = {
  answers: AnswerEntry[];
};

type ChartType = "table" | "area" | "histogram";
type IntervalType = "daily" | "weekly" | "biweekly" | "monthly";

type ProcessedDateEntry = {
  label: string; // e.g., "YYYY-MM-DD", "Week of YYYY-MM-DD"
  count: number;
};

// Chart config for histogram and area charts (date/time intervals)
const dateTimeChartConfig = {
  count: {
    label: "Responses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const DateTimeCharts = ({ answers }: Props) => {
  const [chartType, setChartType] = useState<ChartType>("table");
  const [interval, setInterval] = useState<IntervalType>("daily");

  const getGroupKey = (date: Date, currentInterval: IntervalType): string => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // const day = date.getDate(); // Not directly used here but good to have if needed

    switch (currentInterval) {
      case "daily":
        return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      case "weekly": {
        const mondayOfWeek = new Date(date);
        const dayOfWeek = date.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        mondayOfWeek.setDate(date.getDate() - daysToSubtract);
        return `Week of ${mondayOfWeek.toISOString().split("T")[0]}`;
      }
      case "biweekly": {
        const epochDate = new Date("2024-01-01"); // Monday
        const timeDiff = date.getTime() - epochDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const biweekIndex = Math.floor(daysDiff / 14);
        const biweekStart = new Date(epochDate);
        biweekStart.setDate(epochDate.getDate() + biweekIndex * 14);
        const biweekEnd = new Date(biweekStart);
        biweekEnd.setDate(biweekStart.getDate() + 13);
        return `${biweekStart.toISOString().split("T")[0]} to ${
          biweekEnd.toISOString().split("T")[0]
        }`;
      }
      case "monthly":
        return `${year}-${(month + 1).toString().padStart(2, "0")}`; // "YYYY-MM"
      default:
        return "";
    }
  };

  const processDateGroups = (
    data: AnswerEntry[],
    currentInterval: IntervalType
  ): ProcessedDateEntry[] => {
    const grouped: Record<string, number> = {};
    const validDates: Date[] = []; // For statistics

    for (const item of data) {
      if (!item.answerText) continue;
      // Ensure answerText is treated as a full Date, not just time.
      // If answerText is just "HH:MM", this will likely fail or produce unexpected results.
      // It should be a full ISO string or similar parsable by `new Date()`.
      const date = new Date(item.answerText);
      if (isNaN(date.getTime())) continue;

      validDates.push(date); // Collect valid dates for stats
      const key = getGroupKey(date, currentInterval);
      grouped[key] = (grouped[key] || 0) + 1;
    }

    return Object.entries(grouped)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => {
        if (currentInterval === "weekly") {
          const dateA = new Date(a.label.replace("Week of ", ""));
          const dateB = new Date(b.label.replace("Week of ", ""));
          return dateA.getTime() - dateB.getTime();
        } else if (currentInterval === "biweekly") {
          const dateA = new Date(a.label.split(" to ")[0]);
          const dateB = new Date(b.label.split(" to ")[0]);
          return dateA.getTime() - dateB.getTime();
        } else if (currentInterval === "monthly") {
          return a.label.localeCompare(b.label);
        } else {
          // Daily format YYYY-MM-DD
          return new Date(a.label).getTime() - new Date(b.label).getTime();
        }
      });
  };

  const chartData = processDateGroups(answers, interval);
  const totalResponsesInInterval = chartData.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  const processDateTimeStatistics = (
    currentChartData: ProcessedDateEntry[],
    allAnswers: AnswerEntry[]
  ) => {
    const validAnswerDates = allAnswers
      .map((a) => {
        if (!a.answerText) return null;
        const d = new Date(a.answerText);
        return isNaN(d.getTime()) ? null : d;
      })
      .filter((d): d is Date => d !== null);

    if (validAnswerDates.length === 0) {
      return {
        totalValidResponses: 0, // Based on parsable answerText
        numberOfActivePeriods: 0,
        averageResponsesPerPeriod: 0,
        periodWithMostResponses: "N/A",
        periodWithFewestResponses: "N/A",
        firstResponseDate: "N/A",
        lastResponseDate: "N/A",
        overallTimeSpanDays: 0,
      };
    }

    const currentTotalResponses = currentChartData.reduce(
      (sum, entry) => sum + entry.count,
      0
    );
    const numberOfActivePeriods = currentChartData.length;
    const averageResponsesPerPeriod =
      numberOfActivePeriods > 0
        ? currentTotalResponses / numberOfActivePeriods
        : 0;

    let periodWithMostResponses: ProcessedDateEntry | null = null;
    let periodWithFewestResponses: ProcessedDateEntry | null = null;

    if (numberOfActivePeriods > 0) {
      periodWithMostResponses = [...currentChartData].sort(
        (a, b) => b.count - a.count
      )[0];
      periodWithFewestResponses = [...currentChartData]
        .filter((entry) => entry.count > 0)
        .sort((a, b) => a.count - b.count)[0];
    }

    const sortedTimestamps = validAnswerDates
      .map((d) => d.getTime())
      .sort((a, b) => a - b);
    const firstResponseDateObj =
      sortedTimestamps.length > 0 ? new Date(sortedTimestamps[0]) : null;
    const lastResponseDateObj =
      sortedTimestamps.length > 0
        ? new Date(sortedTimestamps[sortedTimestamps.length - 1])
        : null;

    let overallTimeSpanDays = 0;
    if (firstResponseDateObj && lastResponseDateObj) {
      const diffTime = Math.abs(
        lastResponseDateObj.getTime() - firstResponseDateObj.getTime()
      );
      overallTimeSpanDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    return {
      totalValidResponses: validAnswerDates.length,
      numberOfActivePeriods,
      averageResponsesPerPeriod: parseFloat(
        averageResponsesPerPeriod.toFixed(2)
      ),
      periodWithMostResponses: periodWithMostResponses
        ? `${periodWithMostResponses.label} (${periodWithMostResponses.count})`
        : "N/A",
      periodWithFewestResponses: periodWithFewestResponses
        ? `${periodWithFewestResponses.label} (${periodWithFewestResponses.count})`
        : "N/A",
      firstResponseDate:
        firstResponseDateObj?.toISOString().split("T")[0] || "N/A",
      lastResponseDate:
        lastResponseDateObj?.toISOString().split("T")[0] || "N/A",
      overallTimeSpanDays,
    };
  };

  const stats = processDateTimeStatistics(chartData, answers);

  if (answers.length === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="absolute top-8 right-8">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>

      <TabsContent value="charts" className="space-y-6">
        <div className="flex items-center gap-4">
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="histogram">Histogram</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
          {(chartType === "area" || chartType === "histogram") && (
            <Select
              value={interval}
              onValueChange={(value) => setInterval(value as IntervalType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interval Grouping" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Biweekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          {chartType === "table" && (
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead>Date Period</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chartData.length > 0 ? (
                  chartData.map((item) => (
                    <TableRow key={item.label}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>
                        {totalResponsesInInterval > 0
                          ? (
                              (item.count / totalResponsesInInterval) *
                              100
                            ).toFixed(1)
                          : "0"}
                        %
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                      No data available for the selected interval.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {(chartType === "histogram" || chartType === "area") && (
            <ChartContainer
              config={dateTimeChartConfig}
              className="min-h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "histogram" ? (
                  <RechartsBarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 60 }} // Adjusted margins
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80} // Increased height for rotated labels
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                    />
                    <ChartTooltip
                      cursor={{ fill: "hsl(var(--muted))" }}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--chart-1)" // Using specified chart color
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                ) : (
                  // Area Chart
                  <RechartsAreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 60 }} // Adjusted margins
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80} // Increased height for rotated labels
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                    />
                    <ChartTooltip
                      cursor={{ stroke: "var(--chart-1)", strokeWidth: 1 }}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey="count"
                      type="monotone"
                      fill="var(--chart-1)" // Using specified chart color
                      fillOpacity={0.3}
                      stroke="var(--chart-1)" // Using specified chart color
                      strokeWidth={2}
                      stackId="a" // For Shadcn Area styling
                      dot={{
                        stroke: "var(--chart-1)",
                        strokeWidth: 2,
                        r: 3,
                        fill: "var(--background)",
                      }}
                      activeDot={{
                        stroke: "var(--chart-1)",
                        strokeWidth: 2,
                        r: 5,
                        fill: "var(--background)",
                      }}
                    />
                  </RechartsAreaChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </TabsContent>

      <TabsContent
        value="stats"
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-4"
      >
        <Stat
          title="Total Valid DateTime Responses"
          value={stats.totalValidResponses}
        />
        <Stat
          title={`Responses (Current Interval: ${interval})`}
          value={totalResponsesInInterval}
        />
        <Stat title="Active Periods" value={stats.numberOfActivePeriods} />
        <Stat
          title="Avg. Responses per Period"
          value={stats.averageResponsesPerPeriod}
        />
        <Stat
          title="Period with Most Responses"
          value={stats.periodWithMostResponses}
        />
        <Stat
          title="Period with Fewest Responses"
          value={stats.periodWithFewestResponses}
        />
        <Stat
          title="First Response Date (from answer)"
          value={stats.firstResponseDate}
        />
        <Stat
          title="Last Response Date (from answer)"
          value={stats.lastResponseDate}
        />
        <Stat
          title="Overall Timespan (Days)"
          value={stats.overallTimeSpanDays}
        />
      </TabsContent>
    </Tabs>
  );
};
