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
          tick={false}
          type="category"
          tickMargin={10}
        />

        <YAxis dataKey="count" type="number" tick={{ fontSize: 12 }} />

        <ChartTooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="var(--chart-1)">
          <LabelList
            dataKey="answer"
            fill="var(--border)"
            position="insideTop"
            className=" font-medium text-xs pt-6"
            fontSize={14}
            offset={8}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
