import { Link, useParams } from "wouter";
import { useGetSurveyResponses } from "../api/use-get-survey-responses";
import { protectedRoutes } from "@/routes";
import { useGetQuestionAnswers } from "../api/use-get-question-answers";
import { getResponseChartUI } from "@/lib/get-response-chart-ui";
import { QuestionIcon } from "@/lib/question-editor-props";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

export const SurveyResponses = () => {
  const { responses } = useGetSurveyResponses();
  const { questionAnswers } = useGetQuestionAnswers();
  const { surveyId } = useParams();

  return (
    <div>
      <Tabs className="mt-10">
        <TabsList
          defaultChecked
          defaultValue="stats"
          className="self-end mb-12"
        >
          <TabsTrigger value="stats">Response Statistics</TabsTrigger>
          <TabsTrigger value="deets">Response Details</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <div className="">
            {questionAnswers?.questions.map((question, index) => (
              <div className="p-8 border-2 relative mb-8" key={question.id}>
                <div className="flex items-center gap-1 text-primary">
                  <div>{QuestionIcon[question.questionType]}</div>
                  <p className="text-xs mb-1">{question.questionType}</p>
                </div>
                <div className="flex items-center gap-3 mb-12">
                  <p className="opacity-60 text-xl">{index + 1}</p>
                  <p className="text-xl font-medium">{question.questionText}</p>
                </div>
                {getResponseChartUI(question)}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="deets">
          {responses?.map((response, i) => (
            <Link
              key={response.id}
              href={protectedRoutes.VIEW_SURVEY_RESPONSE_DETAILS(
                surveyId ?? "",
                response.id
              )}
              className={"block my-3 hover:text-primary"}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3  text-lg">
                  <p className="opacity-70 text-black">{i + 1}.</p>
                  <p className="font-medium">
                    Response submitted on{" "}
                    {new Date(response.submittedAt ?? "").toDateString()}{" "}
                  </p>
                </div>
                <Eye strokeWidth={1.9} className="text-primary" />
              </div>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
