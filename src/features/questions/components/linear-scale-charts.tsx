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
  questionOptions?: QuestionOptionsMap['linear_scale'];
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
  value: { // For the scale point (e.g., 1, 2, 3, 4, 5)
    label: "Scale Point",
  },
  count: { // For the frequency of each scale point
    label: "Count",
    color: "hsl(var(--chart-1))", // Default color for bars
  },
} satisfies ChartConfig;

export const LinearScaleCharts = ({
  answers,
  id,
  questionText,
  questionOptions,
}: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-vertical" | "bar-horizontal" | "pie"
  >("table");

  const processLinearScaleAnswerData = (
    data: typeof answers,
    options?: QuestionOptionsMap['linear_scale']
  ) => {
    const counts = data.reduce((acc, item) => {
      const value = item.answerNumber;
      if (value !== null && typeof value === 'number') {
        const key = value.toString();
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    let processedData: { value: number; count: number; label?: string }[] = [];

    if (options && typeof options.min === 'number' && typeof options.max === 'number') {
      for (let i = options.min; i <= options.max; i++) {
        let pointLabel = i.toString();
        if (i === options.min && options.labels?.start) {
          pointLabel = `${i} (${options.labels.start})`;
        } else if (i === options.max && options.labels?.end) {
          pointLabel = `${i} (${options.labels.end})`;
        }
        processedData.push({
          value: i,
          count: counts[i.toString()] || 0,
          label: pointLabel, // For display on axes
        });
      }
    } else {
      // Fallback if no options provided (though less ideal for linear scale)
      processedData = Object.entries(counts)
        .map(([valueStr, count]) => ({
          value: parseInt(valueStr, 10),
          count,
          label: valueStr,
        }))
        .sort((a, b) => a.value - b.value);
    }
    return processedData;
  };

  const processedAnswers = processLinearScaleAnswerData(answers, questionOptions);
  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  // Filter out zero-count items for Pie chart to avoid clutter, unless it's the only item
  const pieChartData = processedAnswers.filter(entry => entry.count > 0);
  if (pieChartData.length === 0 && processedAnswers.length > 0) {
    // If all are zero, pie chart will be empty, which is fine
  }


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{questionText}</h3>
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
            {pieChartData.length > 0 && <SelectItem value="pie">Pie Chart</SelectItem>}
          </SelectContent>
        </Select>
      </div>

      {chartType === "table" && (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <Table>
            <TableCaption>Responses for: {questionText}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Scale Point</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.length > 0 ? (
                processedAnswers.map((item) => (
                  <TableRow key={item.value}>
                    <TableCell className="font-medium">
                      {item.label || item.value}
                    </TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                    <TableCell className="text-right">
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
        </ChartContainer>
      )}

      {chartType === "bar-vertical" && processedAnswers.length > 0 && (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={processedAnswers}
            margin={{
                top: 20, // Space for labels on top of bars
                right: 20,
                left: 10,
                bottom: questionOptions?.labels?.start || questionOptions?.labels?.end ? 80 : 40, // More space if labels are long
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label" // Use the generated label (e.g., "1 (Start)", "2", "3 (End)")
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={ (processedAnswers.length > 7 && (questionOptions?.labels?.start || questionOptions?.labels?.end)) ? -45 : 0}
              textAnchor={ (processedAnswers.length > 7 && (questionOptions?.labels?.start || questionOptions?.labels?.end)) ? "end" : "middle"}
              interval={0} // Show all scale points
              height={ (processedAnswers.length > 7 && (questionOptions?.labels?.start || questionOptions?.labels?.end)) ? 70 : 30}
            />
            <YAxis dataKey="count" type="number" allowDecimals={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey="count"
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => (value > 0 ? value : "")} // Hide label if count is 0
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}

      {chartType === "bar-horizontal" && processedAnswers.length > 0 && (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={processedAnswers}
            layout="vertical"
            margin={{
              left: questionOptions?.labels?.start || questionOptions?.labels?.end ? 120 : 80, // More space for labels
              right: 30,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label" // Use the generated label
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              width={questionOptions?.labels?.start || questionOptions?.labels?.end ? 110 : 70}
              interval={0}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={4}>
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => (value > 0 ? value : "")} // Hide label if count is 0
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}


      {chartType === "pie" && pieChartData.length > 0 && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]" // Increased max-h for pie
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="label" hideLabel />} // Use label for tooltip
            />
            <Pie
              data={pieChartData} // Use filtered data for pie
              dataKey="count"
              nameKey="label" // Use the generated label for slices
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              strokeWidth={2}
              paddingAngle={1}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.value}`}
                  fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                />
              ))}
              <LabelList
                position="outside" // 'outside' can sometimes work better for pie charts
                // formatter={(value: any, entry: any) => {
                //   const scalePointLabel = entry.payload.label || entry.payload.value;
                //   const currentCount = entry.payload.count;
                //   const percentage = totalCount > 0 ? ((currentCount / totalCount) * 100).toFixed(0) : 0;
                //   if (parseInt(percentage) < 3 && pieChartData.length > 5) return null; // Hide for very small slices if many items
                //   return `${scalePointLabel}: ${percentage}%`;
                // }}
                className="fill-foreground text-xs"
                stroke="none"
                offset={12} // Adjust offset for 'outside' labels
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}

      {processedAnswers.length === 0 && chartType !== "table" && (
         <div className="text-center py-10 text-gray-500">
           No response data available to render the selected chart.
         </div>
      )}
      {chartType === "pie" && pieChartData.length === 0 && processedAnswers.length > 0 && (
         <div className="text-center py-10 text-gray-500">
           No responses with counts greater than zero to display in Pie chart.
         </div>
      )}
      { (chartType === "bar-vertical" || chartType === "bar-horizontal") && processedAnswers.length === 0 && (
          <div className="text-center py-10 text-gray-500">No data to display for Bar chart.</div>
      )}

    </div>
  );
};