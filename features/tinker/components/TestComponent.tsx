'use client'

import AppPage from "@/components/page/AppPage";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";


export default function TestComponent() {
    const { loadModal } = useBottomDrawer()
    return (
        <AppPage className="bg-surface-1 centered-col space-y-4">
            <span className="">I am tinker page</span>
            <button 
                type="button" 
                onClick={()=> loadModal('test-component')} 
                className="normal-space bg-whitesmoke/87 text-background grow-0 cursor-pointer">
                open
            </button>
        </AppPage>
    );
}