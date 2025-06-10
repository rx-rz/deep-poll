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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChartHorizontal } from "./bar-chart-horizontal";
import { BarChartVertical } from "./bar-chart-vertical";
import { PieChartComponent } from "./pie-chart";
import { Stat } from "./stat";
import { NoResponsesFallback } from "./no-responses-fallback";
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
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  const checkboxChoices = options.choices;

  const processData = () => {
    const counts = checkboxChoices.reduce((acc, choice) => {
      acc[choice] = 0;
      return acc;
    }, {} as Record<string, number>);

    for (const a of answers) {
      if (Array.isArray(a.answerJson)) {
        for (const option of a.answerJson) {
          if (counts.hasOwnProperty(option)) {
            counts[option] += 1;
          }
        }
      }
    }

    return Object.entries(counts).map(([option, count]) => ({
      answer: option,
      count,
    }));
  };

  const processedData = processData();

  const processCheckboxStatistics = (
    data: Array<{ answer: string; count: number }>,
    rawAnswers: Props["answers"],
    allChoices: string[]
  ) => {
    if (rawAnswers.length === 0) {
      return {
        totalResponses: 0,
        totalSelections: 0,
        uniqueOptionsSelected: 0,
        mostPopularOption: null,
        leastPopularOption: null,
        averageSelectionsPerResponse: 0,
        saturationIndex: 0,
        responseDistribution: [],
      };
    }

    const totalResponses = rawAnswers.length;
    const totalSelections = data.reduce((sum, d) => sum + d.count, 0);
    const selectedOptionsData = data.filter((entry) => entry.count > 0);
    const uniqueOptionsSelected = selectedOptionsData.length;

    const sortedData = [...data].sort((a, b) => b.count - a.count);

    const mostPopularOption =
      sortedData.length > 0
        ? {
            option: sortedData[0].answer,
            count: sortedData[0].count,
            percentage:
              totalSelections > 0
                ? Math.round(
                    (sortedData[0].count / totalSelections) * 100 * 100
                  ) / 100
                : 0,
          }
        : null;

    const top3Count = sortedData
      .slice(0, 3)
      .reduce((sum, item) => sum + item.count, 0);
    const topAnswersPercentage =
      totalSelections > 0
        ? Math.round((top3Count / totalSelections) * 100 * 100) / 100
        : 0;

    const diversityIndex = -data.reduce((sum, item) => {
      const proportion = item.count / totalSelections;
      return item.count > 0 ? sum + proportion * Math.log(proportion) : sum;
    }, 0);

    const responseDistribution = data.map((item) => ({
      option: item.answer,
      count: item.count,
      percentage:
        totalSelections > 0
          ? Math.round((item.count / totalSelections) * 100 * 100) / 100
          : 0,
    }));

    const singleResponseOptions = data.filter(
      (item) => item.count === 1
    ).length;
    const multipleResponseOptions = data.filter(
      (item) => item.count > 1
    ).length;

    return {
      totalResponses,
      totalSelections,
      uniqueOptionsSelected,
      mostPopularOption,
      averageSelectionsPerResponse:
        Math.round((totalSelections / totalResponses) * 100) / 100,
      diversityIndex: Math.round(diversityIndex * 100) / 100,
      topAnswersPercentage,
      singleResponseOptions,
      multipleResponseOptions,
      responseDistribution,
    };
  };

  const stats = processCheckboxStatistics(
    processedData,
    answers,
    checkboxChoices
  );

  if (answers.length === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts">
      <TabsList className="absolute right-8 top-8 ">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>

      <TabsContent value="charts">
        <Select
          onValueChange={(value) =>
            setChartType(
              value as "table" | "bar-horizontal" | "bar-vertical" | "pie"
            )
          }
        >
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
            <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem>
            <SelectItem value="pie">Pie</SelectItem>
          </SelectContent>
        </Select>

        {chartType === "table" && (
          <Table className="border">
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">Option</TableHead>
                <TableHead className="text-white">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.map(({ answer, count }, index) => (
                <TableRow key={index}>
                  <TableCell>{answer}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {chartType === "bar-horizontal" && (
          <BarChartHorizontal processedAnswers={processedData} />
        )}
        {chartType === "bar-vertical" && (
          <BarChartVertical processedAnswers={processedData} />
        )}
        {chartType === "pie" && (
          <PieChartComponent processedAnswers={processedData} />
        )}
      </TabsContent>

      <TabsContent value="stats" className="grid-cols-3 grid gap-12">
        <Stat title="Total Responses" value={stats.totalResponses} />
        <Stat title="Total Selections" value={stats.totalSelections} />
        <Stat
          title="Unique Options Selected"
          value={stats.uniqueOptionsSelected}
        />
        <Stat
          title="Most Popular Option"
          value={stats.mostPopularOption?.option}
        />
        <Stat
          title="Average Selections per Response"
          value={stats.averageSelectionsPerResponse}
        />
        <Stat title="Diversity Index" value={stats.diversityIndex} />
        <Stat
          title="Top Answers Percentage"
          value={`${stats.topAnswersPercentage}%`}
        />
        <Stat
          title="Single Response Options"
          value={stats.singleResponseOptions}
        />
        <Stat
          title="Multiple Response Options"
          value={stats.multipleResponseOptions}
        />
      </TabsContent>
    </Tabs>
  );
};
