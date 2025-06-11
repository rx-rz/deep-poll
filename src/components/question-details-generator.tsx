import { Question, QuestionOptionsMap } from "@/types/questions";
import { ReactNode } from "react";

export const QuestionDetailsGenerator = ({
  question,
}: {
  question: Question;
}) => {
  switch (question.questionType) {
    case "text":
      const qOpts = question.options as QuestionOptionsMap["text"];
      return (
        <OptsWrapper>
          <p>
            Maximum {qOpts.maxAnswerLength} characters, Minimum{" "}
            {qOpts.minAnswerLength} characters
          </p>
        </OptsWrapper>
      );
  }
  return null;
};

const OptsWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="text-xs block opacity-60">{children}</div>;
};
