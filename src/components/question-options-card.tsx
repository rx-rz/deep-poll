import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const QuestionOptionsCard = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-5 mt-8">
      <p className="text-left font-medium text-sm -mb-2">Question</p>
      {children}
    </div>
  );
};
