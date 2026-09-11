'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction";
import { SaleCreationSchema, SaleDeleteSchema, SaleUpdateSchema } from "./sale.validations";

export const createSale = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(SaleCreationSchema, formData)

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