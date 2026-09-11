'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getCompanyDetailsService, getCompanyService } from "./company.services";

export const getCompanies = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getCompanyService
)

export const getCompanyDetails = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getCompanyDetailsService
)