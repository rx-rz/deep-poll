import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

type ChartProps = {
  processedAnswers: Array<{ answer: string | number; count: number }>;
};

const chartConfig = {
  answer: { label: "Scale Point" },
  count: { label: "Count", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export const LineChartComponent = ({ processedAnswers }: ChartProps) => {
  if (processedAnswers.length === 0) {
    return (
      <div className="text-center py-10">
        No data to display for Line chart.
      </div>
    );
  }

  // Sort data by answer (scale point) to ensure the line chart connects points in correct order
  const sortedData = [...processedAnswers].sort(
    (a, b) => Number(a.answer) - Number(b.answer)
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          accessibilityLayer
          data={sortedData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="answer"
            type="number" // Use type="number" for linear scale points
            domain={["dataMin", "dataMax"]} // Ensure full range is shown
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            allowDecimals={false} // Linear scale points are typically integers
          />
          <YAxis dataKey="count" type="number" allowDecimals={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="count"
            type="monotone" // Smoothed line
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={{
              fill: "var(--chart-4)",
              stroke: "var(--chart-3)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              stroke: "var(--chart-4)",
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
