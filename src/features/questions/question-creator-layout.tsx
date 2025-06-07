import { SurveyOptions } from "./container/survey-options";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const QuestionsLayout = ({ children }: Props) => {

  return (
    <div className="md:w-[90%] mx-auto min-h-screen border-x four-border px-12 ">
      <SurveyOptions />
      <div className="max-w-lg mx-auto w-[96%] mb-16">{children}</div>
    </div>
  );
};
