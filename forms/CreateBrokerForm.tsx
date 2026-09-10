'use client';
import { ActionForm, Input } from "@/components/forms";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { createArchitect } from "@/domains/architects/architect.actions";
import { ArchitectCreationSchema } from "@/domains/architects/architect.validations";


export default function CreateBrokerForm () {
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
            <h2 className="text-xl">Create Broker</h2>
            <ActionForm
                schema={ArchitectCreationSchema}
                initialValues={defaultData}
                actionFn={createArchitect}
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