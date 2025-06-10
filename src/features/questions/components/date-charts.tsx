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
  AreaChart as RechartsAreaChart, // Renamed to avoid conflict if you have a local AreaChart component
  Area,
  BarChart as RechartsBarChart, // Renamed to avoid conflict
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Assuming these are shared/local components similar to SliderCharts
import { NoResponsesFallback } from "./no-responses-fallback"; // Adjust path as needed
import { Stat } from "./stat"; // Adjust path as needed

type AnswerEntry = {
  id: string;
  questionId: string | null;
  createdAt: Date;
  answerText: string | null;
  answerNumber: number | null;
  answerJson: any;
};

type Props = {
  answers: AnswerEntry[];
  // No 'options' prop needed for DateCharts unlike SliderCharts
};

type ChartType = "table" | "histogram" | "area";
type IntervalType = "daily" | "weekly" | "biweekly" | "monthly";

type ProcessedDateEntry = {
  label: string;
  count: number;
};

export const DateCharts = ({ answers }: Props) => {
  const [chartType, setChartType] = useState<ChartType>("table");
  const [interval, setInterval] = useState<IntervalType>("daily");

  const getGroupKey = (date: Date, currentInterval: IntervalType): string => {
    const year = date.getFullYear();
    const month = date.getMonth();

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

    for (const item of data) {
      const date = new Date(item.createdAt);
      if (isNaN(date.getTime())) continue;

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
          return new Date(a.label).getTime() - new Date(b.label).getTime();
        }
      });
  };

  const chartData = processDateGroups(answers, interval);
  const totalResponses = chartData.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  const processDateStatistics = (
    currentChartData: ProcessedDateEntry[],
    allAnswers: AnswerEntry[]
  ) => {
    if (allAnswers.length === 0) {
      return {
        totalResponses: 0,
        numberOfActivePeriods: 0,
        averageResponsesPerPeriod: 0,
        periodWithMostResponses: "N/A",
        periodWithFewestResponses: "N/A",
        firstResponseDate: "N/A",
        lastResponseDate: "N/A",
        overallTimeSpanDays: 0,
      };
    }

    const currentTotalResponses = currentChartData.reduce((sum, entry) => sum + entry.count, 0);
    const numberOfActivePeriods = currentChartData.length;
    const averageResponsesPerPeriod =
      numberOfActivePeriods > 0 ? currentTotalResponses / numberOfActivePeriods : 0;

    let periodWithMostResponses: ProcessedDateEntry | null = null;
    let periodWithFewestResponses: ProcessedDateEntry | null = null;

    if (numberOfActivePeriods > 0) {
      periodWithMostResponses = [...currentChartData].sort((a,b) => b.count - a.count)[0];
      periodWithFewestResponses = [...currentChartData]
        .filter(entry => entry.count > 0)
        .sort((a,b) => a.count - b.count)[0];
    }

    const sortedDates = allAnswers
      .map(a => new Date(a.createdAt).getTime())
      .filter(t => !isNaN(t))
      .sort((a, b) => a - b);

    const firstResponseDateObj = sortedDates.length > 0 ? new Date(sortedDates[0]) : null;
    const lastResponseDateObj = sortedDates.length > 0 ? new Date(sortedDates[sortedDates.length - 1]) : null;

    let overallTimeSpanDays = 0;
    if (firstResponseDateObj && lastResponseDateObj) {
      const diffTime = Math.abs(lastResponseDateObj.getTime() - firstResponseDateObj.getTime());
      // +1 to include both start and end day if they are different, or 1 if same day
      overallTimeSpanDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    return {
      totalResponses: currentTotalResponses,
      numberOfActivePeriods,
      averageResponsesPerPeriod: parseFloat(averageResponsesPerPeriod.toFixed(2)),
      periodWithMostResponses: periodWithMostResponses
        ? `${periodWithMostResponses.label} (${periodWithMostResponses.count})`
        : "N/A",
      periodWithFewestResponses: periodWithFewestResponses
        ? `${periodWithFewestResponses.label} (${periodWithFewestResponses.count})`
        : "N/A",
      firstResponseDate: firstResponseDateObj?.toISOString().split("T")[0] || "N/A",
      lastResponseDate: lastResponseDateObj?.toISOString().split("T")[0] || "N/A",
      overallTimeSpanDays,
    };
  };

  const stats = processDateStatistics(chartData, answers);

  if (answers.length === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts" className="w-full">
      {/* Optional: Adjust positioning if needed, or remove className for default flow */}
      <TabsList className="absolute top-8 right-8"> 

        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>

      <TabsContent value="charts" className="space-y-4">
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
                <SelectValue placeholder="Interval Width" />
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
                {/* Consider adding bg-primary and text-white like SliderCharts if desired */}
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead>Date Period</TableHead>
                  <TableHead>Response Count</TableHead>
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
                        {totalResponses > 0
                          ? ((item.count / totalResponses) * 100).toFixed(1)
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
            <div style={{ width: "100%", height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "histogram" ? (
                  <RechartsBarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="label"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80} 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                ) : (
                  <RechartsAreaChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="label"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80} 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Area
                      dataKey="count"
                      type="monotone"
                      fill="var(--chart-1)"
                      fillOpacity={0.3}
                      stroke="var(--chart-3)"
                      strokeWidth={2}
                      dot={{
                        stroke: "var(--chart-4)",
                        strokeWidth: 2,
                        r: 3,
                        fill: "white",
                      }}
                    />
                  </RechartsAreaChart>
                )}
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="stats" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-4">
        <Stat title="Total Responses (Overall)" value={answers.length} />
        <Stat title={`Responses (Current Interval: ${interval})`} value={stats.totalResponses} />
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
        <Stat title="First Response Date" value={stats.firstResponseDate} />
        <Stat title="Last Response Date" value={stats.lastResponseDate} />
        <Stat title="Overall Timespan (Days)" value={stats.overallTimeSpanDays} />
      </TabsContent>
    </Tabs>
  );
};

// Make sure you have these components or create them:
// --- NoResponsesFallback.tsx (Example) ---
// export const NoResponsesFallback = () => (
//   <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//     <p className="text-lg font-semibold">No Responses Yet</p>
//     <p>There is no data to display at the moment.</p>
//   </div>
// );

// --- Stat.tsx (Example) ---
// type StatProps = {
//   title: string;
//   value: string | number | null | undefined;
//   classNameWrapper?: string;
// };
// export const Stat = ({ title, value, classNameWrapper }: StatProps) => (
//   <div className={`p-4 bg-gray-50 rounded-lg shadow ${classNameWrapper}`}>
//     <h3 className="text-sm font-medium text-gray-500 truncate">{title}</h3>
//     <p className="mt-1 text-2xl font-semibold text-gray-900">
//       {value !== null && value !== undefined ? String(value) : "N/A"}
//     </p>
//   </div>
// );