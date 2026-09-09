# SETUP

1. To get started, run the `npm install` command in your terminal.

2. Then you setup a supabase account with your email

3. Navigate through `connect -> nextjs -> .env.local`
   you copy-paste the two values `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` into the .env.local on the root of the project

4. Then navigate through `dashboard -> get connected(direct conneciton string)`. You are looking for the `direct connection` & `transaction pooler` strings. You will take the template of each and update the your password.

5. You save `direction connection = DIRECT_URL` & `transaction pooler = DATABASE_URL` into the root .env file. Then you copy paste the "DATABASE_URL" into the .env.local file.

6. Last thing we need is the `dashboard -> api keys / settings/api keys -> secret keys` which we will save as `SUPBASE_SECRET_KEY` into the .env.local file.

<br>

# PRISMA

1. You delete `prisma/migrations` and `generated` folders.

2. You run `npx prisma migrate dev --name init`.

3. You run `npx prisma generate`.

<br>

# TEST USER

1. You run `npx tsx scripts/create-manager`.

2. You run `npx tsx scripts/update-manager`.

3. You run `npx tsx scripts/update-supabase`.
