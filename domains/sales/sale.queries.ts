'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getSaleService } from "./sale.services";

export const getSales = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getSaleService
)