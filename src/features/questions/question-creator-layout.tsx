import { SurveyOptions } from "./container/survey-options";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const QuestionsLayout = ({ children }: Props) => {
  return (
    <div className=" w-[99%] mx-auto ">
      <div className=" mx-auto pb-8  ">
        <div className="bg-input sticky top-0 z-10 w-full border-b four-border">
          <SurveyOptions />
        </div>
        <div className="max-w-2xl mx-auto w-[96%] pb-20">{children}</div>
      </div>
    </div>
  );
};
