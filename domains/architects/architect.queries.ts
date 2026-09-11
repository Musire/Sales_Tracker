'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getArchitectDetailsService, getArchitectService } from "./architect.services";

export const getArchitects = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getArchitectService
)

export const getArchitectDetails = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getArchitectDetailsService
)