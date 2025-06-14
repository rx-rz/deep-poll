import { Question, QuestionOptionsMap } from "@/types/questions";
import { z } from "zod";

export const generateQuestionSchemas = (
  questions: Question[]
): z.ZodObject<any> => {
  console.log(questions);
  const schemaShape: Record<string, z.ZodSchema> = {};
  questions.forEach((question) => {
    let schema: z.ZodSchema = z.any();
    switch (question.questionType) {
      case "text":
        const { minAnswerLength, maxAnswerLength } =
          question.options as QuestionOptionsMap["text"];
        let textSchema = z.string();
        if (minAnswerLength) {
          textSchema = textSchema.min(minAnswerLength, {
            message: `Answer cannot be less than ${minAnswerLength} characters`,
          });
        }
        if (maxAnswerLength) {
          textSchema = textSchema.max(maxAnswerLength, {
            message: `Answer cannot be more than ${maxAnswerLength} characters`,
          });
        }
        schema = question.required
          ? textSchema.min(1, { message: "This field is required." })
          : textSchema.optional();
        break;
      case "email":
        const {
          minEmailLength,
          maxEmailLength,
          allowedDomains,
          disallowedDomains,
        } = question.options as QuestionOptionsMap["email"];
        let emailSchema = z.string().email({ message: "Invalid email format" });
        if (minEmailLength) {
          emailSchema = emailSchema.min(minEmailLength, {
            message: `Email cannot be less than ${minEmailLength} characters`,
          });
        }
        if (maxEmailLength) {
          emailSchema = emailSchema.max(maxEmailLength, {
            message: `Email cannot be more than ${maxEmailLength} characters`,
          });
        }

        const validateEmailDomain = (email: string): boolean => {
          const domain = email.split("@")[1];

          if (disallowedDomains) {
            const disallowedDomainList = disallowedDomains
              .split(",")
              .map((d) => d.trim());
            if (disallowedDomainList.includes(domain)) {
              return false;
            }
          }

          if (allowedDomains) {
            const allowedDomainList = allowedDomains
              .split(",")
              .map((d) => d.trim());
            return allowedDomainList.includes(domain);
          }

          return true;
        };
        schema = question.required
          ? emailSchema.nonempty({ message: "This field is required" }).refine(
              (email) => {
                const val = validateEmailDomain(email);
                return val;
              },
              { message: `Email domain not valid` }
            )
          : emailSchema.optional().refine(
              (email) => {
                if (email) {
                  const val = validateEmailDomain(email);
                  return val;
                }
              },
              {
                message: "Email domain not valid",
              }
            );
        break;
      case "number":
        const numberOptions = question.options as QuestionOptionsMap["number"];
        let numberSchema = numberOptions.allowDecimal
          ? z.coerce.number({ message: "Input must be a number" })
          : z.coerce
              .number({ message: "Input must be a number" })
              .int({ message: "Number must be an integer, not a decimal" });
        if (numberOptions.min !== undefined) {
          numberSchema = numberSchema.min(numberOptions.min, {
            message: `Number cannot be less than ${numberOptions.min}`,
          });
        }
        if (numberOptions.max !== undefined) {
          numberSchema = numberSchema.max(numberOptions.max, {
            message: `Number cannot be more than ${numberOptions.max}`,
          });
        }
        schema = question.required ? numberSchema : numberSchema.optional();
        break;
      case "multiple_choice":
        const { allowOther, choices } =
          question.options as QuestionOptionsMap["multiple_choice"];

        z.enum([...choices] as any, {
          required_error: "You need to select at least one",
        });
        let multipleChoiceSchema = z.enum(
          [...choices] as [string, ...string[]],
          {
            required_error: "You need to select at least one",
          }
        );
        schema = multipleChoiceSchema;
        if (allowOther) {
          schema = z.string({
            required_error: "Choose an option or enter value",
          });
        }
        break;
      case "linear_scale":
        const linearScaleOptions =
          question.options as QuestionOptionsMap["linear_scale"];

        const linearScaleSchema = z
          .number()
          .min(linearScaleOptions.min, {
            message: `Value cannot be less than ${linearScaleOptions.min}`,
          })
          .max(linearScaleOptions.max, {
            message: `Value cannot be more than ${linearScaleOptions.max}`,
          });
        schema = question.required
          ? linearScaleSchema
          : linearScaleSchema.optional();
        break;
      case "checkbox":
        const checkboxOptions =
          question.options as QuestionOptionsMap["checkbox"];
        const checkboxSchema = z
          .array(z.string())
          .refine(
            (value) =>
              !checkboxOptions.minSelections ||
              value.length >= checkboxOptions.minSelections,
            {
              message: `Select at least ${checkboxOptions.minSelections} choices`,
            }
          )
          .refine(
            (value) =>
              !checkboxOptions.maxSelections ||
              value.length <= checkboxOptions.maxSelections,
            {
              message: `Select at most ${checkboxOptions.maxSelections} choices`,
            }
          );
        schema = question.required ? checkboxSchema : checkboxSchema.optional();
        break;
      case "dropdown":
        const dropdownOptions =
          question.options as QuestionOptionsMap["dropdown"];
        if (dropdownOptions?.choices) {
          schema = question.required
            ? z
                .string()
                .refine((value) => dropdownOptions.choices.includes(value), {
                  message: "Invalid choice",
                })
            : z
                .string()
                .optional()
                .refine(
                  (value) => !value || dropdownOptions.choices.includes(value),
                  {
                    message: "Invalid choice",
                  }
                );
        }
        break;
      case "rating":
        const ratingOptions = question.options as QuestionOptionsMap["rating"];
        if (ratingOptions) {
          schema = question.required
            ? z.number().min(ratingOptions.min).max(ratingOptions.max)
            : z
                .number()
                .min(ratingOptions.min)
                .max(ratingOptions.max)
                .optional();
        }
        break;
      case "likert":
        const likertOptions = question.options as QuestionOptionsMap["likert"];
        if (likertOptions) {
          schema = question.required
            ? z.number().min(1).max(likertOptions.scale)
            : z.number().min(1).max(likertOptions.scale).optional();
        }
        break;
      case "slider":
        const sliderOptions = question.options as QuestionOptionsMap["slider"];

        schema = question.required
          ? sliderOptions.range
            ? z.tuple([
                z.number().min(sliderOptions.min).max(sliderOptions.max),
                z.number().min(sliderOptions.min).max(sliderOptions.max),
              ])
            : z.number().min(sliderOptions.min).max(sliderOptions.max)
          : sliderOptions.range
          ? z
              .tuple([
                z.number().min(sliderOptions.min).max(sliderOptions.max),
                z.number().min(sliderOptions.min).max(sliderOptions.max),
              ])
              .optional()
          : z.number().min(sliderOptions.min).max(sliderOptions.max).optional();

        break;
      case "date":
        schema = question.required
          ? z.string().nonempty()
          : z.string().optional();
        break;
      case "datetime":
        schema = question.required
          ? z.string().nonempty()
          : z.string().optional();
        break;
      case "time":
        schema = question.required
          ? z.string().nonempty()
          : z.string().optional();
        break;
      default:
        schemaShape[question.id] = z.any();
        break;
    }
    schemaShape[question.id] = schema;
  });
  return z.object(schemaShape);
};
