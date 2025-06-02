// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// type Props = {
//   questionData: {
//     questionText: string;
//     questionType: "likert";
//     id: string;
//     options: {
//       scale: number;
//       labels: string[];
//     };
//     answers: {
//       id: string;
//       answerText: string | null;
//       answerJson: any;
//       answerNumber: number;
//       questionId: string;
//       createdAt: string;
//     }[];
//   };
// };

// export const LikertCharts = ({ questionData }: Props) => {
//   const [chartType, setChartType] = useState<"table" | "bar" | "pie">("table");

//   const processLikertData = () => {
//     const { options, answers } = questionData;
//     const grouped: Record<string, number> = {};

//     // Initialize all scale values with 0
//     for (let i = 1; i <= options.scale; i++) {
//       const label = options.labels[i - 1] || `Option ${i}`;
//       grouped[label] = 0;
//     }

//     // Count responses
//     for (const answer of answers) {
//       if (!answer.answerNumber) continue;
//       const numValue = parseInt(answer.answerNumber);
//       if (numValue >= 1 && numValue <= options.scale) {
//         const label = options.labels[numValue - 1] || `Option ${numValue}`;
//         grouped[label] = (grouped[label] || 0) + 1;
//       }
//     }

//     return Object.entries(grouped).map(([label, count], index) => ({
//       label,
//       count,
//       value: index + 1, // For ordering
//       percentage: answers.length > 0 ? ((count / answers.length) * 100).toFixed(1) : "0",
//     }));
//   };

//   const processedData = processLikertData();
//   const totalResponses = questionData.answers.length;

//   // Colors for pie chart
//   const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

//   // Calculate summary statistics
//   const calculateStats = () => {
//     const validAnswers = questionData.answers
//       .map(a => parseInt(a.answerNumber))
//       .filter(n => !isNaN(n) && n >= 1 && n <= questionData.options.scale);
    
//     if (validAnswers.length === 0) return null;

//     const mean = validAnswers.reduce((sum, val) => sum + val, 0) / validAnswers.length;
//     const sortedAnswers = validAnswers.sort((a, b) => a - b);
//     const median = sortedAnswers.length % 2 === 0
//       ? (sortedAnswers[sortedAnswers.length / 2 - 1] + sortedAnswers[sortedAnswers.length / 2]) / 2
//       : sortedAnswers[Math.floor(sortedAnswers.length / 2)];

//     return {
//       mean: mean.toFixed(2),
//       median: median.toFixed(1),
//       responses: validAnswers.length,
//     };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="w-full space-y-4">
//       {/* Question Text */}
//       <div className="bg-gray-50 p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2">Question</h3>
//         <p className="text-gray-700">{questionData.questionText}</p>
//         {stats && (
//           <div className="mt-3 flex gap-6 text-sm text-gray-600">
//             <span>Mean: <strong>{stats.mean}</strong></span>
//             <span>Median: <strong>{stats.median}</strong></span>
//             <span>Responses: <strong>{stats.responses}</strong></span>
//           </div>
//         )}
//       </div>

//       {/* Chart Type Selector */}
//       <div className="flex items-center gap-4">
//         <Select
//           value={chartType}
//           onValueChange={(value) =>
//             setChartType(value as "table" | "bar" | "pie")
//           }
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Chart Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="table">Table</SelectItem>
//             <SelectItem value="bar">Bar Chart</SelectItem>
//             <SelectItem value="pie">Pie Chart</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Chart Content */}
//       <div>
//         {chartType === "table" && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="border border-gray-300 px-4 py-2 text-left">
//                     Scale Value
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2 text-left">
//                     Response Option
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2 text-left">
//                     Count
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2 text-left">
//                     Percentage
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {processedData.length > 0 ? (
//                   processedData.map((item, index) => (
//                     <tr
//                       key={item.label}
//                       className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                     >
//                       <td className="border border-gray-300 px-4 py-2 text-center font-medium">
//                         {item.value}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {item.label}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-center">
//                         {item.count}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-center">
//                         {item.percentage}%
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={4}
//                       className="border border-gray-300 px-4 py-2 text-center"
//                     >
//                       No responses available.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {chartType === "bar" && (
//           <div style={{ width: "100%", height: "400px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={processedData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="label"
//                   angle={-45}
//                   textAnchor="end"
//                   interval={0}
//                   height={80}
//                   tick={{ fontSize: 11 }}
//                 />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip 
//                   formatter={(value, name) => [value, 'Responses']}
//                   labelFormatter={(label) => `Option: ${label}`}
//                 />
//                 <Bar 
//                   dataKey="count" 
//                   fill="#8b5cf6" 
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}

//         {chartType === "pie" && (
//           <div style={{ width: "100%", height: "500px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={processedData.filter(item => item.count > 0)}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ label, percentage }) => `${percentage}%`}
//                   outerRadius={120}
//                   fill="#8884d8"
//                   dataKey="count"
//                 >
//                   {processedData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   formatter={(value, name) => [value, 'Responses']}
//                 />
//                 <Legend 
//                   formatter={(value, entry) => entry?.payload?.value}
//                   wrapperStyle={{ paddingTop: '20px' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };