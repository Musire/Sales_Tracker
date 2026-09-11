'use client';

import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { Sale } from "@/generated/prisma/client";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";
import { deleteSale } from "../sale.actions";

type Props = {
  data?: Sale
}

export default function SaleDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition()
    const { isMounted, closeDrawer, openDrawer } = useDrawer()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { loadModal } = useSidePanel()
    const { createSuccess, createError } = useToast()

    const handleEdit = () => { 
        console.log('edit from sale details')
        clearDrawer()
        loadModal('update-sale', data)
    }

    const handleDelete = () => { 
        console.log('delete from sale details')
        
        startTransition(async() => {
            if (data?.id) {
                const res = await deleteSale({id: data?.id})
                if (!res.success && res.error) {
                    createError(res.error)
                    return
                }

                createSuccess('Successfully deleted sale')
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
                <p className="">{Number(data?.amount)}</p>
            </DrawerTemplate>
            <DeleteModal 
                modalOpen={isMounted}
                onClose={closeDrawer}
                onDelete={handleDelete}
            />
        </>
    );
}