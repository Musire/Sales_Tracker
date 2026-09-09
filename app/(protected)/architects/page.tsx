import AppPage from "@/components/page/AppPage";
import RoleRenderer from "@/components/RoleRenderer";
import { getArchitects } from "@/domains/architects/architect.queries";
import AdminArchitect from "@/domains/architects/components/AdminArchitects";

export default async function ArchitectsPage () {
    const { data } = await getArchitects()

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
                ADMIN: <AdminArchitect architects={data} />
            }}
        />
    );
}