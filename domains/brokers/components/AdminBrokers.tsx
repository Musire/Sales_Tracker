'use client';

import { DropdownButton } from "@/components/buttons";
import AppPage from "@/components/page/AppPage";
import { useSidePanel } from "@/context/SidepanelProvider";
import { User } from "@/generated/prisma/client";
import { useDrawer } from "@/hooks";
import useFiltering from "@/hooks/useFiltering";
import { FunnelPlus } from "lucide-react";
import BrokerCard from "./BrokerCard";

type Props = {
  brokers: User[];
  companies: {
    id: string;
    name: string;
  }[]
}

export default function AdminBrokers ({ brokers, companies }: Props) {
    const { loadModal } = useSidePanel()
    const { isMounted, animation, toggleDrawer } = useDrawer()
    const { selectedCompany, setSelectedCompany, filteredData} = useFiltering(brokers)
    
    return (
        <AppPage className="flex flex-col space-y-4">
            <div className="flex justify-end space-x-4 relative">
                {isMounted && (
                    <aside className={`absolute w-56 p-4 min-h-20 bg-background top-16 border border-border rounded-md left-1/2 -translate-x-1/2 evenly-col space-y-4 ${animation ? "animate-ghostIn" : "animate-ghostOut"}`}>
                        <p className="text-xs">Filter by Company</p>
                        <DropdownButton
                            buttonStyle="w-40"
                            options={['All', ...companies.map(a => a.name)]}
                            value={
                                selectedCompany 
                                ? companies.find((c) => c.id === selectedCompany)?.name ?? "All"
                                : "All"
                            }
                            onChange={(selectedName: string) => {
                                if (selectedName === "All") {
                                    setSelectedCompany(undefined); // Clear filter to show all data
                                return;
                                }

                                const company = companies.find((c) => c.name === selectedName);
                                if (company) {
                                    setSelectedCompany(company.id);
                                }
                                toggleDrawer()
                            }}
                        />
                    </aside>
                )}
                <button 
                    type="button"
                    onClick={toggleDrawer} 
                    className="hover:bg-whitesmoke/87 h-10 centered hover:text-background normal-space rounded-md cursor-pointer">
                    <FunnelPlus />
                </button>
                <button 
                    type="button"
                    onClick={() => loadModal('create-broker')}
                    className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md cursor-pointer"
                >
                    + Add
                </button>
            </div>
            <ul className="flex-1 flex flex-col space-y-4 overflow-y-auto scrollbar-adjust pr-4 w-full ">
                {filteredData?.map((b:any) => {
                    return (
                        <BrokerCard key={b.id} broker={b}  />
                    )
                })}
                {!filteredData.length && (
                    <div className="flex-1 centered">
                        <p className="">No brokers found</p>
                    </div>
                ) }
            </ul>
        </AppPage>
    );
}