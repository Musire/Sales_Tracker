import AppPage from "@/components/page/AppPage";
import RoleRenderer from "@/components/RoleRenderer";
import { getBrokers } from "@/domains/brokers/broker.queries";
import AdminBrokers from "@/domains/brokers/components/AdminBrokers";

export default async function BrockersPage () {
    const { data } = await getBrokers()

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
                ADMIN: <AdminBrokers brokers={data.brokers} companies={data.companies} />
            }}
        />
    );
}