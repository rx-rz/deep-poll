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

export const BarChartHorizontal = ({ processedAnswers }: Prop) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={processedAnswers}
        layout="vertical"
        margin={{ top: 16, right: 16, bottom: 16, left: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />

        <YAxis
          dataKey="answer"
          type="category"
          tickLine={false}
          tickMargin={10}
          width={80}
        />
        <XAxis
          type="number"
          label={"Count"} 
          tick={{ fontSize: 12 }}
        />

        <ChartTooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Bar dataKey="count" fill="#256EFF" radius={[4, 4, 4, 4]}>
          <LabelList
            dataKey="answer"
            position="insideLeft"
            fill="#fff"
            fontSize={14}
            offset={10}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
