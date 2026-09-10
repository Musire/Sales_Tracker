'use client'

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { User } from "@/generated/prisma/client";

type Props = {
  broker: User
}

export default function BrokerCard ({ broker }: Props) {
    const { loadModal } = useBottomDrawer()
    
    return (
        <article 
            onClick={() => loadModal('broker-details', broker)} 
            className="bg-surface-1 border-border border p-4 h-24 w-full cursor-pointer flex items-center space-x-4 "
        >
            <div className="bg-surface-2 rounded-full size-16 " />
            <p className="flex flex-col space-y-1">
                <span className="text-base text-main">{broker.name}</span>
                <span className="text-else text-sm">{broker.email}</span>
            </p>
        </article>
    );
}