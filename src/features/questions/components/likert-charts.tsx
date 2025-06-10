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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoResponsesFallback } from "./no-responses-fallback";
import { Stat } from "./stat";
import { BarChartHorizontal } from "./bar-chart-horizontal";
import { BarChartVertical } from "./bar-chart-vertical";
import { PieChartComponent } from "./pie-chart";

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

export const LikertCharts = ({ question }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  const processLikertAnswerData = (data: typeof question.answers, labels: string[]) => {
    const counts = labels.map((label, index) => {
      const count = data.filter(
        (a) => parseInt(a.answerNumber?.toString() ?? "") === index + 1
      ).length;
      return {
        answer: label,
        count,
        scaleValue: index + 1
      };
    });

    return counts;
  };

  const processedAnswers = processLikertAnswerData(question.answers, question.options.labels);

  const processedAnswersStatistics = (
    processedAnswers: Array<{ answer: string; count: number; scaleValue: number }>
  ) => {
    const validAnswers = processedAnswers.filter(item => item.count > 0);
    
    if (validAnswers.length === 0) {
      return {
        totalResponses: 0,
        responseRate: 0,
        mostPopularAnswer: null,
        responseDistribution: [],
        meanScore: 0,
        medianScore: 0,
        standardDeviation: 0,
        positiveResponseRate: 0,
        negativeResponseRate: 0,
        neutralResponseRate: 0,
        skewness: 0,
        responseSpread: 0,
      };
    }

    const totalResponses = processedAnswers.reduce((sum, item) => sum + item.count, 0);
    const scaleLength = processedAnswers.length;
    
    // Response rate (percentage of scale points that received responses)
    const responseRate = Math.round((validAnswers.length / scaleLength) * 100 * 100) / 100;

    // Most popular answer
    const sortedAnswers = [...processedAnswers].sort((a, b) => b.count - a.count);
    const mostPopularAnswer = {
      answer: sortedAnswers[0].answer,
      count: sortedAnswers[0].count,
      percentage: Math.round((sortedAnswers[0].count / totalResponses) * 100 * 100) / 100,
    };

    // Response distribution with percentages
    const responseDistribution = processedAnswers.map((item) => ({
      answer: item.answer,
      count: item.count,
      percentage: totalResponses > 0 ? Math.round((item.count / totalResponses) * 100 * 100) / 100 : 0,
      scaleValue: item.scaleValue
    }));

    // Calculate mean score
    const totalWeightedScore = processedAnswers.reduce(
      (sum, item) => sum + (item.scaleValue * item.count), 0
    );
    const meanScore = totalResponses > 0 ? Math.round((totalWeightedScore / totalResponses) * 100) / 100 : 0;

    // Calculate median score
    const allResponses = processedAnswers.flatMap(item => 
      Array(item.count).fill(item.scaleValue)
    ).sort((a, b) => a - b);
    
    const medianScore = allResponses.length > 0 ? (
      allResponses.length % 2 === 0
        ? (allResponses[allResponses.length / 2 - 1] + allResponses[allResponses.length / 2]) / 2
        : allResponses[Math.floor(allResponses.length / 2)]
    ) : 0;

    // Calculate standard deviation
    const variance = totalResponses > 0 ? processedAnswers.reduce(
      (sum, item) => sum + (item.count * Math.pow(item.scaleValue - meanScore, 2)),
      0
    ) / totalResponses : 0;
    const standardDeviation = Math.round(Math.sqrt(variance) * 100) / 100;

    // Calculate positive/negative/neutral response rates
    const midPoint = Math.ceil(scaleLength / 2);
    const positiveResponses = processedAnswers
      .filter(item => item.scaleValue > midPoint)
      .reduce((sum, item) => sum + item.count, 0);
    const negativeResponses = processedAnswers
      .filter(item => item.scaleValue < midPoint)
      .reduce((sum, item) => sum + item.count, 0);
    const neutralResponses = processedAnswers
      .filter(item => item.scaleValue === midPoint)
      .reduce((sum, item) => sum + item.count, 0);

    const positiveResponseRate = totalResponses > 0 ? Math.round((positiveResponses / totalResponses) * 100 * 100) / 100 : 0;
    const negativeResponseRate = totalResponses > 0 ? Math.round((negativeResponses / totalResponses) * 100 * 100) / 100 : 0;
    const neutralResponseRate = totalResponses > 0 ? Math.round((neutralResponses / totalResponses) * 100 * 100) / 100 : 0;

    // Calculate skewness (measure of asymmetry)
    const skewness = totalResponses > 0 && standardDeviation > 0 ? 
      processedAnswers.reduce(
        (sum, item) => sum + (item.count * Math.pow((item.scaleValue - meanScore) / standardDeviation, 3)),
        0
      ) / totalResponses : 0;

    // Response spread (range of responses)
    const minResponse = Math.min(...validAnswers.map(item => item.scaleValue));
    const maxResponse = Math.max(...validAnswers.map(item => item.scaleValue));
    const responseSpread = maxResponse - minResponse;

    return {
      totalResponses,
      responseRate,
      mostPopularAnswer,
      responseDistribution,
      meanScore,
      medianScore: Math.round(medianScore * 100) / 100,
      standardDeviation,
      positiveResponseRate,
      negativeResponseRate,
      neutralResponseRate,
      skewness: Math.round(skewness * 100) / 100,
      responseSpread,
    };
  };

  const stats = processedAnswersStatistics(processedAnswers);

  if (stats.totalResponses === 0) {
    return <NoResponsesFallback />;
  }

  return (
    <Tabs defaultValue="charts" defaultChecked>
      <TabsList className="absolute right-8 top-8">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>
      
      <TabsContent value="charts">
        <Select
          value={chartType}
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
                <TableHead className="text-white">Scale Label</TableHead>
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Percentage</TableHead>
                <TableHead className="text-white">Scale Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.map((item) => (
                <TableRow key={item.scaleValue}>
                  <TableCell>{item.answer}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    {stats.totalResponses > 0
                      ? Math.round((item.count / stats.totalResponses) * 100 * 100) / 100
                      : 0}%
                  </TableCell>
                  <TableCell>{item.scaleValue}</TableCell>
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
        <Stat title="Response Rate" value={`${stats.responseRate}%`} />
        <Stat title="Mean Score" value={stats.meanScore} />
        <Stat title="Median Score" value={stats.medianScore} />
        <Stat title="Standard Deviation" value={stats.standardDeviation} />
        <Stat title="Most Popular Answer" value={stats.mostPopularAnswer?.answer} />
        <Stat title="Positive Response Rate" value={`${stats.positiveResponseRate}%`} />
        <Stat title="Negative Response Rate" value={`${stats.negativeResponseRate}%`} />
        <Stat title="Neutral Response Rate" value={`${stats.neutralResponseRate}%`} />
        <Stat title="Skewness" value={stats.skewness} />
        <Stat title="Response Spread" value={stats.responseSpread} />
      </TabsContent>
    </Tabs>
  );
};