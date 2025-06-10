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
  AreaChart as RechartsAreaChart, // Renamed for clarity
  Bar,
  BarChart as RechartsBarChart, // Renamed for clarity
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer, // Added for consistency
} from "recharts";

// Assuming these are shared/local components
import { NoResponsesFallback } from "./no-responses-fallback"; // Adjust path as needed
import { Stat } from "./stat"; // Adjust path as needed

type AnswerEntry = {
  id: string;
  questionId: string | null;
  createdAt: Date;
  answerText: string | null; // Expected to be time string like "HH:MM"
  answerNumber: number | null;
  answerJson: any;
};

type Props = {
  answers: AnswerEntry[];
};

type ChartType = "table" | "area" | "histogram";
type IntervalWidthType = "1" | "2" | "4"; // Hour intervals

type ProcessedTableEntry = {
  answer: string; // The specific time string
  count: number;
};

type ProcessedBinEntry = {
  label: string; // The time bin label e.g., "00:00-02:00"
  count: number;
};

// Chart config for histogram and area charts (time bins)
const timeBinChartConfig = {
  count: {
    label: "Responses",
    color: "hsl(var(--chart-1))", // Used by ChartContainer/ChartTooltip
  },
  // 'label' (for x-axis dataKey) can be implicitly handled or defined if needed by tooltip
  // For XAxis dataKey="label", ChartTooltipContent will use 'label' as the category name
  // or you can customize it further in the tooltip component itself if needed.
} satisfies ChartConfig;

export const TimeCharts = ({ answers }: Props) => {
  const [chartType, setChartType] = useState<ChartType>("table");
  const [intervalWidth, setIntervalWidth] = useState<IntervalWidthType>("2");

  // Processes distinct time string answers for the table view
  const processTableData = (data: AnswerEntry[]): ProcessedTableEntry[] => {
    const counts = data.reduce((acc, item) => {
      const answer = item.answerText;
      if (answer) {
        // Basic validation for HH:MM format could be added here if needed
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([answer, count]) => ({ answer, count }))
      .sort((a, b) => a.answer.localeCompare(b.answer)); // Sort by time
  };

  // Processes answers into time bins for histogram and area chart
  const processBinnedData = (
    data: AnswerEntry[],
    currentIntervalWidth: number
  ): ProcessedBinEntry[] => {
    const numBins = 24 / currentIntervalWidth;
    const bins = Array.from({ length: numBins }, (_, i) => {
      const startHour = i * currentIntervalWidth;
      const endHour = startHour + currentIntervalWidth;
      return {
        label: `${String(startHour).padStart(2, "0")}:00–${String(
          endHour
        ).padStart(2, "0")}:00`,
        count: 0,
      };
    });

    for (const item of data) {
      const timeStr = item.answerText;
      if (!timeStr || !/^\d{1,2}:\d{2}$/.test(timeStr)) continue; // Basic format check

      const [hourStr] = timeStr.split(":");
      const hour = parseInt(hourStr, 10);
      if (isNaN(hour) || hour < 0 || hour > 23) continue;

      const binIndex = Math.floor(hour / currentIntervalWidth);
      if (binIndex >= 0 && binIndex < bins.length) {
        bins[binIndex].count += 1;
      }
    }
    return bins;
  };

  const tableData = processTableData(answers);
  const binnedData = processBinnedData(answers, Number(intervalWidth));

  const totalTableResponses = tableData.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  // Statistics Processing
  const processTimeStatistics = (
    currentTableData: ProcessedTableEntry[],
    currentBinnedData: ProcessedBinEntry[],
    allAnswers: AnswerEntry[]
  ) => {
    if (allAnswers.length === 0) {
      return {
        totalOverallResponses: 0,
        uniqueTimeEntries: 0,
        mostFrequentTime: "N/A",
        leastFrequentTime: "N/A",
        totalResponsesInBins: 0,
        numberOfActiveTimeBins: 0,
        averageResponsesPerBin: 0,
        timeBinWithMostResponses: "N/A",
        timeBinWithFewestResponses: "N/A",
      };
    }

    const sortedTableDataByCount = [...currentTableData].sort(
      (a, b) => b.count - a.count
    );
    const mostFrequentTimeEntry = sortedTableDataByCount[0];
    const leastFrequentTimeEntry = currentTableData.filter(e => e.count > 0).sort((a,b) => a.count - b.count)[0];


    const totalResponsesInBins = currentBinnedData.reduce(
      (sum, bin) => sum + bin.count,
      0
    );
    const activeTimeBins = currentBinnedData.filter((bin) => bin.count > 0);
    const numberOfActiveTimeBins = activeTimeBins.length;
    const averageResponsesPerBin =
      numberOfActiveTimeBins > 0
        ? totalResponsesInBins / numberOfActiveTimeBins
        : 0;

    const sortedBinnedDataByCount = [...activeTimeBins].sort(
        (a, b) => b.count - a.count
    );
    const binWithMostResponses = sortedBinnedDataByCount[0];
    const binWithFewestResponses = activeTimeBins.length > 0 ? [...activeTimeBins].sort((a,b) => a.count - b.count)[0] : null;


    return {
      totalOverallResponses: allAnswers.length,
      uniqueTimeEntries: currentTableData.length,
      mostFrequentTime: mostFrequentTimeEntry
        ? `${mostFrequentTimeEntry.answer} (${mostFrequentTimeEntry.count} times)`
        : "N/A",
      leastFrequentTime: leastFrequentTimeEntry
        ? `${leastFrequentTimeEntry.answer} (${leastFrequentTimeEntry.count} times)`
        : "N/A",
      totalResponsesInBins,
      numberOfActiveTimeBins,
      averageResponsesPerBin: parseFloat(averageResponsesPerBin.toFixed(2)),
      timeBinWithMostResponses: binWithMostResponses
        ? `${binWithMostResponses.label} (${binWithMostResponses.count})`
        : "N/A",
      timeBinWithFewestResponses: binWithFewestResponses
        ? `${binWithFewestResponses.label} (${binWithFewestResponses.count})`
        : "N/A",
    };
  };

  const stats = processTimeStatistics(tableData, binnedData, answers);

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
          {(chartType === "histogram" || chartType === "area") && (
            <Select
              value={intervalWidth}
              onValueChange={(value) =>
                setIntervalWidth(value as IntervalWidthType)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interval Width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Hourly</SelectItem>
                <SelectItem value="2">Every 2 hours</SelectItem>
                <SelectItem value="4">Every 4 hours</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          {chartType === "table" && (
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead>Selected Time</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((item) => (
                    <TableRow key={item.answer}>
                      <TableCell className="font-medium">
                        {item.answer}
                      </TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>
                        {totalTableResponses > 0
                          ? ((item.count / totalTableResponses) * 100).toFixed(
                              1
                            )
                          : 0}
                        %
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {(chartType === "histogram" || chartType === "area") && (
             <ChartContainer config={timeBinChartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "histogram" ? (
                  <RechartsBarChart
                    accessibilityLayer
                    data={binnedData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 40 }} // Adjusted left margin
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
                      height={60} // Allow space for rotated labels
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                    />
                    <ChartTooltip
                        cursor={{ fill: "hsl(var(--muted))" }} // Example cursor fill
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--chart-1)" // Using specified chart color
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                ) : ( // Area Chart
                  <RechartsAreaChart
                    accessibilityLayer
                    data={binnedData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 40 }} // Adjusted left margin
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
                      height={60} // Allow space for rotated labels
                    />
                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <ChartTooltip
                      cursor={{ stroke: "var(--chart-1)", strokeWidth: 1 }}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey="count"
                      type="monotone" // "natural" is also a good option
                      fill="var(--chart-1)" // Using specified chart color
                      fillOpacity={0.3}
                      stroke="var(--chart-1)" // Using specified chart color
                      strokeWidth={2}
                      stackId="a" // Required for Shadcn AreaChart styling from examples
                       dot={{
                        stroke: "var(--chart-1)",
                        strokeWidth: 2,
                        r:3,
                        fill: "var(--background)" // Or "white"
                      }}
                      activeDot={{ // Style for active dot on hover
                        stroke: "var(--chart-1)",
                        strokeWidth: 2,
                        r:5,
                        fill: "var(--background)"
                      }}
                    />
                  </RechartsAreaChart>
                )}
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </TabsContent>

      <TabsContent value="stats" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-4">
        <Stat
          title="Total Responses"
          value={stats.totalOverallResponses}
        />
        <Stat
          title="Unique Time Entries"
          value={stats.uniqueTimeEntries}
        />
        <Stat
          title="Most Frequent Time"
          value={stats.mostFrequentTime}

        />
         <Stat
          title="Least Frequent Time"
          value={stats.leastFrequentTime}

        />
        <Stat
          title="Total in Time Bins"
          value={stats.totalResponsesInBins}
        />
        <Stat
          title="Active Time Bins"
          value={stats.numberOfActiveTimeBins}
        />
        <Stat
          title="Avg. Responses per Bin"
          value={stats.averageResponsesPerBin.toFixed(2)}
        />
        <Stat
          title="Busiest Time Bin"
          value={stats.timeBinWithMostResponses}

        />
        <Stat
          title="Quietest Time Bin"
          value={stats.timeBinWithFewestResponses}

        />
      </TabsContent>
    </Tabs>
  );
};