import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { CompanyWithMeta } from "./CompanyCard";

type Props = {
  data?: CompanyWithMeta
}

export default function CompanyDetails ({ data }: Props) {
    const { isMounted, closeDrawer, openDrawer } = useDrawer()
    const { clearModal: clearDrawer, loadModal: loadBottomDrawer } = useBottomDrawer()
    const { loadModal } = useSidePanel()

    const handleEdit = () => { 
        console.log('edit from company details')
        clearDrawer()
        loadModal('update-company', data)
    }

    const handleDelete = () => { 
        console.log('delete from company details')
        clearDrawer()
    }

    return (
        <>
            <DrawerTemplate
                className="stacked"
                onEdit={handleEdit}
                onDelete={openDrawer}
            >
                <div className="flex-col flex space-y-4">
                    <p className="">Architect</p>
                    <article 
                        className="flex items-center space-x-4 ml-4 cursor-pointer hover:bg-surface-1 p-4"
                        onClick={() => loadBottomDrawer('architect-details', data?.architect)}
                    >
                        <div className="size-16 bg-surface-2 rounded-full" />
                        <p className="flex flex-col space-y-2">
                            <span className="text-main">{data?.architect?.name}</span>
                            <span className="text-sm text-else">{data?.architect?.email}</span>
                        </p>
                    </article>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="">Brokers</p>
                    <ul className="flex-col flex">
                        {data?.users?.map(d => {
                            return (
                                <article
                                    key={d.id} 
                                    onClick={() => loadBottomDrawer('broker-details', d)}
                                    className="cursor-pointer flex items-center space-x-4 ml-4  hover:bg-surface-1 p-4"
                                >
                                    <div className="size-16 bg-surface-2 rounded-full" />
                                    <p className="flex flex-col space-y-2">
                                        <span className="text-main">{d.name}</span>
                                        <span className="text-sm text-else">{d.email}</span>
                                    </p>
                                </article>
                            )
                        })}
                    </ul>
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