import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};
export const ResetButton = ({ onClick, disabled }: Props) => {
  return (
    <Button
      className="ml-1 h-9 w-9 bg-primary"
      title="Reset"
      disabled={disabled}
      onClick={onClick}
    >
      <RefreshCcw />
    </Button>
  );
};
