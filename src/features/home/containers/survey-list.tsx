import { Link } from "wouter";
import { useGetSurveys } from "../api/use-get-surveys";
import { useQuestionStore } from "@/store/questions.store";
import { protectedRoutes } from "@/routes";
import { queryClient } from "@/App";

export const SurveyList = () => {
  const { surveys, loading, error } = useGetSurveys();
  const { resetQuestions, resetApiQueuedQuestions } = useQuestionStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log({surveys: queryClient.getQueryData(["surveys"])})
  return (
    <div className="">
      <div className=" mx-auto">

        <ul className="space-y-4 grid grid-cols-2">
          {surveys &&
            surveys.map((survey) => (
              <li key={survey.id} className="border ">
                <Link
                  onClick={() => {
                    resetQuestions();
                    resetApiQueuedQuestions();
                  }}
                  href={protectedRoutes.CREATE_SURVEY(survey.id)}
                  className="block w-full px-4 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div>
                    <div className="h-48 border mb-3"></div>
                    <h2 className="text-xl font-medium text-gray-900">
                      {survey.title}
                    </h2>

                    <p className="text-sm text-gray-500">{survey.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          {surveys && surveys.length === 0 && (
            <li className="text-gray-500">No surveys available.</li>
          )}
          {!surveys && <li className="text-gray-500">Loading surveys...</li>}
        </ul>
      </div>
    </div>
  );
};
