import { useQuestionStore } from "@/store/questions.store";

import { QuestionEditor } from "../components/question-editor";

export const SurveyQuestions = () => {
  const { questions } = useQuestionStore();

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {questions.map((question) => (
        <QuestionEditor
          questionId={question.questionId}
          questionType={question.questionType}
          key={question.questionId}
        />
      ))}
    </div>
  );
};
