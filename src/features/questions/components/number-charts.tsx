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
} from "@/components/ui/table";
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
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoResponsesFallback } from "./no-responses-fallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stat } from "./stat";

type Props = {
  questionText: string;
  id: string;
  answers: {
    id: string;
    questionId: string | null;
    createdAt: Date | string; // Allow string for createdAt to reflect real-world data
    answerText: string | null;
    answerNumber: number | string | null; // Allow string for answerNumber
    answerJson: any;
  }[];
};

const chartConfig = {
  value: {
    label: "Value",
    color: "#256EFF",
  },
  count: {
    label: "Count",
    color: "#256EFF",
  },
} satisfies ChartConfig;

export const NumberCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "histogram" | "scatter" | "line"
  >("table");

  // Corrected processNumberAnswerData function
  const processNumberAnswerData = (
    inputAnswers: Props['answers']
  ): { value: number; createdAt: Date; id: string }[] => {
    const processed = inputAnswers
      .filter(item => item.answerNumber !== null && item.answerNumber !== undefined)
      .map((item) => {
        let numericValue: number | null = null;
        if (typeof item.answerNumber === 'string') {
          numericValue = parseFloat(item.answerNumber);
        } else if (typeof item.answerNumber === 'number') {
          numericValue = item.answerNumber;
        }

        const dateValue = item.createdAt instanceof Date
          ? item.createdAt
          : new Date(item.createdAt); // Works for ISO strings

        return {
          id: item.id,
          value: numericValue,
          createdAt: dateValue,
        };
      })
      .filter(item =>
        item.value !== null &&
        !isNaN(item.value) &&
        item.createdAt instanceof Date &&
        !isNaN(item.createdAt.getTime())
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return processed as { value: number; createdAt: Date; id: string }[];
  };


  const createHistogramData = (
    numbers: { value: number }[],
    bins: number = 10
  ) => {
    if (numbers.length === 0) return [];

    const values = numbers.map((n) => n.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    if (min === max) {
      return [{
        binStart: min,
        binEnd: min,
        count: values.length,
        label: min.toString(),
      }];
    }

    const binWidth = (max - min) / bins;
    const histogram = Array.from({ length: bins }, (_, i) => {
      const binStart = min + i * binWidth;
      const binEnd = min + (i + 1) * binWidth;
      return {
        binStart,
        binEnd,
        count: 0,
        label: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`,
      };
    });

    values.forEach((value) => {
      const binIndex = value === max ? bins - 1 : Math.floor((value - min) / binWidth);
      const safeIndex = Math.max(0, Math.min(binIndex, bins - 1));
      histogram[safeIndex].count++;
    });

    return histogram;
  };

  const createTimeSeriesData = (
    numbers: { value: number; createdAt: Date; id: string }[]
  ) => {
    return numbers.map((item, index) => ({
      index: index + 1,
      value: item.value,
      createdAt: item.createdAt,
      id: item.id,
      dateLabel: item.createdAt.toLocaleDateString(),
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

    const q1Index = Math.floor(values.length * 0.25);
    const q3Index = Math.floor(values.length * 0.75);
    const q1 = values[q1Index];
    const q3 = values[q3Index];
    const iqr = q3 - q1;

    const coefficientOfVariation = mean !== 0 ? (stdDev / Math.abs(mean)) * 100 : 0;

    const skewness = stdDev !== 0 ? 
      values.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 3), 0) / values.length : 0;

    return {
      totalResponses: values.length,
      mean: parseFloat(mean.toFixed(2)),
      median: parseFloat(median.toFixed(2)),
      stdDev: parseFloat(stdDev.toFixed(2)),
      min: parseFloat(min.toFixed(2)),
      max: parseFloat(max.toFixed(2)),
      range: parseFloat(range.toFixed(2)),
      q1: parseFloat(q1.toFixed(2)),
      q3: parseFloat(q3.toFixed(2)),
      iqr: parseFloat(iqr.toFixed(2)),
      coefficientOfVariation: parseFloat(coefficientOfVariation.toFixed(2)),
      skewness: parseFloat(skewness.toFixed(2)),
    };
  };

  const processedNumbers = processNumberAnswerData(answers);
  const histogramData = createHistogramData(processedNumbers);
  const timeSeriesData = createTimeSeriesData(processedNumbers);
  const stats = calculateStats(processedNumbers);

  if (processedNumbers.length === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts" defaultChecked>
      <TabsList className="absolute right-8 top-8">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>
      
      <TabsContent value="charts">
        <Select
          value={chartType}
          onValueChange={(value) =>
            setChartType(value as "table" | "histogram" | "scatter" | "line")
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
                <TableHead className="text-white">Response #</TableHead>
                <TableHead className="text-white">Value</TableHead>
                <TableHead className="text-white">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedNumbers.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {chartType === "histogram" && (
          <div>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={histogramData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                width={600}
                height={400}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  interval={0}
                />
                <YAxis 
                  allowDecimals={false}
                  label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [value, "Count"]}
                  labelFormatter={(label) => `Range: ${label}`}
                />
                <Bar 
                  dataKey="count" 
                  fill="#256EFF" 
                  radius={[4, 4, 0, 0]}
                  stroke="#0D1821"
                  strokeWidth={1}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}

        {chartType === "scatter" && (
          <div>
            <ChartContainer config={chartConfig}>
              <ScatterChart
                data={timeSeriesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                width={600}
                height={400}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="index"
                  name="Response Order"
                  domain={["dataMin", "dataMax"]}
                  label={{ value: 'Response Order', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  type="number"
                  dataKey="value"
                  name="Value"
                  domain={["dataMin - 1", "dataMax + 1"]}
                  label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [
                    value,
                    name === "value" ? "Value" : "Response Order",
                  ]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `Date: ${payload[0].payload.dateLabel}`;
                    }
                    return `Response: ${label}`;
                  }}
                />
                <Scatter 
                  dataKey="value" 
                  fill="#256EFF"
                  stroke="#0D1821"
                  strokeWidth={1}
                />
              </ScatterChart>
            </ChartContainer>
          </div>
        )}

        {chartType === "line" && (
          <div>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={timeSeriesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                width={600}
                height={400}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="index" 
                  label={{ value: 'Response Order', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  dataKey="value"
                  label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [value, "Value"]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `Date: ${payload[0].payload.dateLabel}`;
                    }
                    return `Response: ${label}`;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#256EFF"
                  strokeWidth={2}
                  dot={{ 
                    fill: "#256EFF", 
                    strokeWidth: 2, 
                    r: 4,
                    stroke: "#0D1821"
                  }}
                  activeDot={{ 
                    r: 6, 
                    fill: "#4d82ff",
                    stroke: "#0D1821",
                    strokeWidth: 2
                  }}
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
            <Stat title="Q1 (25th Percentile)" value={stats.q1} />
            <Stat title="Q3 (75th Percentile)" value={stats.q3} />
            <Stat title="Interquartile Range" value={stats.iqr} />
            <Stat title="Coefficient of Variation" value={`${stats.coefficientOfVariation}%`} />
            <Stat title="Skewness" value={stats.skewness} />
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};