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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { QuestionOptionsMap } from "@/types/questions";

// Assuming QuestionOptionsMap is imported or defined in scope
// import { QuestionOptionsMap } from "./your-types-file";

type AnswerEntry = {
  id: string;
  questionId: string | null;
  createdAt: Date;
  answerText: string | null;
  answerNumber: number | null;
  answerJson: any;
};

type Props = {
  questionText: string;
  id: string; // question ID
  // Pass the specific options for this linear scale question
  questionOptions?: QuestionOptionsMap["linear_scale"];
  answers: AnswerEntry[];
};

const PIE_CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-1))", // Repeating for more potential values
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

const chartConfig = {
  value: {
    // For the scale point (e.g., 1, 2, 3, 4, 5)
    label: "Scale Point",
  },
  count: {
    // For the frequency of each scale point
    label: "Count",
    color: "hsl(var(--chart-1))", // Default color for bars
  },
} satisfies ChartConfig;

export const LinearScaleCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-vertical" | "bar-horizontal" | "pie"
  >("table");

  const processAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      const answer = item.answerText ?? item.answerNumber;
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

  const processedAnswers = processAnswerData(answers);
  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  const pieChartData = processedAnswers.filter((entry) => entry.count > 0);
  if (pieChartData.length === 0 && processedAnswers.length > 0) {
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={chartType}
          onValueChange={(value) =>
            setChartType(
              value as "table" | "bar-vertical" | "bar-horizontal" | "pie"
            )
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem>
            <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
            {pieChartData.length > 0 && (
              <SelectItem value="pie">Pie Chart</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      {chartType === "table" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Selected Option</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedAnswers.map(({ answer, count }, index) => (
              <TableRow key={index}>
                <TableCell>{answer}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>
                  {((count / answers.length) * 100).toFixed(1) ?? 0}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {chartType === "bar-horizontal" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={processedAnswers}
            layout="vertical"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="answer"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={40}
              tick={{ fontSize: 12 }}
            />
            <XAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => (
                <div className="bg-white border px-2 py-1 rounded shadow text-sm">
                  {payload?.[0] && (
                    <>
                      <div>
                        <strong>{payload[0].payload.answer}</strong>
                      </div>
                      <div>Count: {payload[0].value}</div>
                    </>
                  )}
                </div>
              )}
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
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={processedAnswers}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 60, // Increased bottom margin for rotated labels
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="answer"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45} // Rotate labels
              textAnchor="end" // Anchor rotated labels correctly
              interval={0} // Show all labels
              tickFormatter={(value) =>
                value.length > 10 ? `${value.slice(0, 10)}...` : value
              }
            />
            <YAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="count"
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
      {chartType === "pie" && processedAnswers.length > 0 && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="answer" hideLabel />}
            />
            <Pie
              data={processedAnswers}
              dataKey="count"
              nameKey="answer"
              cx="50%"
              cy="50%"
              outerRadius={80}
              strokeWidth={2}
              paddingAngle={2}
            >
              {processedAnswers.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="answer"
                className="fill-background text-xs"
                stroke="none"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};
