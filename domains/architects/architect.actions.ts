'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateFormData } from "../identity/auth/safeAction";
import { createArchitectService, updateArchitectService } from "./architect.services";
import { ArchitectCreationSchema, ArchitectUpdateSchema } from "./architect.validations";


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