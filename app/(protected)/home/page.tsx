import RoleRenderer from "@/components/RoleRenderer";
import AdminHome from "@/features/home/components/AdminHome";

export default function HomePage () {
    return (
        <RoleRenderer 
            roles={{
                ADMIN: <AdminHome />   
            }}
        />
    );
}