import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

type Props = {
  onClick: () => void;
};
export const ResetButton = ({ onClick }: Props) => {
  return (
    <Button
      className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-blue-700"
      title="Reset"
      onClick={onClick}
    >
      <RefreshCcw />
    </Button>
  );
};
