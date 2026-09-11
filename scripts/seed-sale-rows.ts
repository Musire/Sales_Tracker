import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient, SaleStatus } from "../generated/prisma/client";

// --------------------------------------------------
// Environment & Prisma Initialization
// --------------------------------------------------

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// --------------------------------------------------
// Configuration
// --------------------------------------------------

const SALES_PER_COMPANY = 15; // Number of sales generated per company

const MOCK_CUSTOMERS = [
  "Acme Corp",
  "Apex Innovations",
  "Starlight Retail",
  "Oceanic Logistics",
  "Nexus Tech Solutions",
  "Horizon Financial",
  "Vanguard Media",
  "Summit Health",
];

const MOCK_NOTES = [
  "Standard annual subscription package.",
  "Custom enterprise tier agreement with add-ons.",
  "Follow-up deal closed via agent outreach.",
  "Discounted bundle rate applied for Q3.",
  "Urgent order requested by client management.",
];

const STATUSES: SaleStatus[] = [
  SaleStatus.DRAFT,
  SaleStatus.PUBLISHED,
  SaleStatus.CLOSED,
  SaleStatus.DELIVERED,
];

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDecimal(min: number, max: number): Prisma.Decimal {
  const value = Math.random() * (max - min) + min;
  return new Prisma.Decimal(value.toFixed(2));
}

function buildLifecycleDates(status: SaleStatus) {
  // Generate a random creation date within the last 90 days
  const now = new Date();
  const pastDays = getRandomNumber(1, 90);
  const createdAt = new Date(now.getTime() - pastDays * 24 * 60 * 60 * 1000);

  let publishedAt: Date | null = null;
  let closedAt: Date | null = null;
  let deliveredAt: Date | null = null;

  if (status !== SaleStatus.DRAFT) {
    // Published 1–2 days after creation
    publishedAt = new Date(
      createdAt.getTime() + getRandomNumber(1, 2) * 24 * 60 * 60 * 1000
    );
  }

  if (status === SaleStatus.CLOSED || status === SaleStatus.DELIVERED) {
    // Closed 3–5 days after published
    closedAt = new Date(
      (publishedAt ?? createdAt).getTime() +
        getRandomNumber(3, 5) * 24 * 60 * 60 * 1000
    );
  }

  if (status === SaleStatus.DELIVERED) {
    // Delivered 2–4 days after closed
    deliveredAt = new Date(
      (closedAt ?? createdAt).getTime() +
        getRandomNumber(2, 4) * 24 * 60 * 60 * 1000
    );
  }

  return { createdAt, publishedAt, closedAt, deliveredAt };
}

// --------------------------------------------------
// Main
// --------------------------------------------------

async function main() {
  console.log("");
  console.log("=================================");
  console.log("Creating mock sales data");
  console.log("=================================");
  console.log("");

  // Fetch all companies along with their end-user agents
  const companies = await prisma.company.findMany({
    where: { active: true },
    include: {
      users: {
        where: {
          role: "END_USER",
          status: "ACTIVE",
        },
      },
    },
  });

  if (companies.length === 0) {
    throw new Error(
      "No active companies found. Please run your user seed script first."
    );
  }

  let totalSalesCreated = 0;

  for (const company of companies) {
    console.log(`Generating sales for ${company.name}...`);

    if (company.users.length === 0) {
      console.log(
        `  ⚠ Skipping ${company.name}: No active END_USER agents found.`
      );
      continue;
    }

    const salesData: Prisma.SaleCreateManyInput[] = [];

    for (let i = 0; i < SALES_PER_COMPANY; i++) {
      const agent = getRandomElement(company.users);
      const status = getRandomElement(STATUSES);
      const customerName = getRandomElement(MOCK_CUSTOMERS);
      const amount = getRandomDecimal(500, 25000);
      const notes = getRandomElement(MOCK_NOTES);

      const { createdAt, publishedAt, closedAt, deliveredAt } =
        buildLifecycleDates(status);

      salesData.push({
        companyId: company.id,
        createdById: agent.id,
        status,
        customerName,
        amount,
        notes,
        createdAt,
        publishedAt,
        closedAt,
        deliveredAt,
        active: true,
      });
    }

    const result = await prisma.sale.createMany({
      data: salesData,
    });

    totalSalesCreated += result.count;
    console.log(`  ✓ Created ${result.count} sales`);
  }

  console.log("");
  console.log("=================================");
  console.log(`Successfully created ${totalSalesCreated} total sales records.`);
  console.log("=================================");
  console.log("");
}

// --------------------------------------------------
// Run
// --------------------------------------------------

main()
  .catch((error) => {
    console.error("");
    console.error("=================================");
    console.error("Failed to create mock sales data.");
    console.error("=================================");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });