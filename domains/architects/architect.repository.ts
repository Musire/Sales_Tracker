import { UserRole, UserStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { ArchitectCreationType, ArchitectDeleteType, ArchitectUpdateType } from "./architect.validations"


export const ArchitectRepository = {
    async getArchitects() {
        const architects = await prisma.user.findMany({
            where: {
                role: 'ARCHITECT',
                status: {
                    not: 'DISABLED'
                }
            }
        })
        return architects
    },
    async createArchitect(data: ArchitectCreationType) {
        const architect = await prisma.user.create({
            data: {
                ...data,
                role: UserRole.ARCHITECT
            }
        })
        return architect
    },
    async updateArchitect(data: ArchitectUpdateType) {
        const architect = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                email: data.email
            }
        })
        return architect
    },
    async deleteArchitect(data: ArchitectDeleteType) {
        const architect = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                status: UserStatus.DISABLED
            }
        })
        return architect
    }
}