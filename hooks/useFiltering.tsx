'use client';

import { useMemo, useState } from "react";


export default function useFiltering (initialData: unknown[]) {
    const [selectedCompany, setSelectedCompany ] = useState<string | undefined>(undefined);

    const filteredData = useMemo(() => {
        if (!selectedCompany) return initialData;
        return initialData.filter((d:any) => d.companyId === selectedCompany);
    }, [selectedCompany, initialData]);

    return {
        selectedCompany,
        setSelectedCompany,
        filteredData
    }
}