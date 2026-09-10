'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction";
import { createArchitectService, deleteArchitectService, updateArchitectService } from "./architect.services";
import { ArchitectCreationSchema, ArchitectDeleteSchema, ArchitectUpdateSchema } from "./architect.validations";


export const createArchitect = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(ArchitectCreationSchema, formData)
        const res = createArchitectService(validated)
        revalidatePath('/architects')
        return res
    }
)

export const updateArchitect = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(ArchitectUpdateSchema, formData)
        const res = updateArchitectService(validated)
        revalidatePath('/architects')
        return res
    }
)

export const deleteArchitect = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (input: { id: string }) => {
        const validated = validateSchema(ArchitectDeleteSchema, input)
        const res = deleteArchitectService(validated)
        revalidatePath('/architects')
        return res
    }
)