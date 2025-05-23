import { Link, useParams } from "wouter";
import { useGetSurveyResponses } from "../api/use-get-survey-responses";
import { protectedRoutes } from "@/routes";

export const SurveyResponses = () => {
  const { responses } = useGetSurveyResponses();
  const { surveyId } = useParams();
  return (
    <div>
      <p className="text-xl font-bold">
        {responses ? responses.length : 0} responses
      </p>
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
