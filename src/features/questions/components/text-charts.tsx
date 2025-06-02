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
import { QuestionType } from "@/types/questions";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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
  questionType: QuestionType;
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
  answer: {
    label: "Answer",
    color: "var(--chart-2)",
  },

} satisfies ChartConfig;
export const TextCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical"
  >("table");

  const processTextAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      if (item.answerText !== null) {
        const answer = item.answerText;
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([answer, count]) => ({
      answer,
      count,
    }));
  };

  const processedAnswers = processTextAnswerData(answers);

  return (
    <div>
      <Select
        onValueChange={(value) =>
          setChartType(value as "table" | "bar-horizontal" | "bar-vertical")
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chart Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="table">Table</SelectItem>
          <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
          <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem>
        </SelectContent>
      </Select>
      {chartType === "table" && (
        <Table>
          <TableCaption>{questionText}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Answer</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedAnswers.map(({ answer, count }, index) => (
              <TableRow key={id}>
                <TableCell>{answer}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>
                  {new Date(answers[index].createdAt).toDateString() ?? ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {chartType === "bar-horizontal" && (
        <div>
          <p>{questionText}</p>
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
              <Bar
                dataKey="count"
                layout="vertical"
                fill="var(--color-desktop)"
                radius={4}
              >
                <LabelList
                  dataKey="answer"
                  position="insideLeft"
                  className="text-white"
                  fontSize={16}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      )}
      {chartType === "bar-vertical" && (
        <div>
          <p>{questionText}</p>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={processedAnswers}
              margin={{ bottom: 16 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="answer"
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
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="answer"
                  position="inside"
                  className="text-red-400 font-medium  text-sm [writing-mode:vertical-lr]" 
                  fontSize={16}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};
