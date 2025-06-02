import { DropdownCharts } from "@/features/questions/components/dropdown-charts";
import { EmailCharts } from "@/features/questions/components/email-charts";
import { LinearScaleCharts } from "@/features/questions/components/linear-scale-charts";
import { MultipleChoiceCharts } from "@/features/questions/components/multiple-choice-charts";
import { NumberCharts } from "@/features/questions/components/number-charts";
import { TextCharts } from "@/features/questions/components/text-charts";
import { QuestionOptionsMap, QuestionType } from "@/types/questions";
import { ReactNode } from "react";

type Question = {
  questionType: QuestionType;
  questionText: string;
  options?: QuestionOptionsMap[QuestionType] | null;
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
  console.log(questionAnswersData.questionType);
  let chartComponent: ReactNode;
  const { answers, id, questionText, questionType, options } = questionAnswersData;
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
    case "email":
      chartComponent = (
        <EmailCharts answers={answers} id={id} questionText={questionText} />
      );
      break;
    case "number":
      chartComponent = (
        <NumberCharts answers={answers} id={id} questionText={questionText} />
      );
      break;
    case "multiple_choice":
      chartComponent = (
        <MultipleChoiceCharts
          answers={answers}
          id={id}
          questionText={questionText}
        />
      );
      break;
    case "dropdown":
      chartComponent = (
        <DropdownCharts answers={answers} id={id} questionText={questionText} />
      );
      break;
    case "linear_scale":
      chartComponent = (
        <LinearScaleCharts answers={answers} id={id} questionText={questionText} questionOptions={options as QuestionOptionsMap["linear_scale"]}/>
      )
      break;
    default:
      chartComponent = (
        <p className="text-red-500">
          Chart not available for this question type. {questionType}
        </p>
      );
  }
  return chartComponent;
};
