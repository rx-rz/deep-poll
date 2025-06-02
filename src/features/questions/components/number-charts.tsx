import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
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
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
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
    color: "var(--chart-1)",
  },
//   count: {
//     label: "Count",
//     color: "var(--chart-2)",
//   },
} satisfies ChartConfig;

export const NumberCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "histogram" | "scatter" | "line" | "stats" | "bar-horizontal" | "bar-vertical"
  >("table");

  const processNumberAnswerData = (data: typeof answers) => {
    // Filter out null values and extract numbers
    const numbers = data
      .filter((item) => item.answerNumber !== null)
      .map((item) => ({
        value: item.answerNumber!,
        createdAt: item.createdAt,
        id: item.id,
      }))
      .sort((a, b) => a.value - b.value);

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
    const binWidth = (max - min) / bins;

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
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });

    return histogram;
  };

  const createScatterData = (
    numbers: { value: number; createdAt: Date; id: string }[]
  ) => {
    return numbers.map((item, index) => ({
      x: index + 1,
      y: item.value,
      createdAt: item.createdAt,
      id: item.id,
    }));
  };

const processNumberAnswerDataDiscrete = (data: typeof answers) => {
  const counts = data.reduce((acc, item) => {
    if (item.answerNumber !== null) {
      const answer = item.answerNumber.toString(); // Convert to string for key
      acc[answer] = (acc[answer] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([answer, count]) => ({
    answer: parseFloat(answer), // Convert back to number if needed for charts
    count,
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

    const q1 = values[Math.floor(values.length * 0.25)];
    const q3 = values[Math.floor(values.length * 0.75)];

    return {
      count: values.length,
      mean: mean.toFixed(2),
      median: (mean / values.length),
      stdDev: stdDev.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
      range: range.toFixed(2),

    };
  };

  const processedNumbers = processNumberAnswerData(answers);
  const histogramData = createHistogramData(processedNumbers);
  const scatterData = createScatterData(processedNumbers);
  const stats = calculateStats(processedNumbers);
  const processedNumbersDiscrete = processNumberAnswerDataDiscrete(answers);
  return (
    <div>
      <Select
        onValueChange={(value) =>
          setChartType(
            value as "table" | "histogram" | "scatter" | "line" | "stats" | "bar-horizontal" | "bar-vertical"
          )
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chart Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="table">Table</SelectItem>
          {/* <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
          <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem> */}
          <SelectItem value="histogram">Histogram</SelectItem>
          <SelectItem value="scatter">Scatter Plot</SelectItem>
          <SelectItem value="line">Line Chart</SelectItem>
          <SelectItem value="stats">Statistics</SelectItem>
        </SelectContent>
      </Select>
      {/* {chartType === "bar-horizontal" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={processedNumbersDiscrete}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="answer"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}

            />
            <XAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" layout="vertical">
              <LabelList
                dataKey="value"
                position="insideLeft"
                className="text-lg text-white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
      {chartType === "bar-vertical" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={processedNumbersDiscrete}
            margin={{ bottom: 16 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="value"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="value"
                position="middle"
                className="text-red-400 text-sm font-medium [writing-mode:vertical-lr]"
                fontSize={16}
                offset={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )} */}
      {chartType === "table" && (
        <Table>
          <TableCaption>{questionText}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>N/O</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Created At</TableHead>
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
          <p className="mb-4">{questionText}</p>
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
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => [value]}
                labelFormatter={(label) => `Range: ${label}`}
              />
              <Bar dataKey="count" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      )}

      {chartType === "scatter" && (
        <div>
          <p className="mb-4">{questionText}</p>
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
                  name === "y" ? " Value" : " Order",
                ]}
              />
              <Scatter dataKey="y" fill="var(--color-value)" />
            </ScatterChart>
          </ChartContainer>
        </div>
      )}

      {chartType === "line" && (
        <div>
          <p className="mb-4">{questionText}</p>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={scatterData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="Response Order" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value) => [value]}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={{ fill: "var(--color-value)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      )}

      {chartType === "stats" && stats && (
        <div>
          <p className="mb-4 font-semibold">{questionText}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Count</h3>
              <p className="text-2xl font-bold">{stats.count}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Mean</h3>
              <p className="text-2xl font-bold">{stats.mean}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Median</h3>
              <p className="text-2xl font-bold">{stats.median}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Std Dev</h3>
              <p className="text-2xl font-bold">{stats.stdDev}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Min</h3>
              <p className="text-2xl font-bold">{stats.min}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Max</h3>
              <p className="text-2xl font-bold">{stats.max}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-sm text-gray-600">Range</h3>
              <p className="text-2xl font-bold">{stats.range}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
