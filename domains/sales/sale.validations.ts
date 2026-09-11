import z from "zod";

export const SaleCreationSchema = z.object({
  companyId: z.uuid("Invalid company ID"),
  createdById: z.uuid("Invalid user ID"),
  customerName: z.string().trim().min(1, "Customer name cannot be empty").optional().nullable(),
  amount: z
    .union([z.number(), z.string()])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    })
    .transform((val) => Number(val)),

  notes: z.string().trim().optional().nullable(),
});

export const SaleUpdateSchema = z.object({
  id: z.uuid("invalid id"),
  companyId: z.uuid("Invalid company ID"),
  createdById: z.uuid("Invalid user ID"),
  customerName: z.string().trim().min(1, "Customer name cannot be empty").optional().nullable(),
  amount: z
    .union([z.number(), z.string()])
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    })
    .transform((val) => Number(val)),

  notes: z.string().trim().optional().nullable(),
});

export const SaleDeleteSchema = z.object({
    id: z.uuid(),
})

export type SaleCreationType = z.infer<typeof SaleCreationSchema>
export type SaleUpdateType = z.infer<typeof SaleUpdateSchema>
export type SaleDeleteType = z.infer<typeof SaleDeleteSchema>