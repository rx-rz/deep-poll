import { Control } from "react-hook-form";
import { useLocation } from "wouter";

export const useDetermineWhetherAnswerInputIsForResponseViewingOnly = ({
  control,
}: {
  control?: Control<any>;
}) => {
  const [location] = useLocation();
  if (location.includes("response")) {
    return true;
  }
  return false;
};
