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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type Props = {
  answers: {
    id: string; // answer ID
    questionId: string | null;
    createdAt: Date;
    answerText: string | null;
    answerNumber: number | null;
    answerJson: any;
  }[];
};
export const TimeCharts = ({ answers }: Props) => {
  const [chartType, setChartType] = useState<"table" | "area" | "histogram">(
    "table"
  );
  const [intervalWidth, setIntervalWidth] = useState("2");

  const chartConfig = {
    answer: {
      // This key should match the 'nameKey' or 'dataKey' for categorical data
      label: "Count",
    },
    count: {
      // This key should match the 'dataKey' for numerical/value data
      label: "Count",
      color: "hsl(var(--chart-1))", // Default color for bars if not overridden
    },
  } satisfies ChartConfig;

  const processAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      const answer = item.answerText;
      if (answer) {
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([answer, count]) => ({
      answer,
      count,
    }));
  };

  const processedAnswers = processAnswerData(answers);
  const processHistogramData = (
    data: typeof answers,
    intervalWidth: number
  ) => {
    const numBins = 24 / intervalWidth;

    const bins = Array.from({ length: numBins }, (_, i) => {
      const startHour = i * intervalWidth;
      const endHour = startHour + intervalWidth;
      return {
        label: `${startHour}:00–${endHour}:00`,
        count: 0,
      };
    });

    for (const item of data) {
      const timeStr = item.answerText;
      if (!timeStr) continue;

      const [hourStr] = timeStr.split(":");
      const hour = parseInt(hourStr, 10);
      if (isNaN(hour) || hour < 0 || hour > 23) continue;

      const binIndex = Math.floor(hour / intervalWidth);
      if (binIndex >= 0 && binIndex < bins.length) {
        bins[binIndex].count += 1;
      }
    }

    return bins;
  };

  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );
  const processedHistogramAnswers = processHistogramData(
    answers,
    Number(intervalWidth)
  );
  return (
    <div>
      <div className="flex items-center">
        <Select
          value={chartType}
          onValueChange={(value) =>
            setChartType(value as "table" | "area" | "histogram")
          }
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
        {chartType === "histogram" ||
          (chartType === "area" && (
            <Select
              value={intervalWidth.toString()}
              onValueChange={(value) => setIntervalWidth(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interval Width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Every 2 hours</SelectItem>
                <SelectItem value="1">Hourly</SelectItem>
                <SelectItem value="4">Every 4 hours</SelectItem>
              </SelectContent>
            </Select>
          ))}
      </div>
      <div>
        {chartType === "table" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Selected Option</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.length > 0 ? (
                processedAnswers.map((item) => (
                  <TableRow key={item.answer}>
                    <TableCell className="font-medium">{item.answer}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>
                      {totalCount > 0
                        ? ((item.count / totalCount) * 100).toFixed(1)
                        : 0}
                      %
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        {chartType === "histogram" && (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={processedHistogramAnswers}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                angle={-45}
                textAnchor="end"
                interval={0}
                tickMargin={10}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
        {chartType === "area" && (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={processedHistogramAnswers} // Use histogram data grouped by time bins
              margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label" // your bins' label like "0:00–2:00"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0} // show all labels
                angle={-45} // rotate labels to fit nicely
                textAnchor="end"
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--color-desktop)", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="count"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.3}
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  stroke: "var(--color-desktop)",
                  strokeWidth: 2,
                  r: 3,
                  fill: "white",
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};
