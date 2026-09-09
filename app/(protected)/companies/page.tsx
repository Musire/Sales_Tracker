import AppPage from "@/components/page/AppPage";
import RoleRenderer from "@/components/RoleRenderer";
import { getCompanies } from "@/domains/companies/company.queries";
import AdminCompanies from "@/domains/companies/components/AdminCompanies";

export default async function CompanyPage () {
    const { data } = await getCompanies()

    if (!data) {
        return (
            <AppPage>
                <p className="">not found yo</p>
            </AppPage>
        )
    }
    
    return (
        <RoleRenderer 
            roles={{
                ADMIN: <AdminCompanies companies={data} />
            }}
        />
    );
}