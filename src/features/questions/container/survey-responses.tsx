import { Link, useParams } from "wouter";
import { useGetSurveyResponses } from "../api/use-get-survey-responses";
import { protectedRoutes } from "@/routes";
import { useGetQuestionAnswers } from "../api/use-get-question-answers";
import { getResponseChartUI } from "@/lib/get-response-chart-ui";

export const SurveyResponses = () => {
  const { responses } = useGetSurveyResponses();
  const { questionAnswers } = useGetQuestionAnswers();
  const { surveyId } = useParams();

  return (
    <div>
      <p className="text-xl font-bold">
        {responses ? responses.length : 0} responses
      </p>
      <div>
        {questionAnswers?.questions.map((question) => (
          <div className="border my-4 py-8" key={question.id}>
            <p>{question.questionType}</p>
            {getResponseChartUI(question)}</div>
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
