'use client';

import AppPage from "@/components/page/AppPage";
import { useSidePanel } from "@/context/SidepanelProvider";
import { User } from "@/generated/prisma/client";
import ArchitectCard from "./ArchitectCard";

type Props = {
  architects: User[]
}

export default function AdminArchitect ({ architects }: Props) {
    const { loadModal } = useSidePanel()
    
    return (
        <AppPage className="flex flex-col space-y-4">
            <button 
                type="button"
                onClick={() => loadModal('create-architect')}
                className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
            >
                + Add
            </button>
            <ul className="flex-1 flex flex-col space-y-4 overflow-y-auto scrollbar-adjust pr-4 w-full ">
                {architects?.map((c) => (<ArchitectCard key={c.id} architect={c} />))}
            </ul>
        </AppPage>
    );
}