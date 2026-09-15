import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getDashboardService } from "./dashboard.services";

export const getDashboard = createSafeAction(
    {
        allowedRoles: ['ADMIN']
    },
    getDashboardService
)