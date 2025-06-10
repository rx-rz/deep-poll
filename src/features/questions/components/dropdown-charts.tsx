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
import { NoResponsesFallback } from "./no-responses-fallback"; // Ensure this component exists
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Ensure this component exists
import { Stat } from "./stat"; // Ensure this component exists
import { BarChartHorizontal } from "./bar-chart-horizontal";
import { BarChartVertical } from "./bar-chart-vertical";
import { PieChartComponent } from "./pie-chart";

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

export const DropdownCharts = ({ answers, id, questionText }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  // Process answers for dropdown questions - this logic remains largely the same
  const processDropdownAnswerData = (data: typeof answers) => {
    const counts = data.reduce((acc, item) => {
      // For dropdown, the selected value is typically in answerText
      const answer = item.answerText;
      if (answer) {
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Sort by count (descending) for better visualization and statistics
    return Object.entries(counts)
      .map(([answer, count]) => ({
        answer, // The selected dropdown option
        count, // The frequency of this option
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
  };

  const processedAnswers = processDropdownAnswerData(answers);

  // --- Statistics Logic (copied from TextCharts) ---
  const processedAnswersStatistics = (
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
      };
    }

    const totalResponses = processedAnswers.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const uniqueAnswers = processedAnswers.length;

    const sortedAnswers = [...processedAnswers];
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
      return sum + (proportion > 0 ? proportion * Math.log(proportion) : 0);
    }, 0);

    const top3Count = sortedAnswers
      .slice(0, 3)
      .reduce((sum, item) => sum + item.count, 0);
    const topAnswersPercentage =
      Math.round((top3Count / totalResponses) * 100 * 100) / 100;

    // Response rate categories
    const singleResponseAnswers = sortedAnswers.filter(
      (item) => item.count === 1
    ).length;
    const multipleResponseAnswers = uniqueAnswers - singleResponseAnswers;

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
        uniqueAnswers > 0 ? Math.round((totalResponses / uniqueAnswers) * 100) / 100 : 0,
    };
  };
  const stats = processedAnswersStatistics(processedAnswers);


  if (processedAnswers.length === 0) {
    return <NoResponsesFallback />;
  }

  const totalCount = processedAnswers.reduce(
    (sum, entry) => sum + entry.count,
    0
  );


  return (
    <Tabs defaultValue="charts" defaultChecked>
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
            <SelectItem value="pie">Pie Chart</SelectItem>
          </SelectContent>
        </Select>

        {chartType === "table" && (
          <Table className="border">
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">Selected Option</TableHead>
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.length > 0 ? (
                processedAnswers.map((item) => (
                  <TableRow key={item.answer}>
                    <TableCell className="font-medium">
                      {item.answer}
                    </TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>
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

        {chartType === "bar-horizontal" && (
          <BarChartHorizontal processedAnswers={processedAnswers} />
        )}
        {chartType === "bar-vertical" && (
          <BarChartVertical processedAnswers={processedAnswers} />
        )}
        {chartType === "pie" && (
          <PieChartComponent processedAnswers={processedAnswers} />
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
          title="Multiple Response Answers "
          value={stats.multipleResponseAnswers}
        />
        <Stat
          title="Single Response Answers "
          value={stats.singleResponseAnswers}
        />
        <Stat
          title="Top Answers Percentage "
          value={`${stats.topAnswersPercentage}%`}
        />
        <Stat
          title="Average Responses Per Answer "
          value={stats.averageResponsesPerAnswer}
        />
      </TabsContent>
    </Tabs>
  );
};