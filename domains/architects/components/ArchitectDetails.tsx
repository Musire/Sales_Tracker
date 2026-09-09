import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { User } from "@/generated/prisma/client";
import { useDrawer } from "@/hooks";

type Props = {
  data?: User
}

export default function ArchitectDetails ({ data }: Props) {
    const { isMounted, closeDrawer, openDrawer } = useDrawer()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { loadModal } = useSidePanel()

    const handleEdit = () => { 
        console.log('edit from architect details')
        clearDrawer()
        loadModal('update-architect', data)
    }

    const handleDelete = () => { 
        console.log('delete from architect details')
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