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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

type Props = {
  questionText: string;
  id: string; // question ID
  answers: {
    id: string; // answer ID
    questionId: string | null;
    createdAt: Date;
    answerText: string | null;
    answerNumber: number | null;
    answerJson: any;
  }[];
};

const PIE_CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  // Add more colors if you expect many segments
];

// Chart configuration
const chartConfig = {
  answer: { // This key should match the 'nameKey' or 'dataKey' for categorical data
    label: "Count",
  },
  count: { // This key should match the 'dataKey' for numerical/value data
    label: "Count",
    color: "hsl(var(--chart-1))", // Default color for bars if not overridden
  },
} satisfies ChartConfig;


export const DropdownCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  // Process answers for dropdown questions
  // This is very similar to multiple choice
  const processDropdownAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      // For dropdown, the selected value is typically in answerText
      const answer = item.answerText;
      if (answer) {
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([answer, count]) => ({
      answer, // The selected dropdown option
      count,  // The frequency of this option
    }));
  };

  const processedAnswers = processDropdownAnswerData(answers);
  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={chartType}
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
            <SelectItem value="pie">Pie Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {chartType === "table" && (

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Selected Option</TableHead>
                <TableHead >Count</TableHead>
                <TableHead >Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.length > 0 ? (
                processedAnswers.map((item) => (
                  <TableRow key={item.answer}>
                    <TableCell className="font-medium">
                      {item.answer}
                    </TableCell>
                    <TableCell >{item.count}</TableCell>
                    <TableCell >
                      {totalCount > 0
                        ? ((item.count / totalCount) * 100).toFixed(1)
                        : 0}
                      %
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      )}

      {chartType === "bar-horizontal" && processedAnswers.length > 0 && (
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={processedAnswers}
            layout="vertical"
            margin={{
              left: 10, // Adjusted for potentially longer labels
              right: 30, // Space for count labels
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="answer"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              width={120} // Give more space for Y-axis labels
              tickFormatter={(value) =>
                value.length > 15 ? `${value.slice(0, 15)}...` : value
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={4}>
              <LabelList
                dataKey="count" // Show the count on the bar
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
      {chartType === "bar-horizontal" && processedAnswers.length === 0 && (
         <div className="text-center py-10">No data to display for Bar (Horizontal) chart.</div>
      )}


      {chartType === "bar-vertical" && processedAnswers.length > 0 && (
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
                value.length > 10 ? `${value.slice(0,10)}...` : value
              }
            />
            <YAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]}>
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
      {chartType === "bar-vertical" && processedAnswers.length === 0 && (
         <div className="text-center py-10">No data to display for Bar (Vertical) chart.</div>
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
       {chartType === "pie" && processedAnswers.length === 0 && (
         <div className="text-center py-10">No data to display for Pie chart.</div>
      )}

      {processedAnswers.length === 0 && chartType !== "table" && (
        <div className="text-center py-10 text-gray-500">
          No data available to render the selected chart.
        </div>
      )}
    </div>
  );
};