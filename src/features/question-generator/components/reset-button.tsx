import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

type Props = {
  onClick: () => void;
};
export const ResetButton = ({ onClick }: Props) => {
  return (
    <Button
      className=" bg-gradient-to-br  h-8 w-8 from-blue-500 to-blue-700"
      title="Reset"
      onClick={onClick}
    >
      <RefreshCcw />
    </Button>
  );
};
