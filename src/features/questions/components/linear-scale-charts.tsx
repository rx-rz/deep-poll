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


import { QuestionOptionsMap } from "@/types/questions";
import { BarChartHorizontal } from "./bar-chart-horizontal";
import { BarChartVertical } from "./bar-chart-vertical";
import { LineChartComponent } from "./line-chart";
import { PieChartComponent } from "./pie-chart";

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
  id: string;
  questionOptions?: QuestionOptionsMap["linear_scale"];
  answers: AnswerEntry[];
};

export const LinearScaleCharts = ({ answers, id, questionText, questionOptions }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie" | "line"
  >("table");

  const processLinearScaleAnswerData = (data: typeof answers, options?: QuestionOptionsMap["linear_scale"]) => {
    const counts = data.reduce((acc, item) => {
      const answerValue = item.answerNumber;
      if (answerValue !== null && answerValue !== undefined) {
        acc[answerValue] = (acc[answerValue] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    const processed = Object.entries(counts).map(([answer, count]) => ({
      answer: Number(answer),
      count,
    }));

    if (options && options.min !== undefined && options.max !== undefined) {
      const fullScale: Record<number, number> = {};
      for (let i = options.min; i <= options.max; i++) {
        fullScale[i] = 0;
      }
      processed.forEach(item => {
        if (item.answer >= options.min && item.answer <= options.max) {
          fullScale[item.answer] = item.count;
        }
      });
      return Object.entries(fullScale)
        .map(([answer, count]) => ({ answer: Number(answer), count }))
        .sort((a, b) => a.answer - b.answer);
    }

    return processed.sort((a, b) => a.answer as number - (b.answer as number));
  };


  const processedAnswers = processLinearScaleAnswerData(answers, questionOptions);

  const processedAnswersStatistics = (
    processedAnswers: Array<{ answer: string | number; count: number }>
  ) => {
    if (processedAnswers.length === 0) {
      return {
        totalResponses: 0,
        uniqueAnswers: 0,
        averageScore: 0,
        medianScore: 0,
        modeScore: null,
        scoreRange: null,
        standardDeviation: 0,
        responseDistribution: [],
        mostFrequentScore: null,
      };
    }

    const totalResponses = processedAnswers.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const scores: number[] = [];
    processedAnswers.forEach((item) => {
      for (let i = 0; i < item.count; i++) {
        scores.push(Number(item.answer));
      }
    });
    scores.sort((a, b) => a - b);

    const uniqueAnswers = processedAnswers.filter(item => item.count > 0).length;

    const sumOfScores = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalResponses > 0 ? sumOfScores / totalResponses : 0;

    let medianScore: number | null = null;
    if (scores.length > 0) {
      const mid = Math.floor(scores.length / 2);
      if (scores.length % 2 === 0) {
        medianScore = (scores[mid - 1] + scores[mid]) / 2;
      } else {
        medianScore = scores[mid];
      }
    }

    let modeScore: number | null = null;
    let maxCount = 0;
    const modeCounts: Record<number, number> = {};
    scores.forEach(score => {
        modeCounts[score] = (modeCounts[score] || 0) + 1;
        if (modeCounts[score] > maxCount) {
            maxCount = modeCounts[score];
            modeScore = score;
        }
    });

    const minScore = scores.length > 0 ? Math.min(...scores) : null;
    const maxScore = scores.length > 0 ? Math.max(...scores) : null;
    const scoreRange = (minScore !== null && maxScore !== null) ? `${minScore} - ${maxScore}` : null;


    let standardDeviation = 0;
    if (totalResponses > 1) {
        const mean = averageScore;
        const sumOfSquaredDifferences = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0);
        standardDeviation = Math.sqrt(sumOfSquaredDifferences / (totalResponses - 1));
    }

    const responseDistribution = processedAnswers.map((item) => ({
      answer: item.answer,
      count: item.count,
      percentage: Math.round((item.count / totalResponses) * 100 * 100) / 100,
    }));

    const mostFrequentScoreEntry = [...processedAnswers].sort((a,b) => b.count - a.count)[0];
    const mostFrequentScore = mostFrequentScoreEntry ? {
        answer: mostFrequentScoreEntry.answer,
        count: mostFrequentScoreEntry.count,
        percentage: Math.round((mostFrequentScoreEntry.count / totalResponses) * 100 * 100) / 100,
    } : null;


    return {
      totalResponses,
      uniqueAnswers,
      averageScore: Math.round(averageScore * 100) / 100,
      medianScore,
      modeScore,
      scoreRange,
      standardDeviation: Math.round(standardDeviation * 100) / 100,
      responseDistribution,
      mostFrequentScore,
    };
  };
  const stats = processedAnswersStatistics(processedAnswers);
  // Access totalResponses from the stats object here
  const totalResponsesForTable = stats.totalResponses;


  if (answers.length === 0) {
    return <NoResponsesFallback />;
  }

  const pieChartData = processedAnswers.filter((entry) => entry.count > 0);


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
              value as "table" | "bar-horizontal" | "bar-vertical" | "pie" | "line"
            )
          }
        >
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="bar-vertical">Bar (Vertical)</SelectItem>
            <SelectItem value="bar-horizontal">Bar (Horizontal)</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
            {pieChartData.length > 0 && (
              <SelectItem value="pie">Pie Chart</SelectItem>
            )}
          </SelectContent>
        </Select>

        {chartType === "table" && (
          <Table className="border">
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">Scale Point</TableHead>
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.length > 0 ? (
                processedAnswers.map((item) => ( // Removed 'index' as it's not used and key is item.answer
                  <TableRow key={item.answer}>
                    <TableCell>{item.answer}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>
                      {/* Use totalResponsesForTable here */}
                      {totalResponsesForTable > 0
                        ? ((item.count / totalResponsesForTable) * 100).toFixed(1)
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
        {chartType === "line" && (
          <LineChartComponent processedAnswers={processedAnswers} />
        )}
        {chartType === "pie" && (
          <PieChartComponent processedAnswers={pieChartData} />
        )}
      </TabsContent>

      <TabsContent value="stats" className="grid-cols-3 grid gap-12">
        <Stat title="Total Responses" value={stats.totalResponses} />
        <Stat title="Unique Scores" value={stats.uniqueAnswers} />
        <Stat
          title="Average Score"
          value={stats.averageScore !== null ? stats.averageScore.toFixed(2) : "N/A"}
        />
        <Stat
          title="Median Score"
          value={stats.medianScore !== null ? stats.medianScore.toFixed(2) : "N/A"}
        />
        <Stat
          title="Mode Score"
          value={stats.modeScore !== null ? stats.modeScore : "N/A"}
        />
        <Stat
          title="Score Range"
          value={stats.scoreRange !== null ? stats.scoreRange : "N/A"}
        />
        <Stat
          title="Standard Deviation"
          value={stats.standardDeviation !== null ? stats.standardDeviation.toFixed(2) : "N/A"}
        />
         <Stat
          title="Most Frequent Score"
          value={stats.mostFrequentScore?.answer !== undefined ? `${stats.mostFrequentScore.answer} (${stats.mostFrequentScore.percentage}%)` : "N/A"}
        />
      </TabsContent>
    </Tabs>
  );
};