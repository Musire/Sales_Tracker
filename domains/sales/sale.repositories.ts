import { prisma } from "@/lib/prisma";
import { SaleCreationType, SaleDeleteType, SaleUpdateType } from "./Sale.validations";


export const SaleRepository = {
    async getSales () {
        const sales = await prisma.sale.findMany()
        return sales.map((sale) => ({
            ...sale,
            amount: sale.amount.toNumber(),
        }));
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