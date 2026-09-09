'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction";
import { createCompanyService, deleteCompanyService, updateCompanyService } from "./company.services";
import { CompanyCreationSchema, CompanyDeleteSchema } from "./company.validations";


export const createCompany = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_: any, formData: FormData) => {
        const validation = validateFormData(CompanyCreationSchema, formData)
        const res = createCompanyService(validation)
        revalidatePath('/companies')
        return res
    }
)

export const updateCompany = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (_: any, formData: FormData) => {
        const validation = validateFormData(CompanyCreationSchema, formData)
        const res = updateCompanyService(validation)
        revalidatePath('/companies')
        return res
    }
)

export const deleteCompany = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    async (id: string) => {
        const validation = validateSchema(CompanyDeleteSchema, {id})
        const res = deleteCompanyService(validation)
        revalidatePath('/companies')
        return res
    }
)