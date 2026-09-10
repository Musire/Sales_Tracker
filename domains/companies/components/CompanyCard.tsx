'use client';
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { Company } from "@/generated/prisma/client";

type Props = {
  company: Company
}

export default function CompanyCard ({ company }: Props) {
    const { loadModal } = useBottomDrawer()
    return (
        <article 
            onClick={() => loadModal('company-details', company)} 
            className="bg-surface-1 h-24 shrink-0 border border-border p-4 cursor-pointer flex flex-col space-y-4"
        >
            <p className="text-main text-xl">{company.name}</p>
            <p className="text-else">{`brokers : 7`}</p>
        </article>
    );
}