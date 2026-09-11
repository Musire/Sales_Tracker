import { SaleRepository } from "./sale.repositories";
import { SaleCreationType, SaleDeleteType, SaleUpdateType } from "./sale.validations";


export async function getSaleService () {
    return SaleRepository.getSales()
}

export async function createSaleService (data: SaleCreationType) {
    return SaleRepository.createSale(data)
}

export async function updateSaleService (data: SaleUpdateType) {
    return SaleRepository.updateSale(data)
}

export async function deleteSaleService (data: SaleDeleteType) {
    return SaleRepository.deleteSale(data)
}