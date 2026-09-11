'use client';

import AppPage from "@/components/page/AppPage";
import { useSidePanel } from "@/context/SidepanelProvider";
import SaleCard from "./SaleCard";
import { Sale } from "@/generated/prisma/client";

export type SaleOverride = Omit<Sale, "amount"> & {
  amount: number;
}

type Props = {
  sales: SaleOverride[]
}

export default function AdminSales ({ sales }: Props) {
    const { loadModal } = useSidePanel()
    return (
        <AppPage className="flex-col space-y-4" >
            <button 
                type="button"
                onClick={() => loadModal('create-sale')}
                className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
            >
                + Add
            </button>
            {(!!sales?.length &&
                <ul className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto scrollbar-adjust pr-4">
                    {sales?.map((s) => (<SaleCard key={s.id} sale={s} />))}
                </ul>
            )}
            {!sales?.length && (
                <div className="flex-1 centered">
                    <p className="">No sale records</p>
                </div>
            )}
        </AppPage>
    );
}