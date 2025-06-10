import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Removed TableCaption as it's not in the TextCharts pattern
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts"; // Removed LabelList and ResponsiveContainer as they are not used directly here
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoResponsesFallback } from "./no-responses-fallback"; // Assuming this path is correct
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stat } from "./stat"; // Assuming this path is correct

type Props = {
  questionText: string;
  id: string;
  answers: {
    id: string;
    questionId: string | null;
    createdAt: Date;
    answerText: string | null;
    answerNumber: number | null;
    answerJson: any;
  }[];
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))", // Using hsl for consistency with other charts
  },
} satisfies ChartConfig;

export const NumberCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "histogram" | "scatter" | "line"
  >("table"); // Removed bar chart options from here

  const processNumberAnswerData = (data: typeof answers) => {
    const numbers = data
      .filter((item) => item.answerNumber !== null)
      .map((item) => ({
        value: item.answerNumber!,
        createdAt: item.createdAt,
        id: item.id,
      }))
      .sort((a, b) => a.value - b.value); // Sort for median calculation

    return numbers;
  };

  const createHistogramData = (
    numbers: { value: number }[],
    bins: number = 10
  ) => {
    if (numbers.length === 0) return [];

    const values = numbers.map((n) => n.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Ensure binWidth is not zero if min === max
    const binWidth = (max - min) === 0 ? 1 : (max - min) / bins;

    const histogram = Array.from({ length: bins }, (_, i) => ({
      binStart: min + i * binWidth,
      binEnd: min + (i + 1) * binWidth,
      count: 0,
      label: `${(min + i * binWidth).toFixed(1)}-${(
        min +
        (i + 1) * binWidth
      ).toFixed(1)}`,
    }));

    values.forEach((value) => {
      // Correctly place values into bins, handling edge cases for max value
      const binIndex = value === max && max > min
        ? bins - 1
        : Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });

    return histogram;
  };

  const createScatterData = (
    numbers: { value: number; createdAt: Date; id: string }[]
  ) => {
    // For scatter plot, we often want the x-axis to represent time or order of response
    // Using index + 1 for simple sequential order if no specific time scale is desired yet
    return numbers.map((item, index) => ({
      x: index + 1, // Order of response
      y: item.value,
      createdAt: item.createdAt,
      id: item.id,
    }));
  };

  const calculateStats = (numbers: { value: number }[]) => {
    if (numbers.length === 0) return null;

    const values = numbers.map((n) => n.value).sort((a, b) => a - b);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;

    const median =
      values.length % 2 === 0
        ? (values[values.length / 2 - 1] + values[values.length / 2]) / 2
        : values[Math.floor(values.length / 2)];

    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      values.length;
    const stdDev = Math.sqrt(variance);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    // Quartiles are not typically displayed in single Stat components,
    // but useful for box plots or more detailed summary statistics.
    // const q1 = values[Math.floor(values.length * 0.25)];
    // const q3 = values[Math.floor(values.length * 0.75)];

    return {
      totalResponses: values.length, // Renamed count to totalResponses for consistency
      mean: parseFloat(mean.toFixed(2)),
      median: parseFloat(median.toFixed(2)), // Fix median calculation logic, ensure fixed to 2 decimal places
      stdDev: parseFloat(stdDev.toFixed(2)),
      min: parseFloat(min.toFixed(2)),
      max: parseFloat(max.toFixed(2)),
      range: parseFloat(range.toFixed(2)),
    };
  };

  const processedNumbers = processNumberAnswerData(answers);
  const histogramData = createHistogramData(processedNumbers);
  const scatterData = createScatterData(processedNumbers);
  const stats = calculateStats(processedNumbers);

  if (processedNumbers.length === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts">
      <TabsList className="absolute right-8 top-8 ">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="charts">
        <Select
          onValueChange={(value) =>
            setChartType(
              value as "table" | "histogram" | "scatter" | "line"
            )
          }
        >
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="histogram">Histogram</SelectItem>
            <SelectItem value="scatter">Scatter Plot</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
          </SelectContent>
        </Select>

        {chartType === "table" && (
          <Table className="border">
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">N/O</TableHead>
                <TableHead className="text-white">Value</TableHead>
                <TableHead className="text-white">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedNumbers.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {chartType === "histogram" && (
          <div>
            <p className="mb-4 text-sm font-semibold">{questionText}</p>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={histogramData}
                className="border"
                margin={{ bottom: 16, right: 16 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  interval={0} // Ensure all labels are shown if space allows
                />
                <YAxis dataKey="count" /> {/* YAxis should be for count */}
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [value, "Count"]} // Show count in tooltip
                  labelFormatter={(label) => `Range: ${label}`}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        )}

        {chartType === "scatter" && (
          <div>
            <p className="mb-4 text-sm font-semibold">{questionText}</p>
            <ChartContainer config={chartConfig}>
              <ScatterChart
                data={scatterData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Response Order"
                  domain={["dataMin", "dataMax"]}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Value"
                  domain={["dataMin", "dataMax"]}
                />
                <ChartTooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [
                    value,
                    name === "y" ? "Value" : "Order", // Clean up tooltip names
                  ]}
                />
                <Scatter dataKey="y" fill="hsl(var(--chart-1))" />
              </ScatterChart>
            </ChartContainer>
          </div>
        )}

        {chartType === "line" && (
          <div>
            <p className="mb-4 text-sm font-semibold">{questionText}</p>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={scatterData} // Line chart also uses sequential data like scatter
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Response Order" />
                <YAxis dataKey="y" name="Value" /> {/* Specify dataKey for YAxis */}
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [value, name === "y" ? "Value" : "Order"]} // Clean up tooltip names
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="hsl(var(--chart-1))" // Consistent color
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        )}
      </TabsContent>

      <TabsContent value="stats" className="grid-cols-3 grid gap-12">
        {stats && (
          <>
            <Stat title="Total Responses" value={stats.totalResponses} />
            <Stat title="Mean" value={stats.mean} />
            <Stat title="Median" value={stats.median} />
            <Stat title="Standard Deviation" value={stats.stdDev} />
            <Stat title="Minimum Value" value={stats.min} />
            <Stat title="Maximum Value" value={stats.max} />
            <Stat title="Range" value={stats.range} />
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};