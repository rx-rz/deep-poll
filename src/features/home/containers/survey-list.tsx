import { Link } from "wouter";
import { useGetSurveys } from "../api/use-get-surveys";
import { Trash2Icon } from "lucide-react";

export const SurveyList = () => {
  const { surveys, loading, error } = useGetSurveys();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
<div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Surveys</h1>
        <ul className="space-y-4">
          {surveys &&
            surveys.map((survey) => (
              <li
                key={survey.id}
                className="bg-white shadow overflow-hidden rounded-md flex items-center justify-between"
              >
                <Link
                  href={`/survey/${survey.id}`}
                  className="block w-full px-4 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">
                      {survey.title}
                    </h2>
                    <p className="mt-1 text-gray-500">{survey.description}</p>
                  </div>
                </Link>
                <button
                  // onClick={() => handleDelete(survey.id)}
                  className="px-4 py-2 text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100 transition duration-150 ease-in-out"
                >
                  <Trash2Icon className="h-5 w-5" />
                </button>
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
