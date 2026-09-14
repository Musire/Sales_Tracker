import { prisma } from "@/lib/prisma";
import { SaleCreationType, SaleDeleteType, SaleUpdateType } from "./sale.validations";


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
    async createSale (data: SaleCreationType) {
        const sale = await prisma.sale.create({
            data
        })
        return sale
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
        return sale
    },
}