'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getCompanyService } from "./company.services";

export const getCompanies = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getCompanyService
)