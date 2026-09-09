'use client'

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { User } from "@/generated/prisma/client";

type Props = {
  architect: User
}

export default function ArchitectCard ({ architect }: Props) {
    const { loadModal } = useBottomDrawer()
    
    return (
        <article onClick={() => loadModal('architect-details', architect)} className="bg-error p-4 cursor-pointer">
            <p className="">{architect.name}</p>
        </article>
    );
}