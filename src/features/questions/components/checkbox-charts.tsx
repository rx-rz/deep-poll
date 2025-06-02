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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
  options: QuestionOptionsMap["checkbox"];
};

export const CheckboxCharts = ({ answers, options }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar" | "horizontal" | "pie"
  >("table");

  const chartConfig = {
    option: {
      label: "Option",
    },
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  const checkboxChoices = options.choices;
  const processData = () => {
    const counts = checkboxChoices.reduce((acc, choice) => {
      acc[choice] = 0;
      return acc;
    }, {} as Record<string, number>);

    for (const a of answers) {
      for (const option of a.answerJson ?? []) {
        if (counts.hasOwnProperty(option)) {
          counts[option] += 1;
        }
      }
    }

    return Object.entries(counts)
      .map(([option, count]) => ({ option, count }))
      .filter((entry) => entry.count > 0);
  };

  const data = processData();
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#d0ed57",
    "#a4de6c",
    "#d88884",
    "#c658ff",
    "#42aaff",
  ];

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Select value={chartType} onValueChange={(v) => setChartType(v as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="bar">Bar (Vertical)</SelectItem>
            <SelectItem value="horizontal">Bar (Horizontal)</SelectItem>
            <SelectItem value="pie">Pie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {chartType === "table" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Option</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ option, count }) => (
              <TableRow key={option}>
                <TableCell>{option}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>{((count / total) * 100).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {chartType === "bar" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="option" interval={0} angle={-45} textAnchor="end" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill={chartConfig.count.color} />
          </BarChart>
        </ChartContainer>
      )}

      {chartType === "horizontal" && (
        <ChartContainer config={chartConfig}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDecimals={false} />
            <YAxis type="category" dataKey="option" />
            <Tooltip />
            <Bar dataKey="count" fill={chartConfig.count.color} />
          </BarChart>
        </ChartContainer>
      )}

      {chartType === "pie" && (
        <ChartContainer config={chartConfig}>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="option"
              outerRadius={100}
              label
            >
              {data.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};
