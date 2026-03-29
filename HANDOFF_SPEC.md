# Handoff Spec: DevHouse Tycoon -- IT Outsource Business Simulator

## Overview

**DevHouse Tycoon** is a business simulation game where players build and manage a software development / IT outsourcing company from the ground up. Inspired by classic tycoon games like McDonald's Tycoon, the game covers **every aspect** of running an IT outsource business: hiring, project management, finance, sales, office management, company culture, technology decisions, and client relationships.

The player starts as a solo freelancer and grows into a full-scale IT outsource company with multiple teams, offices, and international clients.

---

## Game Concept & Core Loop

### Core Gameplay Loop
```
[Find Clients] → [Bid on Projects] → [Assign Teams] → [Develop & Deliver] → [Get Paid] → [Grow Company] → [Repeat]
```

### Game Phases (Progression)

| Phase | Company Size | Unlocks | Revenue Range |
|-------|-------------|---------|---------------|
| **Phase 1: Freelancer** | 1 person | Basic web/mobile projects, home office | $0 - $50K/mo |
| **Phase 2: Startup** | 2-10 people | Small office, 2-3 concurrent projects, hiring | $50K - $300K/mo |
| **Phase 3: Growing Agency** | 11-50 people | Multiple teams, HR dept, marketing, larger clients | $300K - $2M/mo |
| **Phase 4: Mid-size Company** | 51-200 people | Multiple offices, enterprise clients, R&D dept | $2M - $10M/mo |
| **Phase 5: Enterprise** | 200+ people | Global offices, IPO option, acquisitions | $10M+/mo |

---

## Game Systems (Departments / Pillars)

### 1. Sales & Business Development

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Lead Generation** | Clients appear on a "marketplace" board | Random events + marketing spend influence frequency & quality |
| **RFP/Bidding** | Player reviews project requirements and submits bids | Price too high = lose bid. Price too low = lose money |
| **Client Relationships** | Each client has a satisfaction meter (0-100%) | Affects repeat business, referrals, and reviews |
| **Contract Types** | Fixed Price, Time & Material, Retainer, Staff Augmentation | Each has different risk/reward profiles |
| **Sales Pipeline** | Visual Kanban board: Lead → Qualified → Proposal → Negotiation → Won/Lost | Player manages pipeline actively |

**Client Attributes:**
- Industry (FinTech, E-commerce, Healthcare, Education, Government, etc.)
- Budget (Low / Medium / High / Enterprise)
- Patience (Strict deadline vs. Flexible)
- Communication style (Hands-off vs. Micromanager)
- Tech requirements (Web, Mobile, AI/ML, Cloud, DevOps, Legacy)

### 2. Human Resources & Talent

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Hiring** | Browse candidate pool, interview, offer | Each candidate has stats: Skill, Speed, Teamwork, Salary expectation |
| **Roles** | Frontend, Backend, Mobile, QA, DevOps, PM, Designer, BA, HR, Sales | Unlock roles as company grows |
| **Training** | Send employees to courses/certifications | Increases skill but costs time and money |
| **Morale** | Employee happiness (0-100%) | Low morale = bugs, turnover, slow work |
| **Attrition** | Employees can quit if unhappy | Salary, culture, overwork, career growth all factor in |
| **Performance Review** | Quarterly reviews | Promote, bonus, or fire underperformers |
| **Org Chart** | Build team structure | Team Lead → Senior → Mid → Junior hierarchy |

**Employee Stats:**
```
┌─────────────────────────────┐
│  Somchai Jaidee              │
│  Senior Backend Developer    │
│  ─────────────────────────   │
│  Skill:      ████████░░ 80   │
│  Speed:      ██████░░░░ 60   │
│  Teamwork:   █████████░ 90   │
│  Morale:     ███████░░░ 70   │
│  Salary:     ฿85,000/mo      │
│  Tech: Java, Spring, AWS     │
│  ─────────────────────────   │
│  [Promote] [Train] [Fire]    │
└─────────────────────────────┘
```

### 3. Project Management & Delivery

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Project Board** | Kanban: Backlog → In Progress → Code Review → QA → Done | Drag tasks, assign developers |
| **Sprint System** | 2-week sprints with velocity tracking | Overloading sprints = bugs & burnout |
| **Tech Stack Choice** | Choose technologies for each project | Wrong stack = slow delivery, right stack = bonus |
| **Bug System** | Bugs generated based on developer skill, rush, complexity | Must fix before delivery or lose client satisfaction |
| **Deadline Pressure** | Visual countdown timer per project | Late delivery = penalties, early = bonus |
| **Code Quality** | Hidden "technical debt" meter per project | Cutting corners = fast now, expensive later |
| **Methodology** | Choose: Agile, Waterfall, Kanban, or Hybrid | Each has pros/cons depending on project type |

**Project Complexity Matrix:**

| Project Type | Duration | Team Size | Risk | Revenue |
|-------------|----------|-----------|------|---------|
| Landing Page | 1-2 weeks | 1-2 | Low | $ |
| Corporate Website | 2-4 weeks | 2-3 | Low | $$ |
| E-commerce Platform | 1-3 months | 3-5 | Medium | $$$ |
| Mobile App | 2-4 months | 3-6 | Medium | $$$ |
| Enterprise System (ERP/CRM) | 3-12 months | 5-15 | High | $$$$ |
| AI/ML Platform | 3-6 months | 4-8 | Very High | $$$$ |
| Legacy Migration | 2-8 months | 4-10 | Very High | $$$$$ |
| Cloud Infrastructure | 1-6 months | 2-6 | High | $$$$ |

### 4. Finance & Accounting

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Cash Flow** | Monthly income vs. expenses dashboard | Running out = game over (or loan) |
| **Invoice System** | Bill clients on milestones or monthly | Late payments are realistic; must chase |
| **Expenses** | Salaries, rent, tools, AWS bills, marketing | Must balance growth vs. burn rate |
| **Loans & Investment** | Bank loans or find investors | Investors take equity, loans have interest |
| **Tax** | Quarterly tax obligations | Forget to save = cash crisis |
| **Pricing Strategy** | Set hourly rates / project rates | Market rate awareness required |
| **P&L Statement** | Monthly profit/loss report | Key metric for company health |
| **Runway** | Months of cash remaining | Below 3 months = warning |

**Financial Dashboard Mock:**
```
╔══════════════════════════════════════╗
║  FINANCIAL OVERVIEW - March 2026     ║
╠══════════════════════════════════════╣
║  Revenue:        ฿2,450,000          ║
║  Expenses:       ฿1,890,000          ║
║  ────────────────────────────        ║
║  Net Profit:     ฿560,000   (+23%)   ║
║  Cash on Hand:   ฿4,200,000          ║
║  Runway:         8.2 months          ║
║  ────────────────────────────        ║
║  Accounts Recv:  ฿1,200,000          ║
║  Accounts Pay:   ฿340,000            ║
║  ────────────────────────────        ║
║  Active Projects: 7                  ║
║  Headcount:       34                 ║
╚══════════════════════════════════════╝
```

### 5. Office & Infrastructure

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Office Space** | Rent or buy offices of different sizes/locations | Location affects prestige, commute, rent cost |
| **Workstations** | Buy desks, monitors, chairs | Better equipment = productivity boost |
| **Server/Cloud** | Choose cloud providers (AWS/GCP/Azure) or on-prem | Affects project capabilities and costs |
| **Tools & Licenses** | Buy Jira, Figma, GitHub, Slack, etc. | Needed tools unlock capabilities |
| **Office Layout** | Drag-and-drop office designer | Open plan vs. private rooms affects collaboration/focus |
| **Remote/Hybrid** | Enable WFH policy | Saves rent but may reduce collaboration |
| **Internet & Security** | Upgrade bandwidth, firewall, VPN | Client requirements (especially enterprise) |

**Office Builder View (Top-down):**
```
┌──────────────────────────────────────────┐
│ ┌────┐ ┌────┐ ┌────┐   ┌──────────────┐ │
│ │Dev │ │Dev │ │Dev │   │  Meeting Rm  │ │
│ │Team│ │Team│ │Team│   │   (8 seats)  │ │
│ │ A  │ │ B  │ │ C  │   └──────────────┘ │
│ └────┘ └────┘ └────┘                     │
│                          ┌────────────┐  │
│ ┌──────────┐ ┌───────┐  │   Server    │  │
│ │  Kitchen  │ │  HR   │  │    Room     │  │
│ │  & Break  │ │ Room  │  └────────────┘  │
│ └──────────┘ └───────┘                   │
│              ┌─────────────────────┐     │
│              │     Reception       │     │
│              └─────────────────────┘     │
└──────────────────────────────────────────┘
```

### 6. Marketing & Brand

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Company Brand** | Name, logo, colors (customizable) | Brand score affects client quality |
| **Website** | Build company website (meta-game!) | Better site = more inbound leads |
| **Social Media** | Post content for awareness | Costs time, builds brand over time |
| **Case Studies** | Publish successful projects | Unlocks higher-tier clients |
| **Tech Blog** | Publish articles | Attracts developer candidates + brand |
| **Conference/Events** | Attend or sponsor tech events | Networking for clients and hiring |
| **Awards** | Win "Top IT Company" awards | Major brand & morale boost |
| **Clutch/GoodFirms** | Review platform ratings | Based on client satisfaction history |

### 7. Technology & R&D

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Tech Radar** | Track trending technologies | Invest early = competitive advantage |
| **R&D Projects** | Internal products or tools | Can become SaaS products for passive income |
| **Tech Stack Evolution** | Technologies age and become legacy | Must evolve or lose competitiveness |
| **Innovation Lab** | Prototype new solutions | Can win innovation awards |
| **Open Source** | Contribute to OSS | Attracts developer talent |
| **IP/Patents** | File patents on innovations | Passive licensing income |

**Tech Radar View:**
```
          ADOPT          TRIAL         ASSESS        HOLD
    ┌──────────┬──────────┬──────────┬──────────┐
    │ React    │ Rust     │ AI Agents│ jQuery   │
    │ TypeScript│ Go      │ Web3     │ AngularJS│
    │ AWS      │ K8s     │ Quantum  │ PHP 5    │
    │ Docker   │ GraphQL │ AR/VR    │ COBOL    │
    └──────────┴──────────┴──────────┴──────────┘
```

### 8. Company Culture & Policies

| Element | Description | Mechanic |
|---------|-------------|----------|
| **Work-Life Balance** | Set working hours, overtime policy | Affects morale and attrition |
| **Benefits** | Health insurance, gym, meals, etc. | Costs money but retains talent |
| **Culture Score** | Aggregate of all culture factors (0-100) | Affects Glassdoor rating → hiring |
| **Team Events** | Organize parties, team building, hackathons | Temporary morale boost |
| **Diversity & Inclusion** | Track team diversity | Unlocks certain enterprise clients |
| **Remote Policy** | Full office / Hybrid / Full remote | Each has trade-offs |
| **Values** | Define company values | Affects decisions and brand |

---

## Random Events System

Events trigger periodically and force the player to make decisions:

| Event | Choices | Impact |
|-------|---------|--------|
| **Key developer wants to quit** | Counter-offer / Let go / Negotiate | Salary cost vs. project delay |
| **Client scope creep** | Accept free / Charge extra / Push back | Client relation vs. profit |
| **Server outage** | Fix in-house / Pay emergency support | Downtime vs. cost |
| **Competitor poaching** | Raise salaries / Improve culture / Accept loss | Budget vs. retention |
| **New technology hype** | Invest early / Wait and see / Ignore | Risk vs. first-mover advantage |
| **Economic recession** | Cut costs / Maintain / Invest more | Survival vs. growth |
| **Data breach** | Transparent disclosure / Cover up / Blame vendor | Trust vs. legal risk |
| **Government regulation** | Comply early / Wait / Lobby | Cost vs. risk |
| **Viral social media** | Capitalize / Ignore / Manage crisis | Brand impact |
| **Pandemic / WFH mandate** | Adapt quickly / Resist / Partial | Operations vs. morale |

---

## UI/UX Specifications

### Main Screen Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] DevHouse Tycoon    ฿4,200,000    Day 234    [⚙] [⏸] [💾]│
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│ Dashboard│          MAIN VIEWPORT                               │
│ Projects │     (Office View / Department View /                 │
│ People   │      Financial Dashboard / etc.)                     │
│ Finance  │                                                      │
│ Office   │                                                      │
│ Clients  │                                                      │
│ Marketing│                                                      │
│ Tech     │                                                      │
│ Culture  │                                                      │
│          │                                                      │
├──────────┴──────────────────────────────────────────────────────┤
│ [▶ x1] [▶▶ x2] [▶▶▶ x5]  │ 🔔 3 notifications │ Alerts bar  │
└─────────────────────────────────────────────────────────────────┘
```

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#1A73E8` | Main actions, selected nav, links |
| `color-success` | `#34A853` | Profit indicators, completed tasks |
| `color-danger` | `#EA4335` | Losses, warnings, urgent alerts |
| `color-warning` | `#FBBC04` | Deadline approaching, moderate risk |
| `color-bg-main` | `#F8F9FA` | Main background |
| `color-bg-panel` | `#FFFFFF` | Card/panel backgrounds |
| `color-bg-dark` | `#202124` | Sidebar, header |
| `color-text-primary` | `#202124` | Main text |
| `color-text-secondary` | `#5F6368` | Secondary/muted text |
| `color-text-on-dark` | `#E8EAED` | Text on dark backgrounds |
| `spacing-xs` | `4px` | Tight inner padding |
| `spacing-sm` | `8px` | Between related elements |
| `spacing-md` | `16px` | Standard gap between sections |
| `spacing-lg` | `24px` | Between major sections |
| `spacing-xl` | `32px` | Page margins |
| `radius-sm` | `4px` | Buttons, inputs |
| `radius-md` | `8px` | Cards, panels |
| `radius-lg` | `16px` | Modals, large containers |
| `font-heading-xl` | `24px / 700 / Inter` | Page titles |
| `font-heading-lg` | `20px / 600 / Inter` | Section titles |
| `font-heading-md` | `16px / 600 / Inter` | Card titles |
| `font-body` | `14px / 400 / Inter` | Body text |
| `font-caption` | `12px / 400 / Inter` | Labels, secondary info |
| `font-mono` | `13px / 400 / JetBrains Mono` | Code, numbers, stats |
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.12)` | Card elevation |
| `shadow-modal` | `0 8px 24px rgba(0,0,0,0.24)` | Modal elevation |
| `transition-fast` | `150ms ease-out` | Hover states, toggles |
| `transition-normal` | `300ms ease-in-out` | Panel open/close |
| `transition-slow` | `500ms ease-in-out` | Page transitions |

### Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **Desktop (>1280px)** | Full layout: sidebar + main viewport + detail panel |
| **Laptop (1024-1280px)** | Collapsible sidebar (icon-only), main viewport fills |
| **Tablet (768-1024px)** | Bottom tab navigation replaces sidebar, simplified views |
| **Mobile (<768px)** | Single-column, swipe between sections, simplified management |

### Key Component Specs

| Component | Variant | Props | Notes |
|-----------|---------|-------|-------|
| `EmployeeCard` | Default, Selected, Warning | name, role, stats, morale, avatar | Red border when morale < 30% |
| `ProjectCard` | Active, Completed, Overdue, Paused | name, client, progress, deadline, team | Pulsing red glow when overdue |
| `FinanceWidget` | Revenue, Expense, Profit, Cash | value, change%, trend | Green/red trend arrows |
| `ClientAvatar` | Happy, Neutral, Angry | name, satisfaction, industry | Face expression changes with satisfaction |
| `ProgressBar` | Default, Warning, Danger | value, max, label | Yellow at 75%, red at 90% of deadline |
| `NotificationToast` | Info, Success, Warning, Error | message, action, duration | Auto-dismiss after 5s, stack up to 3 |
| `KanbanColumn` | Default, Full, Empty | title, count, cards | Drag-and-drop between columns |
| `StatMeter` | Horizontal, Circular | value, max, label, color | Animated fill on value change |
| `TimeControl` | Play, Fast, Fastest, Pause | speed, isPaused | Bottom bar, always visible |
| `MiniChart` | Line, Bar, Pie | data, type, period | Sparkline in dashboard widgets |
| `ModalDialog` | Decision, Info, Confirm | title, body, actions | Blurred background overlay |
| `Tooltip` | Default, Rich | text, position | 200ms delay, max-width 240px |

---

## States & Interactions

### Dashboard States

| Element | State | Behavior |
|---------|-------|----------|
| Sidebar Nav Item | Default | `color-text-on-dark`, no background |
| Sidebar Nav Item | Hover | Background `rgba(255,255,255,0.08)`, `transition-fast` |
| Sidebar Nav Item | Active | Left border `3px color-primary`, bg `rgba(26,115,232,0.12)` |
| Sidebar Nav Item | Has Alert | Red dot badge (8px) top-right |
| Dashboard Card | Default | `shadow-card`, white background |
| Dashboard Card | Hover | Slight lift `translateY(-2px)`, `shadow-modal`, cursor pointer |
| Dashboard Card | Loading | Skeleton shimmer animation |
| Time Control | Paused | Pulsing amber border, "PAUSED" text overlay |
| Time Control | Fast Forward | Speed indicator glows |
| Notification Bell | Has Notifications | Bounce animation, badge with count |

### Project Management States

| Element | State | Behavior |
|---------|-------|----------|
| Task Card | Dragging | Opacity 0.7, drop shadow enlarged, source position shows dotted outline |
| Task Card | Blocked | Red left border, lock icon |
| Task Card | Bug | Bug icon badge, red tint |
| Sprint | Overloaded | Warning banner: "Sprint overloaded! Risk of burnout" |
| Sprint | Complete | Confetti animation, stats summary popup |
| Deadline | >7 days | Green text |
| Deadline | 3-7 days | Yellow text, subtle pulse |
| Deadline | <3 days | Red text, urgent pulse animation |
| Deadline | Overdue | Red background, shaking animation |

### Employee States

| Element | State | Behavior |
|---------|-------|----------|
| Employee | Happy (>70%) | Green smile icon |
| Employee | Neutral (40-70%) | Yellow neutral face |
| Employee | Unhappy (<40%) | Red sad face, "at risk" badge |
| Employee | Quitting | Flashing red card, urgent decision required |
| Employee | In Training | Book icon, greyed out from project assignment |
| Employee | Overworked | Fire icon, stamina bar depleting |
| Employee | Idle | Zzz icon, wasting salary |
| Skill Bar | Improving | Sparkle animation on increase |

---

## Animation & Motion Specs

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Money Counter | Value change | Number rolls up/down | 600ms | `ease-out` |
| New Client | Appears | Slide in from right + fade | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Project Complete | Delivery | Confetti burst + satisfaction reveal | 1200ms | `ease-in-out` |
| Employee Hired | Joins | Bounce in from bottom | 500ms | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` |
| Employee Quit | Leaves | Fade out + slide down | 400ms | `ease-in` |
| Notification | Appears | Slide in from top-right | 300ms | `ease-out` |
| Notification | Dismiss | Slide out right + fade | 200ms | `ease-in` |
| Random Event | Triggers | Screen dim + modal zoom in | 500ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Level Up | Phase change | Full-screen celebration, fireworks | 3000ms | Custom keyframes |
| Office Build | Room placed | Pop-in with dust particles | 400ms | `spring(1, 80, 10)` |
| Chart Data | Updates | Line/bar morphs to new position | 800ms | `ease-in-out` |
| Day Cycle | Time passes | Subtle window light color shift | Continuous | Linear |

---

## Audio Design (Optional Enhancement)

| Context | Sound | Notes |
|---------|-------|-------|
| Background | Lo-fi office ambience | Keyboard typing, murmur, AC hum |
| Money received | Cash register "ka-ching" | Satisfying feedback |
| Project complete | Success chime | Positive reinforcement |
| Bug found | Error beep | Alert without annoyance |
| Employee quits | Door close sound | Emotional weight |
| Random event | News alert tone | Attention-grabbing |
| Level up | Fanfare | Celebratory |
| Deadline warning | Ticking clock | Builds tension (gets faster near deadline) |

---

## Data Model (Key Entities)

```
Company
├── name, logo, cash, reputation, culture_score
├── Offices[]
│   ├── location, size, rent, equipment[]
│   └── Rooms[] (type, capacity, effect)
├── Employees[]
│   ├── name, role, skills[], salary, morale, performance
│   └── assignments[] (project_id, hours)
├── Projects[]
│   ├── name, client_id, type, tech_stack[], deadline
│   ├── Tasks[] (status, assignee, complexity, bugs)
│   ├── budget, actual_cost, progress%
│   └── quality_score, tech_debt
├── Clients[]
│   ├── name, industry, budget_tier, satisfaction
│   └── contracts[], communication_style
├── Finances
│   ├── revenue_history[], expense_history[]
│   ├── accounts_receivable[], accounts_payable[]
│   └── loans[], investments[]
├── Marketing
│   ├── brand_score, website_quality, social_reach
│   └── campaigns[], case_studies[]
└── TechRadar
    └── technologies[] (name, category, adoption_level, market_trend)
```

---

## Win/Lose Conditions

### Lose Conditions
- **Bankruptcy**: Cash drops to 0 with no way to recover
- **Reputation Collapse**: Brand score drops to 0 (all clients leave)
- **Mass Exodus**: All employees quit simultaneously

### Win Conditions (Sandbox + Goals)
- **IPO**: Take the company public at $100M+ valuation
- **Acquisition**: Get acquired by a tech giant
- **Unicorn**: Reach $1B valuation through mix of services + products
- **Legacy**: Run for 20 game-years with positive reputation
- **Sandbox Mode**: No win/lose, just build freely

---

## Accessibility Notes

- **Keyboard Navigation**: Full keyboard support. Tab order: sidebar → main content → action bar. Arrow keys navigate within grids/kanban.
- **Screen Reader**: All charts have text alternatives. Employee stats announced as "Somchai, Senior Backend Developer, skill 80 out of 100, morale 70 percent."
- **Color Blind Mode**: Toggle in settings. All status indicators use shape + color (not color alone). Profits use up-arrow + green, losses use down-arrow + red.
- **Text Scaling**: UI supports 100%-200% text scaling without layout breaking.
- **Reduced Motion**: Respects `prefers-reduced-motion`. All animations replaced with instant state changes.
- **Focus Indicators**: Visible `2px color-primary` outline on all focusable elements.
- **ARIA Labels**: All interactive elements labeled. Tooltips accessible via focus. Live regions for notifications and real-time updates (cash, project progress).

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| **No projects** | "Find Clients" prompt with tutorial arrow. Idle employees show Zzz and morale slowly drops. |
| **No money** | Warning at 1-month runway. At 0: "Emergency Mode" -- must fire staff or take loan within 7 game-days or game over. |
| **All employees quit** | "Company Crisis" event. Option to restart hiring or accept game over. |
| **100+ concurrent projects** | Paginated project list, filter/search bar appears. Performance optimized with virtual scrolling. |
| **Long company name** | Truncate at 24 chars with ellipsis in header. Full name in tooltip. |
| **Long employee name** | Truncate at 20 chars in card. Full name on hover/focus. |
| **Save corruption** | Auto-save every 5 minutes. Keep last 3 saves. Cloud backup option. |
| **AFK / idle** | Game auto-pauses after 5 minutes of no input. |
| **International currency** | Default THB (฿). Option to switch display currency in settings. |
| **Slow connection (if web)** | Offline-first architecture. Local save with cloud sync when available. |

---

## Suggested Tech Stack (Implementation)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Engine** | Phaser 3 or PixiJS | 2D game rendering, good ecosystem |
| **UI Framework** | React + Zustand | Complex UI panels, state management |
| **Styling** | Tailwind CSS | Rapid UI development with design tokens |
| **Language** | TypeScript | Type safety for complex game logic |
| **Data** | IndexedDB (local) | Offline-first save system |
| **Audio** | Howler.js | Cross-browser audio |
| **Charts** | D3.js or Recharts | Financial dashboards |
| **Build** | Vite | Fast dev experience |
| **Platform** | Web (primary), Electron (desktop), Capacitor (mobile) | Cross-platform from single codebase |

---

## Implementation Priority (Suggested Phases)

### MVP (Phase 1) -- Core Loop
1. Basic office view (static)
2. Hire/fire employees with stats
3. Accept projects from marketplace
4. Assign developers to projects
5. Time progression system
6. Basic finance (income/expense)
7. Project completion & client satisfaction
8. Simple save/load

### Phase 2 -- Depth
1. Office builder (drag & drop)
2. Employee morale & attrition system
3. Random events
4. Multiple project types
5. Tech stack selection
6. Sprint/Kanban project management
7. Financial dashboard with charts

### Phase 3 -- Scale
1. Multiple offices
2. Marketing & brand system
3. Tech radar
4. Client relationship depth
5. Company phases/progression
6. Achievements & milestones

### Phase 4 -- Polish
1. Full audio design
2. Animations & juice
3. Tutorial / onboarding
4. Balance tuning
5. Accessibility audit
6. Mobile responsive
7. Localization (TH/EN)

---

*Generated for: DevHouse Tycoon -- IT Outsource Business Simulator*
*Handoff Date: 2026-03-28*
