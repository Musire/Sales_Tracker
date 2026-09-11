'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getBrokerDetailsService, getBrokerService } from "./broker.services";

export const getBrokers = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getBrokerService
)

export const getBrokerDetails = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getBrokerDetailsService
)
