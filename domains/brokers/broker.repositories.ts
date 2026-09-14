import { prisma } from "@/lib/prisma"
import { BrokerCreationType, BrokerDeleteType, BrokerUpdateType } from "./broker.validations"


export const BrokerRepository = {
    async getBrokers () {
        const [brokers, companies] = await Promise.all([
            prisma.user.findMany({
                where: {
                    role: 'END_USER',
                    status: {
                    not: 'DISABLED',
                    },
                },
                include: {
                    company: {
                        include: {
                            architect: true, // Includes the full architect User record
                            _count: {
                                select: {
                                    users: true,
                                    sales: true,
                                },
                            },
                        },

                    },
                },
            }),
            prisma.company.findMany({
                where: {
                    active : true
                },
                select: {
                    id: true,
                    name: true
                }
            })
        ])
        return { brokers, companies }
    },
    async getBrokerDetails (id: string) {
        const broker = prisma.user.findFirst({
            where: { id },
            include: {
                company: {
                    include: {
                        architect: true, 
                        _count: {
                            select: {
                                users: true,
                                sales: true,
                            },
                        },
                    },
                },
            },
        })
        return broker
    },
    async createBroker (data: BrokerCreationType) {

    },
    async updateBroker (data: BrokerUpdateType) {

    },
    async deleteBroker (data: BrokerDeleteType) {

    },
}