# ODA Design Demo

A Next.js 15 demo project cloning the HQ Buy Dashboard from oda-web, using the latest versions of core libraries.

## Tech Stack

| Category | Library | Version |
|---|---|---|
| Framework | Next.js | ^15.2 |
| UI | React | ^19.0 |
| Language | TypeScript | ^5.8 |
| Component Lib | MUI v6 | ^6.4 |
| State | Redux Toolkit | ^2.5 |
| Charts | ECharts + echarts-for-react | ^5.6 / ^3.0 |
| Forms | react-hook-form + yup | ^7.54 / ^1.6 |
| HTTP | Axios | ^1.8 |
| i18n | i18next + react-i18next | ^24 / ^15 |
| Animation | Framer Motion | ^12 |
| Dates | date-fns + dayjs | ^4 / ^1.11 |
| Lists | react-virtuoso | ^4.12 |
| Notifications | notistack | ^3 |
| Styling | Emotion | ^11.14 |

## Features

- **HQ Dashboard** — Buy/Sell tab switcher
- **Filter Bar** — Scope (HQ / Chi nhánh), Period, Compare toggle
- **Summary Cards** — Total orders, Completed orders with MoM % change
- **Status Overview** — Stacked bar breakdown by order status
- **Trend Chart** — Bar (amount) + Line (orders) combo with ECharts
- **Product Ranking** — Horizontal bar Top 10 / Bottom 10
- **Supplier Ranking** — Bar + Line combo Top 10 / Bottom 10
- **Company Performance Table** — Sortable, searchable with MoM badges
- **Collapsible Sidebar** — Navigation shell

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── dashboard/
│       └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── SummaryCard.tsx
│   │   ├── StatusOverview.tsx
│   │   ├── TrendChart.tsx
│   │   ├── ProductRankingChart.tsx
│   │   ├── SupplierRankingChart.tsx
│   │   ├── CompanyPerformanceTable.tsx
│   │   └── FilterBar.tsx
│   └── layout/
│       └── Sidebar.tsx
└── lib/
    ├── mockData.ts
    └── utils.ts
```

## Notes vs oda-web

- Upgraded from Next.js 12 → **15** (App Router)
- Upgraded React 18 → **19**
- Upgraded MUI 5 → **6**
- Upgraded Redux Toolkit 1.x → **2.x**
- Unified styling: **Emotion only** (dropped styled-components)
- Unified notifications: **notistack only** (dropped react-toastify)
- Unified dates: both date-fns and dayjs kept for compatibility (standardize later)
