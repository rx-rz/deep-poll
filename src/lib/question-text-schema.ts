import { z } from "zod";

export const textQuestionSchema = z.object({
  questionText: z.string().nonempty("Question text is required"),
});
