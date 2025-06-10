import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

type ProcessedAnswer = {
  answer: string | number;
  count: number;
};

type Props = {
  processedAnswers: ProcessedAnswer[];
};

const PIE_CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const chartConfig = {
  answer: {
    label: "Answer",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const renderInsideLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  answer,
  count,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if slice is big enough (>5% of total)
  if (percent < 0.05) return null;

  const percentage = (percent * 100).toFixed(1);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      <tspan x={x} dy="-8">
        {answer}
      </tspan>
      <tspan x={x} dy="15">
        {count} ({percentage}%)
      </tspan>
    </text>
  );
};

export const PieChartComponent = ({ processedAnswers }: Props) => {
  return (
    <ChartContainer config={chartConfig} className="mx-auto">
      <PieChart width={500} height={500}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={processedAnswers}
          dataKey="count"
          nameKey="answer"
          cx="50%"
          cy="50%"
          outerRadius={160}

          startAngle={90}
          endAngle={450}
          stroke="var(--chart-background)"
          strokeWidth={2}
          labelLine={false}
          label={renderInsideLabel}
        >
          {processedAnswers.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};