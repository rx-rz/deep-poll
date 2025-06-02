import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  answers: {
    id: string;
    questionId: string | null;
    createdAt: Date;
    answerText: string | null;
    answerNumber: number | null;
    answerJson: any;
  }[];
};

export const DateCharts = ({ answers }: Props) => {
  const [chartType, setChartType] = useState<"table" | "area" | "histogram">(
    "table"
  );
  const [interval, setInterval] = useState<
    "daily" | "weekly" | "biweekly" | "monthly"
  >("daily");

  const getGroupKey = (date: Date, interval: string) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    switch (interval) {
      case "daily":
        return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      case "weekly": {
        // Get Monday of the week (ISO week standard)
        const mondayOfWeek = new Date(date);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday to 6
        mondayOfWeek.setDate(date.getDate() - daysToSubtract);
        return `Week of ${mondayOfWeek.toISOString().split("T")[0]}`;
      }
      case "biweekly": {
        // Use a fixed epoch date (e.g., Jan 1, 2024) to ensure consistent biweekly periods
        const epochDate = new Date("2024-01-01"); // Monday
        const timeDiff = date.getTime() - epochDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const biweekIndex = Math.floor(daysDiff / 14);

        // Calculate the start date of this biweek period
        const biweekStart = new Date(epochDate);
        biweekStart.setDate(epochDate.getDate() + biweekIndex * 14);

        const biweekEnd = new Date(biweekStart);
        biweekEnd.setDate(biweekStart.getDate() + 13);

        return `${biweekStart.toISOString().split("T")[0]} to ${
          biweekEnd.toISOString().split("T")[0]
        }`;
      }
      case "monthly":
        return `${year}-${(month + 1).toString().padStart(2, "0")}`; // "YYYY-MM"
      default:
        return "";
    }
  };

  const processDateGroups = (data: typeof answers, interval: string) => {
    const grouped: Record<string, number> = {};

    for (const item of data) {
      // Use createdAt date instead of answerText
      const date = new Date(item.createdAt);
      if (isNaN(date.getTime())) continue;

      const key = getGroupKey(date, interval);
      grouped[key] = (grouped[key] || 0) + 1;
    }

    // Sort the results properly based on interval type
    return Object.entries(grouped)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => {
        if (interval === "weekly") {
          // Extract date from "Week of YYYY-MM-DD" format
          const dateA = new Date(a.label.replace("Week of ", ""));
          const dateB = new Date(b.label.replace("Week of ", ""));
          return dateA.getTime() - dateB.getTime();
        } else if (interval === "biweekly") {
          // Extract start date from "YYYY-MM-DD to YYYY-MM-DD" format
          const dateA = new Date(a.label.split(" to ")[0]);
          const dateB = new Date(b.label.split(" to ")[0]);
          return dateA.getTime() - dateB.getTime();
        } else if (interval === "monthly") {
          // Compare YYYY-MM format
          return a.label.localeCompare(b.label);
        } else {
          // Daily format YYYY-MM-DD
          return new Date(a.label).getTime() - new Date(b.label).getTime();
        }
      });
  };

  const processedDateGroups = processDateGroups(answers, interval);
  const totalCount = processedDateGroups.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={chartType}
          onValueChange={(value) =>
            setChartType(value as "table" | "area" | "histogram")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">Table</SelectItem>
            <SelectItem value="histogram">Histogram</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
          </SelectContent>
        </Select>
        {(chartType === "area" || chartType === "histogram") && (
          <Select
            value={interval}
            onValueChange={(value) => setInterval(value as typeof interval)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Interval Width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Biweekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div>
        {chartType === "table" && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Date Period
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Response Count
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {processedDateGroups.length > 0 ? (
                  processedDateGroups.map((item, index) => (
                    <tr
                      key={item.label}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {item.label}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.count}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {totalCount > 0
                          ? ((item.count / totalCount) * 100).toFixed(1)
                          : "0"}
                        %
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {(chartType === "histogram" || chartType === "area") && (
          <div style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "histogram" ? (
                <BarChart
                  data={processedDateGroups}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart
                  data={processedDateGroups}
                  margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="label"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Area
                    dataKey="count"
                    type="monotone"
                    fill="#10b981"
                    fillOpacity={0.3}
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{
                      stroke: "#10b981",
                      strokeWidth: 2,
                      r: 3,
                      fill: "white",
                    }}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};