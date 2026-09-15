'use client';

import { ActionForm, Input } from "@/components/forms";
import CompanyBrokerInput from "@/components/forms/inputs/CompanyBrokerInput";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { getCompanyBrokers } from "@/domains/companies/company.queries";
import { createSale } from "@/domains/sales/sale.actions";
import { CompleteCreationSchema } from "@/domains/sales/sale.validations";
import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";

export default function CreateSaleForm () {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()
    const { isPending, data: companyBrokers , error, execute: fetchCompanyBrokers } = useFetch(getCompanyBrokers)

    useEffect(() => {
        fetchCompanyBrokers()
    }, [fetchCompanyBrokers])

    const defaultData = {
        customerName: '',
        amount: 0,
        notes: '',
        companyId: '',
        createdById: '',
    }

    const onSuccess = () => {
        createSuccess('Sale created successfully')
        clearModal()
    }

    return (
        <div className=" flex-1 centered-col space-y-4">
            <h2 className="text-xl">Create Sale</h2>
            <ActionForm
                schema={CompleteCreationSchema}
                initialValues={defaultData}
                actionFn={createSale}
                onSuccess={onSuccess}
            >
                <Input 
                    label="customer name"
                    name="customerName"
                />
                <Input 
                    label="amount"
                    name="amount"
                    type="number"
                />
                <Input 
                    label="notes"
                    name="notes"
                />
                <CompanyBrokerInput 
                    companies={companyBrokers ?? []}
                />
            </ActionForm>
        </div>
    );
}