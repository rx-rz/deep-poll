import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoResponsesFallback } from "./no-responses-fallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stat } from "./stat";

// Assuming you have these components extracted from your original MultipleChoiceCharts
import { BarChartHorizontal } from "./bar-chart-horizontal";
import { BarChartVertical } from "./bar-chart-vertical";
import { PieChartComponent } from "./pie-chart";

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

export const MultipleChoiceCharts = ({ answers }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  const processMultipleChoiceAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      const answer = item.answerText !== null ? item.answerText : String(item.answerNumber);
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

  const processedAnswers = processMultipleChoiceAnswerData(answers);

  const processMultipleChoiceStatistics = (
    processedAnswers: Array<{ answer: string; count: number }>
  ) => {
    if (processedAnswers.length === 0) {
      return {
        totalResponses: 0,
        uniqueAnswers: 0,
        mostPopularAnswer: null,
        responseDistribution: [],
        diversityIndex: 0,
        topAnswersPercentage: 0,
        singleResponseAnswers: 0,
        multipleResponseAnswers: 0,
        averageResponsesPerAnswer: 0,
        mode: null, // Only mode remains for categorical data
      };
    }

    const totalResponses = processedAnswers.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const uniqueAnswers = processedAnswers.length;

    const sortedAnswers = [...processedAnswers].sort(
      (a, b) => b.count - a.count
    );

    const mostPopularAnswer = {
      answer: sortedAnswers[0].answer,
      count: sortedAnswers[0].count,
      percentage:
        Math.round((sortedAnswers[0].count / totalResponses) * 100 * 100) / 100,
    };

    const responseDistribution = sortedAnswers.map((item) => ({
      answer: item.answer,
      count: item.count,
      percentage: Math.round((item.count / totalResponses) * 100 * 100) / 100,
    }));

    const diversityIndex = -responseDistribution.reduce((sum, item) => {
      const proportion = item.count / totalResponses;
      // Handle the case where proportion is 0 to avoid log(0) which is -Infinity
      return sum + (proportion > 0 ? proportion * Math.log(proportion) : 0);
    }, 0);

    const top3Count = sortedAnswers
      .slice(0, 3)
      .reduce((sum, item) => sum + item.count, 0);
    const topAnswersPercentage =
      Math.round((top3Count / totalResponses) * 100 * 100) / 100;

    const singleResponseAnswers = sortedAnswers.filter(
      (item) => item.count === 1
    ).length;
    const multipleResponseAnswers = uniqueAnswers - singleResponseAnswers;

    // Mode is the most appropriate measure for categorical data
    let mode: string | null = null;
    if (sortedAnswers.length > 0) {
      mode = sortedAnswers[0].answer;
    }

    return {
      totalResponses,
      uniqueAnswers,
      mostPopularAnswer,
      responseDistribution,
      diversityIndex: Math.round(diversityIndex * 100) / 100,
      topAnswersPercentage,
      singleResponseAnswers,
      multipleResponseAnswers,
      averageResponsesPerAnswer:
        uniqueAnswers > 0 ? Math.round((totalResponses / uniqueAnswers) * 100) / 100 : 0, // Avoid division by zero
      mode,
    };
  };

  const stats = processMultipleChoiceStatistics(processedAnswers);

  if (processedAnswers.length === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts" defaultChecked>
      <TabsList className="absolute right-8 top-8 ">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="charts">
        <Select
          onValueChange={(value) =>
            setChartType(value as "table" | "bar-horizontal" | "bar-vertical" | "pie")
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
                <TableHead className="text-white">Selected Option</TableHead>
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Percentage</TableHead>
                <TableHead className="text-white">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.map(({ answer, count }, index) => (
                <TableRow key={answer}>
                  <TableCell>{answer}</TableCell>
                  <TableCell>{count}</TableCell>
                  <TableCell>
                    {((count / stats.totalResponses) * 100).toFixed(1) ?? 0}%
                  </TableCell>
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
            <BarChartHorizontal processedAnswers={processedAnswers} />
          </div>
        )}
        {chartType === "bar-vertical" && (
          <div>
            <BarChartVertical processedAnswers={processedAnswers} />
          </div>
        )}
        {chartType === "pie" && (
          <div>
            <PieChartComponent processedAnswers={processedAnswers} />
          </div>
        )}
      </TabsContent>
      <TabsContent value="stats" className="grid-cols-3 grid gap-12">
        <Stat title="Total Responses" value={stats.totalResponses} />
        <Stat title="Unique Answers" value={stats.uniqueAnswers} />
        <Stat title="Diversity Index" value={stats.diversityIndex} />
        <Stat
          title="Most Popular Answer"
          value={stats.mostPopularAnswer?.answer}
        />
        <Stat
          title="Multiple Response Answers"
          value={stats.multipleResponseAnswers}
        />
        <Stat
          title="Single Response Answers"
          value={stats.singleResponseAnswers}
        />
        <Stat
          title="Top Answers Percentage"
          value={`${stats.topAnswersPercentage}%`}
        />
        <Stat
          title="Average Responses Per Answer"
          value={stats.averageResponsesPerAnswer}
        />
        {stats.mode !== null && <Stat title="Mode" value={stats.mode} />}
      </TabsContent>
    </Tabs>
  );
};
