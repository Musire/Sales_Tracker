import { SaleStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { formatRevenue, getInitials } from "@/lib/utils/stringMutate";
import { CompanyRanking } from "./components/CompanyRanking";
import { StageData } from "./components/SalesLifecycle";
import { StatCardType } from "./components/StatCards";


export const DashboardRepository = {
    async getDashboard () {
        const [
            revenueResult,
            architectCount,
            companyCount,
            brokerCount,
            stageCounts,
            companies,
        ] = await Promise.all([
            prisma.sale.aggregate({
                _sum: { amount: true },
                where: { active: true },
            }),
            prisma.user.count({
                where: { role: "ARCHITECT", status: "ACTIVE" },
            }),
            prisma.company.count({
                where: { active: true },
            }),
            prisma.user.count({
                where: { role: "END_USER", status: "ACTIVE" },
            }),
            prisma.sale.groupBy({
                by: ["status"],
                _count: { _all: true },
                where: { active: true },
            }),
            prisma.company.findMany({
                where: { active: true },
                select: {
                    name: true,
                    architect: {
                        select: { name: true, avatarUrl: true },
                    },
                    sales: {
                        where: { active: true },
                        select: { amount: true },
                    },
                },
            }),
        ]);

        const stats: StatCardType = {
            revenue: Number(revenueResult._sum.amount ?? 0),
            architects: architectCount,
            companies: companyCount,
            brokers: brokerCount,
        };

        const totalSales = stageCounts.reduce(
            (sum, stage) => sum + stage._count._all,
            0
        );

        const stageColors: Record<SaleStatus, string> = {
            DRAFT: "#52525b",
            PUBLISHED: "#3b82f6",
            CLOSED: "#10b981",
            DELIVERED: "#f59e0b",
        };

        const stagedData: StageData[] = stageCounts.map((stage) => ({
            stage: stage.status.charAt(0) + stage.status.slice(1).toLowerCase(),
            count: stage._count._all,
            percentage: totalSales
                ? Math.round((stage._count._all / totalSales) * 100)
                : 0,
            color: stageColors[stage.status],
        }));

        const companyRankings: CompanyRanking[] = companies
            .map((company) => {
                const revenue = company.sales.reduce(
                    (sum, sale) => sum + Number(sale.amount),
                    0
                );

                return {
                    name: company.name,
                    revenue,
                    architect: company.architect,
                };
            })
            .sort((a, b) => b.revenue - a.revenue)
            .map((company, index) => ({
                rank: index + 1,
                name: company.name,
                revenue: formatRevenue(company.revenue),
                architect: {
                    name: company.architect?.name ?? "Unassigned",
                    initials: getInitials(company.architect?.name),
                    ...(company.architect?.avatarUrl && {
                        avatarUrl: company.architect.avatarUrl,
                    }),
                },
            }));

        return {
            stats,
            stagedData,
            companyRankings,
        };
    }
}