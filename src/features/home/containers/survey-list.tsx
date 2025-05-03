import { Link } from "wouter";
import { useGetSurveys } from "../api/use-get-surveys";

export const SurveyList = () => {
  const { surveys, loading, error } = useGetSurveys();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Surveys</h1>
      <ul>
        {surveys &&
          surveys.map((survey) => (
            <Link key={survey.id} href={`/survey/${survey.id}`}>
              <h2>{survey.title}</h2>
              <p>{survey.description}</p>
            </Link>
          ))}
      </ul>
    </div>
  );
};
