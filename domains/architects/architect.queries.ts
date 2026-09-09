'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getArchitectService } from "./architect.services";

export const getArchitects = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getArchitectService
)