import AppPage from "@/components/page/AppPage";
import RoleRenderer from "@/components/RoleRenderer";
import AdminSales from "@/domains/sales/components/AdminSales";
import { getSales } from "@/domains/sales/sale.queries";

export default async function SalesPage () {
    const { data } = await getSales()

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
                ADMIN: <AdminSales sales={data} />
            }}
        />
    );
}