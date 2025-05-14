import { ReactNode } from "react";

export const AnswersLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-lg w-[95%] flex flex-col my-4 mx-auto">
      {children}
    </main>
  );
};
