import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  props: React.ComponentProps<"button">;
};
export const OptionsButton = ({
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button
      className="px-6 py-3 font-semibold w-full text-white bg-gradient-to-br from-blue-500 to-blue-700 rounded-md overflow-hidden shadow-lg"
      {...props}
    >
      {children}
    </Button>
  );
};
