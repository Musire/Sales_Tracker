'use client';

import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { Company, User } from "@/generated/prisma/client";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";
import { deleteArchitect } from "../architect.actions";
import { getCompanyDetails } from "@/domains/companies/company.queries";

export type ArchitectWithMeta = User & {
  architectCompanies?: Company[];
};

type Props = {
  data?: ArchitectWithMeta;
};

export default function ArchitectDetails({ data }: Props) {
  console.log(data)
  const [pending, startTransition] = useTransition();
  const { isMounted, closeDrawer, openDrawer } = useDrawer();
  const { clearModal: clearDrawer, loadModal: loadBottomDrawer } = useBottomDrawer();
  const { loadModal } = useSidePanel();
  const { createSuccess, createError } = useToast();

  const handleEdit = () => {
    clearDrawer();
    loadModal('update-architect', data);
  };

  const handleDelete = () => {
    startTransition(async () => {
      if (data?.id) {
        const res = await deleteArchitect({ id: data.id });
        if (!res.success && res.error) {
          createError(res.error);
          return;
        }
        createSuccess('Successfully deleted architect');
      }
    });
    clearDrawer();
  };


  return (
    <>
      <DrawerTemplate
        className="stacked"
        onEdit={handleEdit}
        onDelete={openDrawer}
      >
        <div className="flex flex-col space-y-2">
            <p className="">Brokers</p>
            <ul className="flex-col flex">
                {data?.architectCompanies?.map(d => {
                    return (
                        <article
                            key={d.id} 
                            onClick={() => 
                              loadBottomDrawer('company-details', { 
                                fetchFn: () => getCompanyDetails(d.id) 
                              })
                            }
                            className="cursor-pointer flex items-center space-x-4 ml-4  hover:bg-surface-1 p-4"
                        >
                            <div className="size-16 bg-surface-2 rounded-full" />
                            <p className="flex flex-col space-y-2">
                                <span className="text-main">{d.name}</span>
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