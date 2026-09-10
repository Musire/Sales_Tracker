import z from "zod";

export const BrokerCreationSchema = z.object({
    name: z.string(),
    email: z.email(),
})

export const BrokerUpdateSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
})

export const BrokerDeleteSchema = z.object({
    id: z.uuid(),
})

export type BrokerCreationType = z.infer<typeof BrokerCreationSchema>
export type BrokerUpdateType = z.infer<typeof BrokerUpdateSchema>
export type BrokerDeleteType = z.infer<typeof BrokerDeleteSchema>