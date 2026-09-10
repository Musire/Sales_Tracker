'use client';

import AppPage from "@/components/page/AppPage";
import { useSidePanel } from "@/context/SidepanelProvider";
import CompanyCard, { CompanyWithMeta } from "./CompanyCard";

type Props = {
  companies: CompanyWithMeta[]
}

export default function AdminCompanies ({ companies }: Props) {
    const { loadModal } = useSidePanel()
    return (
        <AppPage className="flex flex-col space-y-4" >
            <button 
                type="button"
                onClick={() => loadModal('create-company')}
                className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
            >
                + Add
            </button>
            <ul className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto scrollbar-adjust pr-4">
                {companies?.map((c) => (<CompanyCard key={c.id} company={c} />))}
            </ul>
        </AppPage>
    );
}