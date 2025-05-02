import { useCreateSurvey } from "../api/use-create-survey";

export const CreateSurveyBButton = () => {
  const { handleSubmit, loading } = useCreateSurvey();

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        className="bg-yellow-300"
        onClick={handleSubmit}
      >
        Create Survey
      </button>
    </div>
  );
};
