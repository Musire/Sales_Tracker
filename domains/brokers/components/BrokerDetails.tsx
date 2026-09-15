'use client';

import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { getArchitectDetails } from "@/domains/architects/architect.queries";
import { getCompanyDetails } from "@/domains/companies/company.queries";
import { Company, User } from "@/generated/prisma/client";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";
import { deleteBroker } from "../broker.actions";

export type CompanyWithMeta = Company & {
  architect: User | null;
  _count: {
    users: number;
    sales: number
  }
}

export type Broker = User & {
  company: CompanyWithMeta | null
}

export type Brokers = Broker[]

type Props = {
  data?: Broker
}

export default function BrokerDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition()
    const { isMounted, closeDrawer, openDrawer } = useDrawer()
    const { clearModal: clearDrawer, loadModal: loadBottomDrawer } = useBottomDrawer()
    
    const { loadModal } = useSidePanel()
    const { createSuccess, createError } = useToast()

    const handleEdit = () => { 
        console.log('edit from broker details')
        clearDrawer()
        loadModal('update-broker', data)
    }

    const handleDelete = () => { 
        console.log('delete from broker details')
        
        startTransition(async() => {
            if (data?.id) {
                const res = await deleteBroker({id: data?.id ?? ''})
                if (!res.success && res.error) {
                    createError(res.error)
                    return
                }

                createSuccess('Successfully deleted broker')
            }
            
        })
        clearDrawer()
    }

    return (
        <>
            <DrawerTemplate
                className="stacked spaced-y-4"
                onEdit={handleEdit}
                onDelete={openDrawer}
            >
                <div className="flex-col flex space-y-4">
                    <p className="">Architect</p>
                    <article 
                        className="flex items-center space-x-4 ml-4 cursor-pointer hover:bg-surface-1 p-4"
                        onClick={
                            () => loadBottomDrawer(
                                'architect-details', 
                                { fetchFn: () => getArchitectDetails(data?.company?.architect?.id ?? '')  } 
                        )}
                    >
                        <div className="size-16 bg-surface-2 rounded-full" />
                        <p className="flex flex-col space-y-2">
                            <span className="text-main">{data?.company?.architect?.name}</span>
                            <span className="text-sm text-else">{data?.company?.architect?.email}</span>
                        </p>
                    </article>
                </div>
                <div className="flex-col flex space-y-4">
                    <p className="">Company</p>
                    <article 
                        onClick={
                            () => loadBottomDrawer(
                                'company-details', 
                                { fetchFn: () => getCompanyDetails(data?.company?.id ?? '') })} 
                        className="bg-surface-1 h-24 shrink-0 border border-border p-4 cursor-pointer flex flex-col justify-between hover:bg-surface-2 transition-colors rounded-lg"
                        >
                        <p className="text-main font-semibold text-lg truncate">{data?.company?.name}</p>
                        <p className="text-else text-sm">
                            {`${data?.company?._count.users} brokers · ${data?.company?._count.sales} sales`}
                        </p>
                    </article>
                </div>
            </DrawerTemplate>
            <DeleteModal 
                modalOpen={isMounted}
                onClose={closeDrawer}
                onDelete={handleDelete}
            />
        </>
    );
}