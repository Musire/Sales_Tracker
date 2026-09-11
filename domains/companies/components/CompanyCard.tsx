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
  }[];
  _count: {
    users: number;
    sales: number;
  };
};

type Props = {
  company: CompanyWithMeta;
};

export default function CompanyCard({ company }: Props) {
  const { loadModal } = useBottomDrawer();

  return (
    <article 
      onClick={() => loadModal('company-details', { data: company })} 
      className="bg-surface-1 h-24 shrink-0 border border-border p-4 cursor-pointer flex flex-col justify-between hover:bg-surface-2 transition-colors rounded-lg"
    >
      <p className="text-main font-semibold text-lg truncate">{company.name}</p>
      <p className="text-else text-sm">
        {`${company._count.users} brokers · ${company._count.sales} sales`}
      </p>
    </article>
  );
}