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

import { QuestionOptionsMap } from "@/types/questions";
import { NoResponsesFallback } from "./no-responses-fallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stat } from "./stat";

// Use your existing, shared chart components
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
  answerJson: any; // Used for range sliders [start, end]
};

type Props = {
  answers: AnswerEntry[];
  options: QuestionOptionsMap["slider"];
};

export const SliderCharts = ({ answers, options }: Props) => {
  const [chartType, setChartType] = useState<
    "table" | "bar-vertical" | "bar-horizontal" | "pie" | "line"
  >("table");

  const processData = (
    answers: AnswerEntry[],
    options: QuestionOptionsMap["slider"]
  ) => {
    const { min, max } = options;
    const counts: Record<number, number> = {};

    // Initialize counts for all possible slider values
    for (let i = min; i <= max; i++) {
      counts[i] = 0;
    }

    for (const answer of answers) {
      if (
        answer.answerNumber !== null &&
        typeof answer.answerNumber === "number"
      ) {
        const value = Math.round(answer.answerNumber); // Round to nearest integer if not already
        if (!isNaN(value) && value >= min && value <= max) {
          counts[value] += 1;
        }
      } else if (
        Array.isArray(answer.answerJson) &&
        answer.answerJson.length === 2
      ) {
        // Handle range sliders like [start, end]
        const [start, end] = answer.answerJson.map(Number);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          const rangeLength = end - start + 1;
          for (let i = start; i <= end; i++) {
            if (i >= min && i <= max) {
              counts[i] += 1 / rangeLength; // Distribute count across the range
            }
          }
        }
      }
    }

    // --- CRITICAL CHANGE HERE: Map 'value' to 'answer' ---
    const data = Object.entries(counts)
      .map(([value, count]) => ({ answer: Number(value), count })) // Changed 'value' to 'answer'
      .sort((a, b) => a.answer - b.answer); // Sort by 'answer'

    const total = data.reduce((sum, d) => sum + d.count, 0);

    return {
      data,
      total,
    };
  };

  const { data: processedData, total: totalResponses } = processData(
    answers,
    options
  );

  // --- Statistics Logic for Slider ---
  const processedSliderStatistics = (
    data: Array<{ answer: number; count: number }>, // Changed 'value' to 'answer' in type
    totalResponses: number,
    options: QuestionOptionsMap["slider"]
  ) => {
    if (totalResponses === 0) {
      return {
        totalResponses: 0,
        uniqueValues: 0,
        averageValue: 0,
        medianValue: 0,
        modeValue: null,
        valueRange: null,
        standardDeviation: 0,
        percentageWithinRange: 0,
        mostFrequentValue: null,
      };
    }

    const allValues: number[] = [];
    data.forEach((item) => {
      for (let i = 0; i < Math.round(item.count); i++) {
        allValues.push(item.answer); // Changed 'value' to 'answer'
      }
    });
    allValues.sort((a, b) => a - b);

    const uniqueValues = data.filter((item) => item.count > 0).length;

    // Average Value
    const sumOfValues = allValues.reduce((sum, val) => sum + val, 0);
    const averageValue = totalResponses > 0 ? sumOfValues / totalResponses : 0;

    // Median Value
    let medianValue: number | null = null;
    if (allValues.length > 0) {
      const mid = Math.floor(allValues.length / 2);
      if (allValues.length % 2 === 0) {
        medianValue = (allValues[mid - 1] + allValues[mid]) / 2;
      } else {
        medianValue = allValues[mid];
      }
    }

    // Mode Value (Most Frequent)
    let modeValue: number | null = null;
    let maxCount = 0;
    const modeCounts: Record<number, number> = {};
    data.forEach((item) => {
      const roundedCount = Math.round(item.count);
      if (roundedCount > 0) {
        modeCounts[item.answer] = (modeCounts[item.answer] || 0) + roundedCount; // Changed 'value' to 'answer'
        if (modeCounts[item.answer] > maxCount) {
          // Changed 'value' to 'answer'
          maxCount = modeCounts[item.answer]; // Changed 'value' to 'answer'
          modeValue = item.answer; // Changed 'value' to 'answer'
        }
      }
    });

    // Value Range
    const actualMin = allValues.length > 0 ? Math.min(...allValues) : null;
    const actualMax = allValues.length > 0 ? Math.max(...allValues) : null;
    const valueRange =
      actualMin !== null && actualMax !== null
        ? `${actualMin} - ${actualMax}`
        : null;

    // Standard Deviation
    let standardDeviation = 0;
    if (totalResponses > 1) {
      const mean = averageValue;
      const sumOfSquaredDifferences = allValues.reduce(
        (sum, val) => sum + Math.pow(val - mean, 2),
        0
      );
      standardDeviation = Math.sqrt(
        sumOfSquaredDifferences / (totalResponses - 1)
      );
    }

    // Percentage within the specified min/max range of the slider (should be 100% if data is clean)
    const valuesWithinRangeCount = answers.filter(
      (a) =>
        (a.answerNumber !== null &&
          a.answerNumber >= options.min &&
          a.answerNumber <= options.max) ||
        (Array.isArray(a.answerJson) &&
          a.answerJson.every((val) => val >= options.min && val <= options.max))
    ).length;

    const percentageWithinRange =
      answers.length > 0
        ? Math.round((valuesWithinRangeCount / answers.length) * 100 * 100) /
          100
        : 0;

    // Most Frequent Value
    const mostFrequentValueEntry = [...data].sort(
      (a, b) => b.count - a.count
    )[0];
    const mostFrequentValue =
      mostFrequentValueEntry && totalResponses > 0
        ? {
            value: mostFrequentValueEntry.answer, // Changed 'value' to 'answer'
            count: mostFrequentValueEntry.count,
            percentage:
              Math.round(
                (mostFrequentValueEntry.count / totalResponses) * 100 * 100
              ) / 100,
          }
        : null;

    return {
      totalResponses,
      uniqueValues,
      averageValue: Math.round(averageValue * 100) / 100,
      medianValue:
        medianValue !== null ? Math.round(medianValue * 100) / 100 : null,
      modeValue,
      valueRange,
      standardDeviation: Math.round(standardDeviation * 100) / 100,
      percentageWithinRange,
      mostFrequentValue,
    };
  };

  const stats = processedSliderStatistics(
    processedData,
    totalResponses,
    options
  );

  if (answers.length === 0) {
    return <NoResponsesFallback />;
  }

  // Filter for pie chart: only show options with count > 0 for pie chart
  const pieChartData = processedData.filter((entry) => entry.count > 0);

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
              value as
                | "table"
                | "bar-horizontal"
                | "bar-vertical"
                | "pie"
                | "line"
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
                <TableHead className="text-white">Value</TableHead>{" "}
                {/* Label remains 'Value' for user clarity */}
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length > 0 ? (
                processedData.map((d) => (
                  <TableRow key={d.answer}>
                    {" "}
                    {/* Use d.answer for the key */}
                    <TableCell>{d.answer}</TableCell> {/* Display d.answer */}
                    <TableCell>{d.count.toFixed(1)}</TableCell>
                    <TableCell>
                      {totalResponses > 0
                        ? ((d.count / totalResponses) * 100).toFixed(1)
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
          <BarChartHorizontal processedAnswers={processedData} />
        )}
        {chartType === "bar-vertical" && (
          <BarChartVertical processedAnswers={processedData} />
        )}
        {chartType === "line" && (
          <LineChartComponent processedAnswers={processedData} />
        )}
        {chartType === "pie" && (
          <PieChartComponent processedAnswers={pieChartData} />
        )}
      </TabsContent>

      <TabsContent value="stats" className="grid-cols-3 grid gap-12">
        <Stat title="Total Responses" value={stats.totalResponses} />
        <Stat title="Unique Values" value={stats.uniqueValues} />
        <Stat
          title="Average Value"
          value={
            stats.averageValue !== null ? stats.averageValue.toFixed(2) : "N/A"
          }
        />
        <Stat
          title="Median Value"
          value={
            stats.medianValue !== null ? stats.medianValue.toFixed(2) : "N/A"
          }
        />
        <Stat
          title="Mode Value"
          value={stats.modeValue !== null ? stats.modeValue : "N/A"}
        />
        <Stat
          title="Value Range"
          value={stats.valueRange !== null ? stats.valueRange : "N/A"}
        />
        <Stat
          title="Standard Deviation"
          value={
            stats.standardDeviation !== null
              ? stats.standardDeviation.toFixed(2)
              : "N/A"
          }
        />
        <Stat
          title="Most Frequent Value"
          value={
            stats.mostFrequentValue?.value !== undefined
              ? `${stats.mostFrequentValue.value} (${stats.mostFrequentValue.percentage}%)`
              : "N/A"
          }
        />
        <Stat
          title="In Range"
          value={
            stats.percentageWithinRange !== null
              ? `${stats.percentageWithinRange}%`
              : "N/A"
          }
        />
      </TabsContent>
    </Tabs>
  );
};
