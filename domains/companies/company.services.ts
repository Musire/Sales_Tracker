import { CompanyRepository } from "./company.repositories";
import { CompanyCreationType, CompanyDeleteType, CompanyUpdateType } from "./company.validations";


export async function getCompanyService () {
    return CompanyRepository.getCompanies()
}

export async function getCompanyDetailsService (id: string) {
    return CompanyRepository.getCompanyDetails(id)
}

export async function getCompanyBrokersService () {
    return CompanyRepository.getCompanyBrokers()
}

export async function createCompanyService (data: CompanyCreationType) {
    return CompanyRepository.createCompany(data)
}

export async function updateCompanyService (data: CompanyUpdateType) {
    return CompanyRepository.updateCompany(data)
}

export async function deleteCompanyService (data: CompanyDeleteType) {
    return CompanyRepository.deleteCompany(data)
}