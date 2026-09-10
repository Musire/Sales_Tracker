'use client';

import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { User } from "@/generated/prisma/client";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";
import { deleteBroker } from "../broker.actions";

type Props = {
  data?: User
}

export default function ArchitectDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition()
    const { isMounted, closeDrawer, openDrawer } = useDrawer()
    const { clearModal: clearDrawer } = useBottomDrawer()
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
                const res = await deleteBroker({id: data?.id})
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
                onEdit={handleEdit}
                onDelete={openDrawer}
                >
                <p className="">{data?.name}</p>
                <p className="">its me</p>

            </DrawerTemplate>
            <DeleteModal 
                modalOpen={isMounted}
                onClose={closeDrawer}
                onDelete={handleDelete}
            />
        </>
    );
}