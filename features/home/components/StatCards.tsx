import { formatCompactNumber } from "@/lib/utils/stringMutate";

export type StatCardType = {
    revenue: number;
    architects: number;
    companies: number;
    brokers: number;
}

type Props = {
  data: StatCardType
}

export default function StatCards ({ data }: Props) {
    const { revenue,architects, companies, brokers } = data
    const cardStyle = 'w-32 bg-surface-1 rounded-lg border border-border h-24 centered-col space-y-2 shrink-0'
    return (
        <ul className="flex items-center space-x-4 max-w-full overflow-x-auto scrollbar-none">
            <li className={cardStyle}>
                <span className="text-sm uppercase text-else">revenue</span>
                <span className="text-2xl">{`${formatCompactNumber(revenue)}`}</span>
            </li>
            <li className={cardStyle}>
                <span className="text-sm uppercase text-else">architects</span>
                <span className="text-2xl">{architects}</span>
            </li>
            <li className={cardStyle}>
                <span className="text-sm uppercase text-else">companies</span>
                <span className="text-2xl">{companies}</span>
            </li>
            <li className={cardStyle}>
                <span className="text-sm uppercase text-else">brokers</span>
                <span className="text-2xl">{brokers}</span>
            </li>
        </ul>
    );
}