"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { QuestionType } from "@/types/questions";

type AnswerData = {
  id: string;
  questionId: string | null;
  createdAt: Date;
  answerText: string | null;
  answerNumber: number | null;
  answerJson: any;
};

export const description = "A horizontal bar chart";

type Props = {
  title: string;
  dataKeyOne: string;
  dataKeyTwo?: string;
  data?: AnswerData[];
  questionType: QuestionType;
};

const processAnswerData = (data: AnswerData[]) => {
  const counts = data.reduce((acc, item) => {
    const answer = item.answerText ?? item.answerNumber?.toString();
    acc[answer!] = (acc[answer!] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([answer, count]) => ({
    answer,
    count,
  }));
};

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-10)",
  },
} satisfies ChartConfig;

export function BarChartHorizontal({
  title,
  dataKeyOne,
  questionType,
  dataKeyTwo,
  data,
}: Props) {
  const chartData = processAnswerData(data ?? []);

    return (
      <div>
        <p>{title}</p>
      <ChartContainer config={chartConfig}>

        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 80,
          }}
        >
          <XAxis type="number" dataKey="count" hide />
          <YAxis
            dataKey="answer"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            className="text-lg"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={5} />
        </BarChart>
      </ChartContainer>
      </div>
    );
}
