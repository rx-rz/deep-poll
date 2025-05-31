import { TextCharts } from "@/features/questions/components/text-charts";
import { QuestionType } from "@/types/questions";
import { ReactNode } from "react";

type Question = {
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

export const getResponseChartUI = (questionAnswersData: Question) => {
  let chartComponent: ReactNode;
  const { answers, id, questionText, questionType } = questionAnswersData;
  switch (questionType) {
    case "text":
      chartComponent = (
        <TextCharts
          answers={answers}
          id={id}
          questionText={questionText}
          questionType={questionType}
        />
      );
    break;
    default:
      chartComponent = (
        <p className="text-red-500">
          Chart not available for this question type.
        </p>
      );
    return chartComponent;
  }
};
