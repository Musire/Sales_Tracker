import { prisma } from "@/lib/prisma"


export const ArchitectRepository = {
    async getArchitects() {
        const architects = await prisma.user.findMany({
            where: {
                role: 'ARCHITECT'
            }
        })
        return architects
    },
}