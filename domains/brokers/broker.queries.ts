'use server';

import { createSafeAction } from "../identity/auth/safeAction";
import { getBrokerService } from "./broker.services";

export const getBrokers = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getBrokerService
)