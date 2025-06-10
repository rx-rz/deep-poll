import { Link, useParams } from "wouter";
import { useGetSurveyResponses } from "../api/use-get-survey-responses";
import { protectedRoutes } from "@/routes";
import { useGetQuestionAnswers } from "../api/use-get-question-answers";
import { getResponseChartUI } from "@/lib/get-response-chart-ui";
import { QuestionIcon } from "@/lib/question-editor-props";

export const SurveyResponses = () => {
  const { responses } = useGetSurveyResponses();
  const { questionAnswers } = useGetQuestionAnswers();
  const { surveyId } = useParams();

  return (
    <div>
      <p className="text-xl font-bold">
        {responses ? responses.length : 0} responses
      </p>
      <div className="">
        {questionAnswers?.questions.map((question, index) => (
          <div className="p-8 border-2 mt-12 relative" key={question.id}>
            <div className="flex items-center gap-1 text-primary">
              <div>{QuestionIcon[question.questionType]}</div>
              <p className="text-xs mb-1">{question.questionType}</p>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <p className="opacity-60">{index + 1}</p>
              <p className="text-lg font-medium">{question.questionText}</p>
            </div>
            {getResponseChartUI(question)}
          </div>
        ))}
      </div>
      {responses?.map((response) => (
        <Link
          key={response.id}
          href={protectedRoutes.VIEW_SURVEY_RESPONSE_DETAILS(
            surveyId ?? "",
            response.id
          )}
        >
          <p>{new Date(response.submittedAt ?? "").toDateString()} </p>
          <p></p>
        </Link>
      ))}
    </div>
  );
};
