import { Question, QuestionOptionsMap } from "@/types/questions";
import { z } from "zod";

export const generateQuestionSchemas = (
  questions: Question[]
): z.ZodObject<any> => {
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
          ? textSchema.nonempty({ message: "Required!" })
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

          return true; // No restrictions, accept.
        };
        schema = question.required
          ? emailSchema.nonempty({ message: "Required!" }).refine(
              (email) => {
                const val = validateEmailDomain(email);
                return val;
              },
              { message: "Domain issue" }
            )
          : emailSchema.optional().refine(
              (email) => {
                if (email) {
                  const val = validateEmailDomain(email);
                  return val;
                }
              },
              {
                message: "Domain issue",
              }
            );
        break;
      case "number":
        const { allowDecimal, min, max } =
          question.options as QuestionOptionsMap["number"];
        let numberSchema = allowDecimal
          ? z.coerce.number({ message: "Input must be a number" })
          : z.coerce
              .number({ message: "Input must be a number" })
              .int({ message: "Number must be an integer, not a decimal" });
        if (min !== undefined) {
          numberSchema = numberSchema.min(min, {
            message: `Number cannot be less than ${min}`,
          });
        }
        if (max !== undefined) {
          numberSchema = numberSchema.max(max, {
            message: `Number cannot be more than ${max}`,
          });
        }
        schema = question.required ? numberSchema : numberSchema.optional();
        break;
      default:
        schemaShape[question.questionId] = z.any();
        break;
    }
    schemaShape[question.questionId] = schema;
  });
  return z.object(schemaShape);
};
