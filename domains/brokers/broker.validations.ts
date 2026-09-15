import z from "zod";

export const BrokerCreationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  companyId: z.string("Invalid company ID"),
});

export const BrokerUpdateSchema = z.object({
    id: z.uuid("Invalid ID"),
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    companyId: z.uuid("Invalid company ID"),
})

export const BrokerDeleteSchema = z.object({
    id: z.uuid(),
})

export type BrokerCreationType = z.infer<typeof BrokerCreationSchema>
export type BrokerUpdateType = z.infer<typeof BrokerUpdateSchema>
export type BrokerDeleteType = z.infer<typeof BrokerDeleteSchema>