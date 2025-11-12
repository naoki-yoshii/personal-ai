import { z } from "zod";

export const CitationSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  snippet: z.string().optional(),
  publishedAt: z.string().datetime().optional()
});
export type Citation = z.infer<typeof CitationSchema>;

export const makeCitation = (data: unknown) => CitationSchema.parse(data);
