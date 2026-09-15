'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction";
import { createSaleService, deleteSaleService, updateSaleService, updateSaleStatusService } from "./sale.services";
import { CompleteCreationSchema, SaleDeleteSchema, SaleUpdateSchema, UpdateSaleStatusSchema, UpdateSaleStatusType } from "./sale.validations";

export const createSale = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(CompleteCreationSchema, formData)

        const res = await createSaleService(validated)
        revalidatePath('/brokers')
        return res
    }
    
)

export const updateSale = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    
    async (_:any, formData: FormData) => {
        const validated = validateFormData(SaleUpdateSchema, formData)

        const res = await updateSaleService(validated)
        revalidatePath('/brokers')
        return res
    }
)

export const deleteSale = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    
    async (input: { id: string }) => {
        const validated = validateSchema(SaleDeleteSchema, input)

        const res = await deleteSaleService(validated)
        revalidatePath('/brokers')
        return res
    }
)

export const updateSaleStatus = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (input: UpdateSaleStatusType) => {
        const validated = validateSchema(UpdateSaleStatusSchema, input)
        const res = await updateSaleStatusService(validated)
        revalidatePath('/sales')
        return res
    }
)