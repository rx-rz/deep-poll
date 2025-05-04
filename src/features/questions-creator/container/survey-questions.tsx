import { useQuestionStore } from "@/store/questions.store";

import { Link } from "wouter";
import { QuestionCreator } from "./question-creator";

export const SurveyQuestions = () => {
  const { questions } = useQuestionStore();

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      <Link to="/answer">Answers</Link>
      <div className="w-fit  flex flex-col gap-3">
        {questions.map((question) => (
          <QuestionCreator question={question} key={question.questionId}/>
        ))}
      </div>
    </div>
  );
};
