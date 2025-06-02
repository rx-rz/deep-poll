import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
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

const PIE_CHART_COLORS = [
  "red",
  "green",
  "blue",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  // Add more colors if you expect many segments
];

const getDomainFromEmail = (email: string): string | null => {
  if (!email || typeof email !== "string") {
    return null;
  }
  const parts = email.split("@");
  if (parts.length === 2 && parts[1]) {
    return parts[1].toLowerCase();
  }
  return null;
};

type EmailProcessMode = "domain" | "full_email";

const chartConfig = {
  answer: {
    label: "Answer",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const EmailCharts = ({ answers, id, questionText }: Props) => {
  const processEmailAnswerData = (
    data: typeof answers,
    mode: EmailProcessMode = "domain"
  ) => {
    const counts: Record<string, number> = {};

    data.forEach((item) => {
      if (item.answerText !== null) {
        let key: string | null = null;

        if (mode === "domain") {
          if (item.answerText.includes("@")) {
            key = getDomainFromEmail(item.answerText);
          }
        } else if (mode === "full_email") {
          key = item.answerText.trim().toLowerCase();
        }

        if (key) {
          counts[key] = (counts[key] || 0) + 1;
        }
      }
    });

    return Object.entries(counts).map(([value, count]) => ({
      value, // Renamed 'answer' to 'value' for more generic output
      count,
    }));
  };

  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  const [processMode, setProcessMode] = useState<EmailProcessMode>("domain");

  const processedAnswers =
    processMode === "full_email"
      ? processEmailAnswerData(answers, "full_email")
      : processEmailAnswerData(answers, "domain");

  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );
  
  return (
    <div>
      <div className="flex">
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
            {processMode === "domain" && (
              <SelectItem value="pie">Pie Chart</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setProcessMode(value as EmailProcessMode)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Email Process Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="domain">Domain</SelectItem>
            <SelectItem value="full_email">Full Email</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            {processedAnswers.map(({ value, count }, index) => (
              <TableRow key={id}>
                <TableCell>{value}</TableCell>
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
