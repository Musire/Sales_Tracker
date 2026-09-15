import { prisma } from "@/lib/prisma";
import { CompleteSaleCreationType, SaleDeleteType, SaleUpdateType, UpdateSaleStatusType } from "./sale.validations";


export const SaleRepository = {
    async getSales () {
        const sales = await prisma.sale.findMany({
            where: {
                active: true
            },
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
            }
        })
        return sales.map((sale) => ({
            ...sale,
            amount: sale.amount.toNumber(),
        }));
    },
    async getSaleDetails (id: string) {
        const sale = await prisma.sale.findFirst({
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
            }
        })
        if (!sale) return null

        return {
            ...sale,
            amount: sale.amount.toNumber(),
        }
    },
    async createSale (data: CompleteSaleCreationType) {
        const sale = await prisma.sale.create({
            data
        })
        return {
            ...sale,
            amount: sale.amount.toNumber()
        }
    },
    async updateSale (data: SaleUpdateType) {
        const {id, ...rest} = data
        const sale = await prisma.sale.update({
            where: { id },
            data: rest
        })
        return sale
    },
    async deleteSale (data: SaleDeleteType) {
        const sale = await prisma.sale.update({
            where: {
                id: data.id
            },
            data: {
                active: false
            }
        })
        return {
            ...sale,
            amount: sale.amount.toNumber()
        }
    },
    async updateSaleStatus (data: UpdateSaleStatusType) {
        const sale = await prisma.sale.update({
            where: { id: data.id },
            data: {
                status: data.newStatus
            }
        })

        return {
            ...sale,
            amount: sale.amount.toNumber()
        }
    }
}