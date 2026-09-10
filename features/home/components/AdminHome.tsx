import AppPage from "@/components/page/AppPage";
import { CompanyRanking } from "./CompanyRanking";
import { SalesLifecycle } from "./SalesLifecycle";
import { DateRange } from "./DateRange";

export default function AdminHome () {
    const cardStyle = 'w-32 bg-surface-1 rounded-lg border border-border h-24 centered-col space-y-2 shrink-0'
    return (
        <AppPage className="flex-col space-y-4">
            <DateRange />
            <ul className="flex items-center space-x-4 max-w-full overflow-x-auto scrollbar-none">
                <li className={cardStyle}>
                    <span className="text-sm uppercase text-else">revenue</span>
                    <span className="text-2xl">{`$3.4M`}</span>
                </li>
                <li className={cardStyle}>
                    <span className="text-sm uppercase text-else">architects</span>
                    <span className="text-2xl">3</span>
                </li>
                <li className={cardStyle}>
                    <span className="text-sm uppercase text-else">companies</span>
                    <span className="text-2xl">9</span>
                </li>
                <li className={cardStyle}>
                    <span className="text-sm uppercase text-else">brokers</span>
                    <span className="text-2xl">45</span>
                </li>
            </ul>
            <SalesLifecycle />
            <CompanyRanking />
        </AppPage>
    );
}