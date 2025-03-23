// sliderOptionsSchema.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const sliderOptionsSchema = z
  .object({
    min: z.number().default(0),
    max: z.number().default(100),
    step: z.number().default(1),
    labels: z.object({
      start: z.string().default(""),
      end: z.string().default(""),
    }),
    range: z.boolean().default(false),
    defaultValue: z
      .union([z.number(), z.tuple([z.number(), z.number()])])
      .optional(),
  })
  .refine((data) => data.max > data.min, {
    message: "Maximum value must be greater than minimum value",
    path: ["max"],
  })
  .refine(
    (data) => {
      if (data.range && Array.isArray(data.defaultValue)) {
        return (
          data.defaultValue[0] >= data.min &&
          data.defaultValue[1] <= data.max &&
          data.defaultValue[0] <= data.defaultValue[1]
        );
      }
      if (!data.range && typeof data.defaultValue === "number") {
        return data.defaultValue >= data.min && data.defaultValue <= data.max;
      }
      return true;
    },
    {
      message: "Default value(s) must be within the min and max range.",
      path: ["defaultValue"],
    }
  );

export type SliderOptionsDto = z.infer<typeof sliderOptionsSchema>;

type FormValidatorProps = {
  questionOptions: SliderOptionsDto;
  setQuestionOptions: React.Dispatch<React.SetStateAction<SliderOptionsDto>>;
};

export const useSliderOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<SliderOptionsDto>({
    resolver: zodResolver(sliderOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: SliderOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
