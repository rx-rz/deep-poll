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

  const processAnswerData = (data: typeof answers) => {
    
  }

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


    </div>
  );
};