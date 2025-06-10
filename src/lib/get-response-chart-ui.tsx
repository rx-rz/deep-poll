import { CheckboxCharts } from "@/features/questions/components/checkbox-charts";
import { DateCharts } from "@/features/questions/components/date-charts";
import { DateTimeCharts } from "@/features/questions/components/datetime-charts";
import { DropdownCharts } from "@/features/questions/components/dropdown-charts";
import { EmailCharts } from "@/features/questions/components/email-charts";
import { LikertCharts } from "@/features/questions/components/likert-charts";
import { LinearScaleCharts } from "@/features/questions/components/linear-scale-charts";
import { MultipleChoiceCharts } from "@/features/questions/components/multiple-choice-charts";
import { NumberCharts } from "@/features/questions/components/number-charts";
import { SliderCharts } from "@/features/questions/components/slider-charts";
import { TextCharts } from "@/features/questions/components/text-charts";
import { TimeCharts } from "@/features/questions/components/time-charts";
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
  const { answers, id, questionText, questionType, options } =
    questionAnswersData;
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
        <LinearScaleCharts
          answers={answers}
          id={id}
          questionText={questionText}
          questionOptions={options as QuestionOptionsMap["linear_scale"]}
        />
      );
      break;
    case "time":
      chartComponent = <TimeCharts answers={answers} />;
      break;
    case "datetime":
      chartComponent = <DateTimeCharts answers={answers} />;
      break;
    case "date":
      chartComponent = <DateCharts answers={answers} />;
      break;
    case "likert":
      chartComponent = (
        <LikertCharts
          question={{
            answers,
            id,
            options: options as QuestionOptionsMap["likert"],
            questionText,
            questionType,
          }}
        />
      );
      break;
    case "checkbox":
      chartComponent = (
        <CheckboxCharts
          answers={answers}
          options={options as QuestionOptionsMap["checkbox"]}
        />
      );
      break;
    case "slider":
      chartComponent = (
        <SliderCharts
          answers={answers}
          options={options as QuestionOptionsMap["slider"]}
        />
      );
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
