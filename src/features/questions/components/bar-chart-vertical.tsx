import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

type Prop = {
  processedAnswers: {
    answer: string;
    count: number;
  }[];
};

const chartConfig = {
  answer: {
    label: "Answer",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const BarChartVertical = ({ processedAnswers }: Prop) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={processedAnswers}
        margin={{ top: 16, right: 16, bottom: 40, left: 16 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis
          dataKey="answer"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <YAxis
          dataKey="count"
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />

        <ChartTooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Bar
          dataKey="count"
          radius={[4, 4, 0, 0]}
          fill="var(--chart-1)"
        >
          <LabelList
            dataKey="answer"
            position="insideTop"
            className="text-red-400 font-medium text-sm [writing-mode:vertical-lr]"
            fontSize={14}
            offset={8}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
