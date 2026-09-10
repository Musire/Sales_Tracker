'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction";
import { createBrokerService, deleteBrokerService, updateBrokerService } from "./broker.services";
import { BrokerCreationSchema, BrokerDeleteSchema, BrokerUpdateSchema } from "./broker.validations";

export const createBroker = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(BrokerCreationSchema, formData)

        const res = await createBrokerService(validated)
        revalidatePath('/brokers')
        return res
    }
    
)

export const updateBroker = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    
    async (_:any, formData: FormData) => {
        const validated = validateFormData(BrokerUpdateSchema, formData)

        const res = await updateBrokerService(validated)
        revalidatePath('/brokers')
        return res
    }
)

export const deleteBroker = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    
    async (input: { id: string }) => {
        const validated = validateSchema(BrokerDeleteSchema, input)

        const res = await deleteBrokerService(validated)
        revalidatePath('/brokers')
        return res
    }
)