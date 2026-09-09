import { prisma } from "@/lib/prisma"
import { CompanyCreationType, CompanyDeleteType, CompanyUpdateType } from "./company.validations"


export const CompanyRepository = {
    async getCompanies() {
        const companies = await prisma.company.findMany()
        return companies
    },
    async createCompany(data: CompanyCreationType) {
        const company = await prisma.company.create({
            data
        })

        return company
    },
    async updateCompany(data: CompanyUpdateType) {
        const { architectId, ...rest} = data
        const company = await prisma.company.updateMany({ 
            where: { architectId }, 
            data: rest 
        })
        return company
    },
    async deleteCompany(data: CompanyDeleteType) {
        const company = await prisma.company.update({
            where: { id: data.id },
            data: {
                active: false
            }
        })
        return company
    }
}