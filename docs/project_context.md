## Sales Tracker — Project Context

I’m building a **mobile-first sales tracking SaaS** called `sales_tracker` using **Next.js, TypeScript, Tailwind, Prisma, PostgreSQL/Supabase**, and server actions.

### Domain

```text
ARCHITECT
    │
    └── Company
          │
          └── END_USER
                │
                └── Sale
```

### Roles

- **ADMIN** — manages architects, companies, and users.
- **ARCHITECT** — assigned to companies and manages the lifecycle of those companies' sales.
- **END_USER** — belongs to a company and creates/manages sales.

### Sales lifecycle

```text
DRAFT → PUBLISHED → CLOSED → DELIVERED
```

- END_USER creates and edits `DRAFT` sales.
- END_USER publishes a sale.
- ARCHITECT can move published sales to `CLOSED` and then `DELIVERED`.
- Sales, companies, and other resources use **soft deletion** rather than physical deletion.

### Navigation

Keep routes minimal:

```text
/
├── login
└── (protected)
    ├── dashboard
    ├── manage
    │   ├── architects
    │   ├── companies
    │   └── users
    └── account
```

Role visibility is controlled by existing **RBAC/ABAC** logic.

Mobile bottom navigation:

```text
Dashboard · Manage · Account
```

`Manage` is ADMIN-only.

### UX conventions

- Mobile-first.
- Bottom navigation rather than hamburger navigation.
- Resource lists render as cards.
- `+` create action belongs in the resource header.
- Create → form in a bottom drawer.
- View details → bottom drawer.
- Edit → form in a bottom drawer.
- Delete → confirmation modal, then soft delete.
- Avoid unnecessary dynamic routes such as `/companies/[id]`, `/companies/new`, `/companies/[id]/edit`.
- Routes represent application surfaces; drawers/modals represent UI state.
- Database relationships do **not** need to mirror route hierarchy.

### Architecture

Use:

```text
UI
 ↓
Server Action
 ↓
Controller
 ↓
Validation
 ↓
RBAC / ABAC
 ↓
Service
 ↓
Repository
 ↓
Prisma
 ↓
PostgreSQL
```

- Controllers handle input parsing/validation.
- Services contain business rules.
- Repositories handle Prisma/database operations.
- Authorization must be enforced server-side; UI checks are only for presentation.
- Use Zod for validation.
- Prefer direct imports rather than barrel files, especially around client/server boundaries.

### CRUD pattern

```text
LIST
 ↓
CARD
 ↓
DETAIL DRAWER
 ├── Edit → EDIT FORM
 └── Delete → CONFIRMATION MODAL
```

Create:

```text
+
↓
CREATE DRAWER
↓
SERVER ACTION
```

### Design goal

The app should feel like a **small, modular mobile operating system for sales**, not a traditional desktop CRUD admin panel.

Prioritize:

1. Simple navigation
2. Reusable components
3. Strong separation of concerns
4. Server-side authorization
5. Automated testing
6. Easy extension for future clients/features