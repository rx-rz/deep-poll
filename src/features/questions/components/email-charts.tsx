import { useState } from "react";
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
import { NoResponsesFallback } from "./no-responses-fallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stat } from "./stat";
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

const getDomainFromEmail = (email: string): string | null => {
  if (!email || typeof email !== "string") {
    return null;
  }
  const parts = email.split("@");
  if (parts.length === 2 && parts[1]) {
    return parts[1].toLowerCase();
  }
  return null;
};

type EmailProcessMode = "domain" | "full_email";

export const EmailCharts = ({ answers, id, questionText }: Props) => {
  const processEmailAnswerData = (
    data: typeof answers,
    mode: EmailProcessMode = "domain"
  ) => {
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      if (item.answerText !== null) {
        let key: string | null = null;

        if (mode === "domain") {
          if (item.answerText.includes("@")) {
            key = getDomainFromEmail(item.answerText);
          }
        } else if (mode === "full_email") {
          key = item.answerText.trim().toLowerCase();
        }

        if (key) {
          counts[key] = (counts[key] || 0) + 1;
        }
      }
    });

    return Object.entries(counts).map(([answer, count]) => ({
      answer,
      count,
    }));
  };

  const [chartType, setChartType] = useState<
    "table" | "bar-horizontal" | "bar-vertical" | "pie"
  >("table");

  const [processMode, setProcessMode] = useState<EmailProcessMode>("domain");

  const processedAnswers =
    processMode === "full_email"
      ? processEmailAnswerData(answers, "full_email")
      : processEmailAnswerData(answers, "domain");

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
      };
    }

    const totalResponses = processedAnswers.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const uniqueAnswers = processedAnswers.length;

    // Sort by count (descending) for easy access to most popular
    const sortedAnswers = [...processedAnswers].sort(
      (a, b) => b.count - a.count
    );

    // Most popular answer
    const mostPopularAnswer = {
      answer: sortedAnswers[0].answer,
      count: sortedAnswers[0].count,
      percentage:
        Math.round((sortedAnswers[0].count / totalResponses) * 100 * 100) / 100,
    };

    // Response distribution (all answers with percentages)
    const responseDistribution = sortedAnswers.map((item) => ({
      answer: item.answer,
      count: item.count,
      percentage: Math.round((item.count / totalResponses) * 100 * 100) / 100,
    }));

    // Diversity Index (Shannon's Diversity Index) - measures how evenly distributed responses are
    // Higher = more diverse/even distribution, Lower = more concentrated responses
    const diversityIndex = -responseDistribution.reduce((sum, item) => {
      const proportion = item.count / totalResponses;
      return sum + proportion * Math.log(proportion);
    }, 0);

    // Top 3 answers percentage (concentration measure)
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
      singleResponseAnswers, // How many answers only got 1 response
      multipleResponseAnswers, // How many answers got multiple responses
      averageResponsesPerAnswer:
        Math.round((totalResponses / uniqueAnswers) * 100) / 100,
    };
  };
  const stats = processedAnswersStatistics(processedAnswers);

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
        <div className="flex gap-2">
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
          <Select
            onValueChange={(value) => setProcessMode(value as EmailProcessMode)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Email Process Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="domain">Domain</SelectItem>
              <SelectItem value="full_email">Full Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {chartType === "table" && (
          <Table className="border">
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="text-white">Answer</TableHead>
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAnswers.map(({ answer, count }, index) => (
                <TableRow key={id}>
                  <TableCell>{answer}</TableCell>
                  <TableCell>{count}</TableCell>
                  <TableCell>
                    {new Date(answers[index].createdAt).toDateString() ?? ""}
                  </TableCell>
                </TableRow>
              ))}
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
      <TabsContent value="stats" className="grid-cols-3 grid gap-12 mt-6">
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
