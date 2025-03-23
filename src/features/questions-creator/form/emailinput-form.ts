// email-options-form.ts
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const emailQuestionOptionsSchema = z
  .object({
    minEmailLength: z.coerce
      .number()
      .int()
      .min(1, "Minimum length must be at least 1")
      .default(1),
    maxEmailLength: z.coerce
      .number()
      .int()
      .min(1, "Maximum length must be at least 1")
      .default(255),
    placeholder: z
      .string()
      .max(300, "Placeholder must be 300 characters or less")
      .optional(),
    allowedDomains: z
      .string()
      .optional()
      .default("")
      .refine(
        (value) => {
          if (!value) return true;
          const domains = value.split(",").map((d) => d.trim());
          return domains.every((domain) =>
            /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)
          );
        },
        { message: "One or more domains are invalid" }
      ),
    disallowedDomains: z
      .string()
      .optional()
      .default("")
      .refine(
        (value) => {
          if (!value) return true;
          const domains = value.split(",").map((d) => d.trim());
          return domains.every((domain) =>
            /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)
          );
        },
        { message: "One or more domains are invalid" }
      ),
    allowDuplicates: z.boolean().default(true),
  })
  .refine((data) => data.maxEmailLength >= data.minEmailLength, {
    message:
      "Maximum email length must be greater than or equal to minimum email length",
    path: ["maxLength"],
  })
  .refine((data) => data.minEmailLength <= data.maxEmailLength, {
    message:
      "Minimum email length must be less than or equal to maximum email length",
    path: ["minEmailLength"],
  });

export type EmailQuestionOptionsDto = z.infer<
  typeof emailQuestionOptionsSchema
>;

type FormProps = {
  questionOptions: EmailQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<EmailQuestionOptionsDto>
  >;
};

export const useEmailQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormProps) => {
  const form = useForm<EmailQuestionOptionsDto>({
    resolver: zodResolver(emailQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: EmailQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
