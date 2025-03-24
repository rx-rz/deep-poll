import { defaultQuestionOptions } from "@/lib/default-question-options";
import { QuestionOptionsMap } from "@/types/questions";
import { z } from "zod";

type Props = {
  required: boolean;
  questionText: string;
  questionId: string;
  orderNumber: string;
  options: QuestionOptionsMap["text"];
};

const useTextQuestionForm = ({
  options,
  orderNumber,
  questionId,
  required,
  questionText,
}: Props) => {
  const defaultOptions = defaultQuestionOptions.text;
  const { minAnswerLength, maxAnswerLength } = options;
  const answer = z.string();
  if (minAnswerLength) {
    answer.min(minAnswerLength ?? defaultOptions.minAnswerLength);
  }
  if (maxAnswerLength) {
    answer.max(maxAnswerLength ?? defaultOptions.maxAnswerLength);
  }

  if (required === false) {
    answer.optional();
  }
};
