import { z } from "zod";

export const questionTextSchema = z.string().nonempty("Question text is required");