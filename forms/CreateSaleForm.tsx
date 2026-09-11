'use client';
import { ActionForm, Input } from "@/components/forms";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { createSale } from "@/domains/sales/sale.actions";
import { SaleCreationSchema } from "@/domains/sales/sale.validations";


export default function CreateSaleForm () {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()

    const defaultData = {
        name: '',
        email: ''
    }

    const onSuccess = () => {
        createSuccess('Architect created successfully')
        clearModal()
    }


    return (
        <div className=" flex-1 centered-col space-y-4">
            <h2 className="text-xl">Create Sale</h2>
            <ActionForm
                schema={SaleCreationSchema}
                initialValues={defaultData}
                actionFn={createSale}
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
            </ActionForm>
        </div>
    );
}