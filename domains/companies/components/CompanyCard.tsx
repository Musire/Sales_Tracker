'use client';
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { Company } from "@/generated/prisma/client";

export type CompanyWithMeta = Company & {
    architect: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string | null;
    } | null;
    users: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string | null;
    }[]
    
    _count: {
        users: number;
        sales: number;
    };
}

type Props = {
  company: CompanyWithMeta
}

export default function CompanyCard ({ company }: Props) {
    const { loadModal } = useBottomDrawer()
    return (
        <article 
            onClick={() => loadModal('company-details', company)} 
            className="bg-surface-1 h-24 shrink-0 border border-border p-4 cursor-pointer flex flex-col space-y-4"
        >
            <p className="text-main text-xl">{company.name}</p>
            <p className="text-else">{`${company._count.users} brokers · ${company._count.sales} sales `}</p>
        </article>
    );
}