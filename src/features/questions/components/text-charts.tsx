import { QuestionType } from "@/types/questions";
import { useState } from "react";

type Props = {
  questionType: QuestionType;
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

export const TextCharts = ({
  answers,
  id,
  questionText,
  questionType,
}: Props) => {
  const [chartType, setChartType] = useState<"table" | "bar">("table");

  const processTextAnswerData = (data: typeof answers) => {
    return data.map((item) => ({
      id: item.id,
      answer: item.answerText,
      createdAt: item.createdAt,
    }));
  };

  return (
    <div>
      <select
        name=""
        id=""
        onChange={(e) => setChartType(e.target.value as "table" | "bar")}
      >
        <option value="default" disabled selected>
          Select chart type
        </option>
        <option value="table">Table</option>
        <option value="bar">Bar Chart</option>
      </select>

      {chartType === "table" && (
        <table className="w-full">
          <thead>
            <tr>
              <th>Answer</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer.id}>
                <td>{answer.answerText || answer.answerNumber}</td>
                <td>{1}</td>{" "}
                {/* Placeholder for count, replace with actual logic */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
