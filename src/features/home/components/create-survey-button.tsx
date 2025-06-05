import { PlusSquare } from "lucide-react";
import { useCreateSurvey } from "../api/use-create-survey";

export const CreateSurveyButton = () => {
  const { handleSubmit, loading } = useCreateSurvey();

  return (
    <button
      disabled={loading}
      className="border-4  border-secondary hover:bg-secondary/20 transition-colors duration-150 border-dashed p-4 h-48 shadow-sm  hover:cursor-pointer "
      onClick={handleSubmit}
    >
      <div className="flex flex-col gap-3  w-fit mx-auto">
        <PlusSquare
          className="mx-auto"
          size={100}
          strokeWidth={1}
          stroke="#3b82f6"
        />
        <p className=""> Create Survey</p>
      </div>
    </button>
  );
};
