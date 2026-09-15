import { DashboardRepository } from "./dashboard.repositories"


export async function getDashboardService () {
    return DashboardRepository.getDashboard()
}