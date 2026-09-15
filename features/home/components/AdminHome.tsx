import AppPage from "@/components/page/AppPage";
import { getDashboard } from "../dashboard.queries";
import { CompanyRanking } from "./CompanyRanking";
import { DateRange } from "./DateRange";
import { SalesLifecycle } from "./SalesLifecycle";
import StatCards from "./StatCards";


export default async function AdminHome () {
    const { data: dashboardData } = await getDashboard()
    if (!dashboardData) {
        return (
            <AppPage>
                <p className="">not found yo</p>
            </AppPage>
        )
    }
      
    return (
        <AppPage className="flex-col space-y-4">
            <DateRange />
            <StatCards data={dashboardData.stats} />
            <SalesLifecycle data={dashboardData.stagedData} />
            <CompanyRanking data={dashboardData.companyRankings} />
        </AppPage>
    );
}