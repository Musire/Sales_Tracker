import { prisma } from "@/lib/prisma"
import { CompanyCreationType, CompanyDeleteType, CompanyUpdateType } from "./company.validations"


export const CompanyRepository = {
    async getCompanies() {
        const companies = await prisma.company.findMany({
            where: {
                active: true,
            },
            include: {
                architect: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        sales: true,
                    },
                },
            },
        })
        return companies
    },
    async getCompanyDetails (id: string) {
        const company = await prisma.company.findFirst({
            where: { id},
            include: {
                architect: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        sales: true,
                    },
                },
            },
        })
        return company
    },
    async getCompanyBrokers() {
        const companies = await prisma.company.findMany({
            where: {
                active: true,
                users: {
                    some: {},
                },
            },
            select: {
                id: true,
                name: true,
                users: {
                    select: {
                    id: true,
                    name: true,
                    },
                },
            },
        });

        return companies;
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