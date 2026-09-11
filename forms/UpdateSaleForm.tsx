'use client';
import { ActionForm, Input } from "@/components/forms";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { updateSale } from "@/domains/sales/sale.actions";
import { SaleUpdateSchema } from "@/domains/sales/sale.validations";
import { User } from "@/generated/prisma/client";

type Props = {
  data?: User
}

export default function UpdateSaleForm ({ data }: Props) {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()

    const defaultData = {
        name: data?.name ?? '',
        email: data?.email ?? '',
        id: data?.id ?? ''
    }

    const onSuccess = () => {
        createSuccess('Architect updated successfully')
        clearModal()
    }


    return (
        <div className=" flex-1 centered-col space-y-4">
            <h2 className="text-xl">Update Sale</h2>
            <ActionForm
                schema={SaleUpdateSchema}
                initialValues={defaultData}
                actionFn={updateSale}
                onSuccess={onSuccess}
            >
                <Input 
                    label="architect name"
                    name="name"
                />
                <Input 
                    label="email address"
                    name="email"
                />
                <Input 
                    name="id"
                    type="hidden"
                />
            </ActionForm>
        </div>
    );
}