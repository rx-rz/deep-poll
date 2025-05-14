import { useGetSurveyResponses } from "../api/use-get-survey-responses";

export const SurveyResponses = () => {
  const { responses } = useGetSurveyResponses();
  console.log(responses);
  return (
    <div>
      <p className="text-xl font-bold">
        {responses ? responses.length : 0} responses
      </p>
      {responses?.map((response) => (
        <div key={response.id}>
          <p>{new Date(response.submittedAt ?? "").toDateString()} </p>
          <p></p>
        </div>
      ))}
    </div>
  );
};
