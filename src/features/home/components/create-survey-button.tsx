import { PlusSquare } from "lucide-react";
import { useCreateSurvey } from "../api/use-create-survey";

export const CreateSurveyButton = () => {
  const { handleSubmit, loading } = useCreateSurvey();

  return (
    <button
      disabled={loading}
      className="border-2 hover:bg-secondary/20 transition-colors duration-150  p-8 h-72 hover:cursor-pointer "
      onClick={handleSubmit}
    >
      <div className="flex flex-col gap-3  w-fit mx-auto">
        <PlusSquare
          className="mx-auto text-primary"
          size={100}
          strokeWidth={1}
        />
        <p className=""> Create Survey</p>
      </div>
    </button>
  );
};
