'use client';
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { Company } from "@/generated/prisma/client";

type Props = {
  company: Company
}

export default function CompanyCard ({ company }: Props) {
    const { loadModal } = useBottomDrawer()
    return (
        <article onClick={() => loadModal('company-details', company)} className="bg-error p-4 cursor-pointer">
            <p className="">{company.name}</p>
        </article>
    );
}