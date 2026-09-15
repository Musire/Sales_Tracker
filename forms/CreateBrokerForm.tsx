'use client';
import { ActionForm, Input } from "@/components/forms";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { createBroker } from "@/domains/brokers/broker.actions";
import { BrokerCreationSchema } from "@/domains/brokers/broker.validations";
import { getCompanies } from "@/domains/companies/company.queries";
import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";


export default function CreateBrokerForm () {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()

    const { 
        data: companies,
        error,
        execute: fetchCompanies
    } = useFetch(getCompanies)

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    console.log(companies)
    

    const defaultData = {
        name: '',
        email: '',
        companyId: ''
    }

    const onSuccess = () => {
        createSuccess('Broker created successfully')
        clearModal()
    }


    return (
        <div className=" flex-1 centered-col space-y-4">
            <h2 className="text-xl">Create Broker</h2>
            <ActionForm
                schema={BrokerCreationSchema}
                initialValues={defaultData}
                actionFn={createBroker}
                onSuccess={onSuccess}
            >
                <Input 
                    label="broker name"
                    name="name"
                />
                <Input 
                    label="email address"
                    name="email"
                />
                <FormDropdown 
                    label="Company"
                    name="companyId"
                    options={companies ?? []}
                    getOptionLabel={i => i.name}
                    getOptionValue={i => i.id}
                />
            </ActionForm>
        </div>
    );
}