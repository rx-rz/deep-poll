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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const PIE_CHART_COLORS = [
  "red",
  "green",
  "blue",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",

];

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const MultipleChoiceCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  const processMultipleChoiceAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      const answer = item.answerText ?? item.answerNumber; // The selected choice
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

  const chartConfig = {
    answer: {
      label: "Answer",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const processedAnswers = processMultipleChoiceAnswerData(answers);
  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );
  return (
    <div>
      <div>
        <Select
          onValueChange={(value) =>
            setChartType(
              value as "table" | "bar-horizontal" | "bar-vertical" | "pie"
            )
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
            <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem>
            <SelectItem value="pie">Pie</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {chartType === "bar-horizontal" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={processedAnswers}
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
              hide
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
                className="text-lg"
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
            data={processedAnswers}
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
      )}
      {chartType === "pie" && (
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie
              data={processedAnswers}
              dataKey="count" // The value that determines slice size
              nameKey="value" // The key for the label (domain/email)
              stroke="var(--chart-background)"
              paddingAngle={2}
              startAngle={90} // Start from top
              endAngle={450} // Go full circle
            >
              {/* Assign colors to each slice */}
              {processedAnswers.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <LabelList
              dataKey="count"
              position="inside"
              formatter={(value: number, entry: any) => {
                // Calculate percentage
                const percentage =
                  totalCount > 0 ? ((value / totalCount) * 100).toFixed(1) : 0;
                return `${entry.payload.value} (${percentage}%)`;
              }}
              className="text-white border"
              offset={10}
            />
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};
