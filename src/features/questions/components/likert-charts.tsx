import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  question: {
    id: string;
    questionText: string;
    questionType: string;
    options: {
      scale: number;
      labels: string[];
    };
    answers: {
      id: string;
      answerText: string | null;
      answerJson: any;
      answerNumber: number | null;
      questionId: string | null;
      createdAt: Date;
    }[];
  };
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

export const LikertCharts = ({ question }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-vertical" | "bar-horizontal" | "pie"
  >("table");

  const chartConfig = {
    answer: {
      label: "Count",
    },
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const processedData = question.options.labels.map((label, index) => {
    const count = question.answers.filter(
      (a) => parseInt(a.answerNumber?.toString() ?? "") === index + 1
    ).length;

    return {
      label,
      value: count,
    };
  });

  const totalCount = processedData.reduce((acc, d) => acc + d.value, 0);

  const pieChartData = processedData.filter((d) => d.value > 0);


  return (
    <div>
      <div className="flex items-center mb-4">
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
            <SelectItem value="bar-vertical">Bar Chart (Vertical)</SelectItem>
            <SelectItem value="bar-horizontal">
              Bar Chart (Horizontal)
            </SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {chartType === "table" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.map((item) => (
              <TableRow key={item.label}>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>
                  {totalCount > 0
                    ? ((item.value / totalCount) * 100).toFixed(1)
                    : 0}
                  %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {chartType === "bar-vertical" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            width={600}
            height={300}
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" interval={0} angle={-30} textAnchor="end" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      )}

      {chartType === "bar-horizontal" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            layout="vertical"
            width={600}
            height={300}
            data={processedData}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="label" />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ChartContainer>
      )}

      {chartType === "pie" && (
        <ChartContainer config={chartConfig}>
          <PieChart width={400} height={300}>
            <Tooltip />
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(1)}%)`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};
