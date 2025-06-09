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
            className="hover:bg-primary hover:text-white bg-input border-2  h-fit  rounded-md items-center border-muted "
          >
            <Link
              onClick={() => {
                resetQuestions();
                resetApiQueuedQuestions();
              }}
              href={protectedRoutes.CREATE_SURVEY(survey.id)}
              className="inline-block  relative w-full p-10  h-72 focus:outline-none  transition duration-150 ease-in-out"
            >
              <div>
                <h2 className="text-xl mb-2 font-medium ">{survey.title}</h2>
                <p className="text-sm opacity-80">{survey.description}</p>
                <p className="text-xs absolute opacity-90 bottom-10 right-10 font-medium">
                  Created {new Date(survey.createdAt ?? "").toDateString()}
                </p>
                <p className="absolute bottom-10">
                  {survey.isPublished ? (
                    <Badge variant={"outline"}>Published</Badge>
                  ) : (
                    <Badge
                      variant={"default"}
                      className="p-1 border-0 text-white text-xs px-2"
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
