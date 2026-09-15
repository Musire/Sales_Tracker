import { SaleStatus } from "@/generated/prisma/enums";
import z from "zod";

const DecimalSchema = z.coerce
  .number({ error: "Amount is required" })
  .positive({ message: "Amount must be greater than zero" })
  .multipleOf(0.01, { message: "Maximum of 2 decimal places allowed" });

export const SaleCreationSchema = z.object({
  customerName: z.string().min(1, { message: "Customer name is required" }).nullable().optional(),
  amount: DecimalSchema,
  notes: z.string().max(1000, { message: "Notes cannot exceed 1000 characters" }).nullable().optional(),
});

export const CompleteCreationSchema = SaleCreationSchema.extend({
  companyId: z.uuid({ message: "Invalid company ID" }),
  createdById: z.uuid({ message: "Invalid creator user ID" }),
});

export const SaleUpdateSchema = z.object({
  id: z.uuid({ message: "Invalid sale ID" }),
  companyId: z.uuid({ message: "Invalid company ID" }).optional(),
  customerName: z.string().min(1, { message: "Customer name is required" }).nullable().optional(),
  amount: DecimalSchema.optional(),
  notes: z.string().max(1000, { message: "Notes cannot exceed 1000 characters" }).nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "CLOSED", "DELIVERED"]).optional(), 
  active: z.boolean().optional(),
});

export const SaleDeleteSchema = z.object({
  id: z.uuid({ message: "Invalid sale ID" }),
});

export const UpdateSaleStatusSchema = z.object({
  id: z.string().min(1, 'ID needed to update status'),
  newStatus: z.enum(SaleStatus, {
    message: 'Invalid status provided',
  }),
})

export type SaleCreationType = z.infer<typeof SaleCreationSchema>;
export type CompleteSaleCreationType = z.infer<typeof CompleteCreationSchema>;
export type SaleUpdateType = z.infer<typeof SaleUpdateSchema>;
export type SaleDeleteType = z.infer<typeof SaleDeleteSchema>;
export type UpdateSaleStatusType = z.infer<typeof UpdateSaleStatusSchema>;


