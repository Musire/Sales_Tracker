import z from "zod";

export const ArchitectCreationSchema = z.object({
    name: z.string(),
    email: z.email(),
})

export const ArchitectUpdateSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
})

export const ArchitectDeleteSchema = z.object({
    id: z.uuid(),
})

export type ArchitectCreationType = z.infer<typeof ArchitectCreationSchema>
export type ArchitectUpdateType = z.infer<typeof ArchitectUpdateSchema>
export type ArchitectDeleteType = z.infer<typeof ArchitectDeleteSchema>