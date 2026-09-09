import AppPage from "@/components/page/AppPage";
import { User } from "@/generated/prisma/client";

type Props = {
  architects: User[]
}

export default function AdminArchitect ({ architects }: Props) {
    return (
        <AppPage>
            <pre className="flex-1 overflow-y-auto scrollbar-none text-xs">{JSON.stringify(architects, null, 2)}</pre>
        </AppPage>
    );
}