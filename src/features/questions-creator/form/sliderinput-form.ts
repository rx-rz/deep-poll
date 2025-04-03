import { defaultQuestionOptions } from "@/lib/default-question-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const sliderOptions = defaultQuestionOptions.slider;
export const sliderOptionsSchema = z
  .object({
    min: z.coerce
      .number({ message: "Value must be a number" })
      .default(sliderOptions.min),
    max: z.coerce
      .number({ message: "Value must be a number" })
      .default(sliderOptions.max),
    step: z.coerce
      .number({ message: "Value must be a number" })
      .default(sliderOptions.step),
    labels: z.object({
      start: z.string().default(sliderOptions.labels.start),
      end: z.string().default(sliderOptions.labels.end),
    }),
    range: z.boolean().default(sliderOptions.range),
    defaultValue: z
      .union([
        z.coerce.number(),
        z.tuple([z.coerce.number(), z.coerce.number()]),
      ])
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
