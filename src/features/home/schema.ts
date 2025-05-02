import { z } from "zod";

const idSchema = z.string().cuid();
export const createSurveySchema = z.object({
  accountId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  requiresSignIn: z.boolean().optional().default(false),
  showProgressBar: z.boolean().optional().default(false),
  showLinkToSubmitAnother: z.boolean().optional().default(false),
  isPublished: z.boolean().optional().default(false),
});

export const updateSurveySchema = createSurveySchema
  .omit({ accountId: true })
  .merge(z.object({ id: z.string().cuid() }))
  .partial();

export type CreateSurveyDto = z.infer<typeof createSurveySchema>;
export type UpdateSurveyDto = z.infer<typeof updateSurveySchema>;
export const v = { idSchema, createSurveySchema, updateSurveySchema };
