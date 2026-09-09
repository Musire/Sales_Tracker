'use client';
import { ActionForm, Input } from "@/components/forms";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { getArchitects } from "@/domains/architects/architect.queries";
import { createCompany } from "@/domains/companies/company.actions";
import { CompanyCreationSchema } from "@/domains/companies/company.validations";
import { User } from "@/generated/prisma/client";
import { useEffect, useState } from "react";


export default function CreateCompanyForm () {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()
    const [architects, setArchitects] = useState<User[]>([]);
    const defaultData = {
        name: '',
        architectId: ''
    }

    const onSuccess = () => {
        createSuccess('Company crated successfully')
        clearModal()
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getArchitects()
            if (!res.success && res.error) {
                return
            }

            if (res.data) {
                setArchitects(res.data)
            }
            
        }
        fetchData()
    }, [getArchitects])


    return (
        <div className=" flex-1 centered-col space-y-4">
            <h2 className="text-xl">Create Company</h2>
            <ActionForm
                schema={CompanyCreationSchema}
                initialValues={defaultData}
                actionFn={createCompany}
                onSuccess={onSuccess}
            >
                <Input 
                    label="company name"
                    name="name"
                />
                <FormDropdown
                    label="Assign Architect"
                    name="architectId"
                    options={architects}
                    getOptionLabel={(i) => i.name}
                    getOptionValue={ (i) => i.id}

                />
            </ActionForm>
        </div>
    );
}