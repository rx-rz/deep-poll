import { Loader2 } from "lucide-react";

type Props = {
  text: string;
};
export const LoadingStateText = ({ text }: Props) => {
  return (
    <p className="inline-flex gap-2 items-center">
      <span>
        <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
        {text}
      </span>
      <span></span>
    </p>
  );
};
