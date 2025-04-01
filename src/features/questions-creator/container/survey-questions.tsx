import { useQuestionStore } from "@/store/questions.store";

import { QuestionEditor } from "./question-editor";
import { Link } from "wouter";

export const SurveyQuestions = () => {
  const { questions } = useQuestionStore();

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <Link to="/answer">Answers</Link>
      <div className="w-fit  flex flex-col gap-3">
        {questions.map((question) => (
          <QuestionEditor
            questionId={question.questionId}
            questionType={question.questionType}
            key={question.questionId}
          />
        ))}
      </div>
    </div>
  );
};
