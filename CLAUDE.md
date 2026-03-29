@AGENTS.md

# DevHouse Tycoon — Gamified ERP for IT Outsource

## Project Overview
ระบบ ERP สำหรับบริหารบริษัท IT Outsource (50-200 คน) ที่ present ในรูปแบบเกม
- **ข้อมูลจริง** — เชื่อมต่อ Google Workspace, Jira, GitHub, Slack
- **ตัดสินใจจริง** — assign คน, approve budget, manage projects ส่งผลจริง
- **Gamification** — XP, Levels, Achievements, Leaderboard สำหรับทีม
- **Role-based Access** — Admin, Manager, Team Lead, Member แต่ละ role เห็นข้อมูลต่างกัน

## Core Concept: Gamified ERP
3 Layers ซ้อนกัน:
- **ERP Layer**: CRUD จริง, two-way sync กับ external systems, RBAC, audit log
- **Game Layer**: XP/Level/Achievements, Visual แบบเกม, Notifications เป็น Events
- **Analytics Layer**: Dashboard, KPIs, Charts, What-if Simulation

### Gamification Elements
- **XP & Levels**: ได้ XP จากงานสำเร็จจริง (deliver on-time, fix bugs, complete cert)
- **Achievements**: "First Deploy", "Zero Bug Sprint", "100% On-time", "Revenue Milestone"
- **Leaderboard**: จัดอันดับทีม/บุคคล ตาม performance metrics จริง
- **Quests**: เป้าหมายรายสัปดาห์/เดือน จากข้อมูลจริง
- **Company Level**: ตาม Revenue/Headcount/Reputation — unlock dashboard features

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js + Google OAuth 2.0 + Role-based Access Control
- **UI**: React 18 + Zustand (state management) + Tailwind CSS
- **Language**: TypeScript (strict mode)
- **Charts**: Recharts / D3.js
- **Real-time**: WebSocket (for live notifications/updates)
- **Deployment**: Vercel
- **Testing**: Vitest + React Testing Library + Playwright (E2E)

### External Integrations
| Service | API | Data Synced |
|---------|-----|-------------|
| Google Workspace | Google APIs (Sheets, Calendar, Drive) | HR data, schedules, documents |
| Jira / Linear | REST API | Projects, sprints, tasks, velocity |
| GitHub / GitLab | GraphQL + REST API | Repos, PRs, commits, code reviews, CI/CD |
| Slack | Web API + Events API | Notifications, team communication metrics |

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Login, OAuth callback
│   ├── (dashboard)/     # Main app layout
│   │   ├── overview/    # Company dashboard (game-style)
│   │   ├── people/      # HR & Team management
│   │   ├── projects/    # Project management (Kanban)
│   │   ├── finance/     # Financial dashboards
│   │   ├── office/      # Office & infrastructure
│   │   ├── clients/     # Client management
│   │   ├── tech/        # Tech radar & R&D
│   │   ├── culture/     # Culture & policies
│   │   └── settings/    # App settings, integrations
│   └── api/             # API routes
│       ├── auth/        # Auth endpoints
│       ├── sync/        # Integration sync endpoints
│       ├── gamification/# XP, achievements, leaderboard
│       └── [module]/    # CRUD per module
├── components/          # Shared UI components
│   ├── game/            # Game-style components (XP bar, achievements, etc.)
│   ├── dashboard/       # Dashboard widgets, charts
│   ├── kanban/          # Kanban board components
│   └── common/          # Buttons, cards, modals, etc.
├── lib/                 # Core business logic
│   ├── integrations/    # External API clients
│   │   ├── google/      # Google Workspace client
│   │   ├── jira/        # Jira/Linear client
│   │   ├── github/      # GitHub client
│   │   └── slack/       # Slack client
│   ├── gamification/    # XP calc, achievement engine, leaderboard
│   ├── sync/            # Data sync scheduler + conflict resolution
│   └── utils/           # Shared utilities
├── stores/              # Zustand stores (client-side state)
├── prisma/              # Prisma schema + migrations
│   └── schema.prisma
└── types/               # Shared TypeScript types
```

## Database Schema (key tables)
- `users` — id, name, email, role, google_id, avatar
- `employees` — id, user_id, position, department, skills[], salary, hire_date
- `projects` — id, name, client_id, status, tech_stack[], deadline, jira_id
- `tasks` — id, project_id, assignee_id, status, sprint, story_points
- `clients` — id, name, industry, satisfaction_score, contracts[]
- `finances` — id, type, amount, category, date, description
- `gamification_xp` — id, user_id, amount, source, timestamp
- `achievements` — id, user_id, type, unlocked_at
- `sync_log` — id, source, action, status, timestamp, data
- `audit_log` — id, user_id, action, entity, old_value, new_value, timestamp

## Architecture Decisions
- Next.js App Router for full-stack TypeScript (API + SSR + client)
- PostgreSQL for relational data integrity + complex queries (finance, analytics)
- Prisma for type-safe database access + migrations
- Two-way sync: External systems ↔ PostgreSQL (Jira, GitHub, Google, Slack)
- Gamification engine calculates XP/achievements from real ERP metrics
- Role-based access: Admin sees all, Manager sees department, Member sees own data
- Audit log on all write operations for accountability
- Write-back safety: confirmation required before syncing changes to external systems
- All currency defaults to THB (฿), configurable in settings

## Coding Conventions
- TypeScript strict mode, no `any`
- Components: PascalCase (`EmployeeCard.tsx`)
- API routes: kebab-case (`api/sync/jira-projects`)
- Stores: camelCase with "Store" suffix (`hrStore.ts`)
- Integration clients: camelCase with "Client" suffix (`jiraClient.ts`)
- Database: snake_case (Prisma maps to camelCase)
- CSS: Tailwind utility classes, design tokens via theme extend
- Tests: Vitest (unit) + Playwright (E2E)
- Named exports only, no default exports

## Key Files
- `HANDOFF_SPEC.md` — Game-style UI/UX design specification
- `openspec/` — Change management specs
- `prisma/schema.prisma` — Database schema

## ERP Modules (8 core + gamification)

| Module | Data Source | Features |
|--------|-----------|----------|
| 1. Sales & BD | Google Sheets + CRM | Pipeline, clients, bidding, contracts |
| 2. HR & Talent | Google Sheets + Slack | Employees, skills, salary, performance, org chart |
| 3. Project Mgmt | Jira + GitHub | Kanban, sprints, velocity, bugs, deadlines |
| 4. Finance | Google Sheets | Revenue, expenses, P&L, invoicing, runway |
| 5. Office & Infra | Manual + Cloud APIs | Office costs, cloud spend, tool licenses |
| 6. Marketing | Google Analytics + Social | Brand score, campaigns, leads |
| 7. Tech & R&D | GitHub + npm | Tech radar, repo health, innovation metrics |
| 8. Culture | Slack + Surveys | Morale score, attrition, team events |
| Gamification | All modules | XP, levels, achievements, leaderboard, quests |

## Implementation Phases
- **Phase 1 (MVP)**: Next.js setup, Auth, DB, Google integration, Dashboard, HR + Projects view
- **Phase 2 (Integrations)**: Jira sync, GitHub sync, Slack notifications, Finance module
- **Phase 3 (Gamification)**: XP engine, Achievements, Leaderboard, Quests, Game-style UI
- **Phase 4 (Polish)**: Office visual, Charts/Analytics, Mobile responsive, i18n (TH/EN)

## Commands
- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run test` — Run Vitest
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run lint` — ESLint + Prettier check
- `npm run db:push` — Push Prisma schema to database
- `npm run db:migrate` — Run database migrations
- `npm run db:seed` — Seed database with initial data
- `npm run sync:all` — Trigger full data sync from all integrations
