import { Button } from "@/components/ui/button";

export const OptionsButton = ({
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button
      className="px-6 py-3 font-semibold w-full text-white bg-primary rounded-md overflow-hidden shadow-lg"
      {...props}
    >
      {children}
    </Button>
  );
};
