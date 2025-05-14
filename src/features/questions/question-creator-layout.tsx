import { SurveyOptions } from "./container/survey-options";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const QuestionCreatorLayout = ({ children }: Props) => {

  return (
    <div className="w-full border">
      <SurveyOptions />
      <div className="max-w-lg mx-auto w-[96%] mb-16">{children}</div>
    </div>
  );
};
