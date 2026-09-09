import z from "zod";

export const CompanyCreationSchema = z.object({
  name: z.string().min(1),
  architectId: z.uuid(),
})

export const CompanyUpdateSchema = z.object({
  name: z.string().min(1),
  architectId: z.uuid(),
})

export const CompanyDeleteSchema = z.object({
  id: z.uuid()
})


export type CompanyCreationType = z.infer<typeof CompanyCreationSchema>
export type CompanyUpdateType = z.infer<typeof CompanyUpdateSchema>
export type CompanyDeleteType = z.infer<typeof CompanyDeleteSchema>
