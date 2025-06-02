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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { QuestionOptionsMap } from "@/types/questions";

type Props = {
  answers: {
    id: string;
    questionId: string | null;
    createdAt: Date;
    answerText: string | null;
    answerNumber: number | null;
    answerJson: any;
  }[];

    options: QuestionOptionsMap["slider"]
};

export const SliderCharts = ({ answers, options }: Props) => {
  const [chartType, setChartType] = useState<"table" | "bar-vertical" | "bar-horizontal" | "pie">("table");

  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
    count: {
      label: "Count",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const processData = () => {
    const { min, max } = options;
    const counts: Record<number, number> = {};

    for (let i = min; i <= max; i++) {
      counts[i] = 0;
    }

    for (const answer of answers) {
      if (answer.answerNumber !== null) {
        const value = Number(answer.answerNumber);
        if (!isNaN(value) && value >= min && value <= max) {
          counts[value] += 1;
        }
      } else if (Array.isArray(answer.answerJson) && answer.answerJson.length === 2) {
        const [start, end] = answer.answerJson.map(Number);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          const range = end - start + 1;
          for (let i = start; i <= end; i++) {
            if (i >= min && i <= max) {
              counts[i] += 1 / range;
            }
          }
        }
      }
    }

    const data = Object.entries(counts)
      .map(([value, count]) => ({ value: Number(value), count }))
      .filter((entry) => entry.count > 0);

    return {
      data,
      total: data.reduce((sum, d) => sum + d.count, 0),
    };
  };

  const { data, total } = processData();

  return (
    <div>
      <Select value={chartType} onValueChange={(v) => setChartType(v as any)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chart Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="table">Table</SelectItem>
          <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem>
          <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
          <SelectItem value="pie">Pie</SelectItem>
        </SelectContent>
      </Select>

      {chartType === "table" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Value</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d.value}>
                <TableCell>{d.value}</TableCell>
                <TableCell>{d.count.toFixed(1)}</TableCell>
                <TableCell>{((d.count / total) * 100).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {(chartType === "bar-vertical" || chartType === "bar-horizontal") && (
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              layout={chartType === "bar-horizontal" ? "vertical" : "horizontal"}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {chartType === "bar-horizontal" ? (
                <>
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="value" />
                </>
              ) : (
                <>
                  <XAxis dataKey="value" />
                  <YAxis allowDecimals={false} />
                </>
              )}
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}

      {chartType === "pie" && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="value"
              outerRadius={100}
              label={({ value }) => value}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={`hsl(var(--chart-${(index % 6) + 1}))`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
