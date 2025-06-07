import { SurveyOptions } from "./container/survey-options";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const QuestionsLayout = ({ children }: Props) => {
  return (
    <div className="border eight-border w-[99%] mx-auto ">
      <div className="bg-  mx-auto min-h-screen pb-8  ">
        <div className="bg-input w-full border-b four-border">
        <SurveyOptions />
        </div>
        <div className="max-w-lg mx-auto w-[96%] mb-16">{children}</div>
      </div>
    </div>
  );
};
