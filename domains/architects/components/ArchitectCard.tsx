'use client'

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { User } from "@/generated/prisma/client";

type Props = {
  architect: User
}

export default function ArchitectCard ({ architect }: Props) {
    const { loadModal } = useBottomDrawer()
    
    return (
        <article 
            onClick={() => loadModal('architect-details', { data: architect })} 
            className="bg-surface-1 border-border border p-4 h-24 w-full cursor-pointer flex items-center space-x-4 "
        >
            <div className="bg-surface-2 rounded-full size-16 " />
            <p className="flex flex-col space-y-1">
                <span className="text-base text-main">{architect.name}</span>
                <span className="text-else text-sm">{architect.email}</span>
            </p>
        </article>
    );
}