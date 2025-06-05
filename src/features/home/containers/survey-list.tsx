import { Link } from "wouter";
import { useGetSurveys } from "../api/use-get-surveys";
import { useQuestionStore } from "@/store/questions.store";
import { protectedRoutes } from "@/routes";
import { Fragment } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";

export const SurveyList = () => {
  const { surveys, loading, error } = useGetSurveys();
  const { resetQuestions, resetApiQueuedQuestions } = useQuestionStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Fragment>
      {surveys &&
        surveys.map((survey) => (
          <li
            key={survey.id}
            className="border border-secondary transition-colors duration-150 hover:text-white hover:bg-secondary  h-fit  rounded-md items-center"
          >
            <Link
              onClick={() => {
                resetQuestions();
                resetApiQueuedQuestions();
              }}
              href={protectedRoutes.CREATE_SURVEY(survey.id)}
              className="inline-block  relative w-full px-4 py-4  h-48 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div>
                <h2 className="text-xl font-medium ">{survey.title}</h2>
                <p className="text-sm ">{survey.description}</p>
                <p className="text-xs absolute opacity-90 bottom-3 right-3 font-medium">
                  Created {new Date(survey.createdAt ?? "").toDateString()}
                </p>
                <p className="absolute bottom-3">
                  {survey.isPublished ? (
                    <Badge variant={"outline"}>Published</Badge>
                  ) : (
                    <Badge
                      variant={"outline"}
                      className="p-1 bg-gray-400 border-0 text-white text-xs px-2 rounded-md"
                    >
                      Not Published
                    </Badge>
                  )}
                </p>
                <p></p>
              </div>
            </Link>
          </li>
        ))}
      {surveys && surveys.length === 0 && (
        <li className="text-gray-500">No surveys available.</li>
      )}
      {!surveys && <li className="text-gray-500">Loading surveys...</li>}
    </Fragment>
  );
};
