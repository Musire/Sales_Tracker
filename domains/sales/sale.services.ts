import { SaleRepository } from "./sale.repositories";
import { CompleteSaleCreationType, SaleDeleteType, SaleUpdateType, UpdateSaleStatusType } from "./sale.validations";


export async function getSaleService () {
    return SaleRepository.getSales()
}

export async function createSaleService (data: CompleteSaleCreationType) {
    return SaleRepository.createSale(data)
}

export async function updateSaleService (data: SaleUpdateType) {
    return SaleRepository.updateSale(data)
}

export async function deleteSaleService (data: SaleDeleteType) {
    return SaleRepository.deleteSale(data)
}

export async function updateSaleStatusService (data: UpdateSaleStatusType) {
    return SaleRepository.updateSaleStatus(data)
}