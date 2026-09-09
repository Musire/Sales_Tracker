import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "../generated/prisma/client";

// --------------------------------------------------
// Environment
// --------------------------------------------------

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}

if (!supabaseSecretKey) {
  throw new Error("SUPABASE_SECRET_KEY is not defined");
}

// --------------------------------------------------
// Prisma
// --------------------------------------------------

console.log(
  "Prisma host:",
  new URL(connectionString).hostname
);

console.log(
  "Prisma port:",
  new URL(connectionString).port
);

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// --------------------------------------------------
// Supabase Admin
// --------------------------------------------------

const supabaseAdminClient = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

// --------------------------------------------------
// Configuration
// --------------------------------------------------

const ARCHITECT_COUNT = 3;
const COMPANIES_PER_ARCHITECT = 3;
const AGENTS_PER_COMPANY = 5;

const PASSWORD = "ChangeThisPassword123!";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

async function createAuthUser(
  email: string,
  name: string
) {
  const { data, error } =
    await supabaseAdminClient.auth.admin.createUser({
      email,
      password: PASSWORD,
      email_confirm: true,
      user_metadata: {
        name,
      },
    });

  if (error) {
    throw new Error(
      `Supabase Auth error for ${email}: ${error.message}`
    );
  }

  if (!data.user) {
    throw new Error(
      `Supabase did not return a user for ${email}.`
    );
  }

  return data.user;
}

// --------------------------------------------------
// Main
// --------------------------------------------------

async function main() {
  console.log("");
  console.log("=================================");
  console.log("Creating test sales data");
  console.log("=================================");
  console.log("");

  const createdAuthUserIds: string[] = [];

  try {
    // ==================================================
    // 1. CREATE ARCHITECTS
    // ==================================================

    const architects = [];

    for (
      let architectNumber = 1;
      architectNumber <= ARCHITECT_COUNT;
      architectNumber++
    ) {
      const name = `architect_${architectNumber}`;
      const email = `${name}@example.com`;

      console.log(`Creating ${name}...`);

      // ----------------------------------------------
      // Check application user
      // ----------------------------------------------

      let architect = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (architect) {
        console.log(
          `  → ${name} already exists`
        );

        architects.push(architect);

        continue;
      }

      // ----------------------------------------------
      // Create Supabase Auth user
      // ----------------------------------------------

      const authUser = await createAuthUser(
        email,
        name
      );

      createdAuthUserIds.push(authUser.id);

      console.log(
        `  ✓ Auth user created: ${authUser.id}`
      );

      // ----------------------------------------------
      // Create application User
      // ----------------------------------------------

      architect = await prisma.user.create({
        data: {
          authUserId: authUser.id,
          email,
          name,
          role: "ARCHITECT",
          status: "ACTIVE",
          avatarUrl: "",
        },
      });

      architects.push(architect);

      console.log(
        `  ✓ Created ${name}`
      );
    }

    console.log("");

    // ==================================================
    // 2. CREATE COMPANIES
    // ==================================================

    let companyNumber = 1;
    let totalAgents = 0;
    let totalCompanies = 0;

    for (const architect of architects) {
      console.log(
        `${architect.name}:`
      );

      for (
        let companyIndex = 1;
        companyIndex <= COMPANIES_PER_ARCHITECT;
        companyIndex++
      ) {
        const companyName = `company_${companyNumber}`;

        console.log(
          `  Creating ${companyName}...`
        );

        // --------------------------------------------
        // Find existing company assigned to architect
        // --------------------------------------------

        let company = await prisma.company.findFirst({
          where: {
            name: companyName,
            architectId: architect.id,
          },
        });

        if (company) {
          console.log(
            `    → ${companyName} already exists`
          );
        } else {
          company = await prisma.company.create({
            data: {
              name: companyName,
              architectId: architect.id,
              active: true,
            },
          });

          console.log(
            `    ✓ Created ${companyName}`
          );
        }

        totalCompanies++;

        // ============================================
        // 3. CREATE 5 AGENTS / END USERS
        // ============================================

        for (
          let agentNumber = 1;
          agentNumber <= AGENTS_PER_COMPANY;
          agentNumber++
        ) {
          const agentName = `agent_${agentNumber}`;

          // Email must be globally unique.
          const agentEmail =
            `${companyName}_${agentName}@example.com`;

          // ------------------------------------------
          // Check existing application user
          // ------------------------------------------

          let agent = await prisma.user.findUnique({
            where: {
              email: agentEmail,
            },
          });

          if (agent) {
            console.log(
              `    → ${agentName} already exists`
            );

            continue;
          }

          // ------------------------------------------
          // Create Supabase Auth user
          // ------------------------------------------

          const authUser = await createAuthUser(
            agentEmail,
            agentName
          );

          createdAuthUserIds.push(authUser.id);

          // ------------------------------------------
          // Create application User
          // ------------------------------------------

          agent = await prisma.user.create({
            data: {
              authUserId: authUser.id,
              email: agentEmail,
              name: agentName,
              role: "END_USER",
              status: "ACTIVE",
              companyId: company.id,
              avatarUrl: "",
            },
          });

          totalAgents++;

          console.log(
            `    ✓ Created ${agentName}`
          );
        }

        companyNumber++;
      }

      console.log("");
    }

    // ==================================================
    // SUMMARY
    // ==================================================

    console.log("");
    console.log("=================================");
    console.log("Test data created successfully");
    console.log("=================================");
    console.log("");

    console.log(
      `Architects: ${architects.length}`
    );

    console.log(
      `Companies:  ${totalCompanies}`
    );

    console.log(
      `Agents:     ${totalAgents}`
    );

    console.log(
      `Total Users: ${architects.length + totalAgents}`
    );

    console.log("");

    console.log("Assignments:");
    console.log(
      "  architect_1 → company_1, company_2, company_3"
    );
    console.log(
      "  architect_2 → company_4, company_5, company_6"
    );
    console.log(
      "  architect_3 → company_7, company_8, company_9"
    );

    console.log("");

    console.log(
      "Each company → agent_1, agent_2, agent_3, agent_4, agent_5"
    );

    console.log("");

    console.log(
      `Password for all test users: ${PASSWORD}`
    );

    console.log("");
  } catch (error) {
    // ==================================================
    // ROLLBACK SUPABASE AUTH USERS
    // ==================================================

    console.error("");
    console.error(
      "Something failed while creating test data."
    );

    console.error(
      "Rolling back Supabase Auth users created by this run..."
    );

    for (const authUserId of createdAuthUserIds) {
      try {
        await supabaseAdminClient.auth.admin.deleteUser(
          authUserId
        );

        console.log(
          `  ✓ Removed Auth user ${authUserId}`
        );
      } catch (rollbackError) {
        console.error(
          `  ✗ Failed to remove Auth user ${authUserId}`,
          rollbackError
        );
      }
    }

    throw error;
  }
}

// --------------------------------------------------
// Run
// --------------------------------------------------

main()
  .catch((error) => {
    console.error("");
    console.error(
      "================================="
    );
    console.error(
      "Failed to create test data."
    );
    console.error(
      "================================="
    );
    console.error("");

    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });