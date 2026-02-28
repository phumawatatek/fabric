# CLAUDE.md - AI Assistant Guide for Fabric Factory Management System

## Project Overview

This is a **Next.js 16 + React 19 + TypeScript** web application for managing a textile/fabric mill ("Nhà Máy Vải Sợi"). It provides real-time dashboards for production monitoring, HR/KPI tracking, cotton mixing, energy management, maintenance scheduling, and quality control. All UI text is in **Vietnamese**.

The project uses **simulated/mock data** with real-time updates via `setInterval` — there is no backend API or database.

## Quick Reference

```bash
npm install          # Install dependencies (pnpm also works; pnpm-lock.yaml present)
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build (TypeScript errors ignored via config)
npm run start        # Run production build
npm run lint         # ESLint
```

## Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 16.1.6 (App Router)                     |
| Language       | TypeScript 5.7.3 (strict mode)                  |
| UI Library     | React 19.2.4                                    |
| Styling        | Tailwind CSS 4.2.0, tw-animate-css              |
| UI Components  | shadcn/ui (new-york style) + Radix UI primitives |
| Charts         | Recharts 2.15.0                                 |
| Icons          | Lucide React                                    |
| Forms          | React Hook Form + Zod                           |
| Date Handling  | date-fns 4.1.0                                  |
| Analytics      | @vercel/analytics                               |

## Project Structure

```
fabric/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (dark theme, Vietnamese lang)
│   ├── page.tsx                 # Entry point → renders MainLayout
│   └── globals.css              # Tailwind + global styles
├── components/
│   ├── MainLayout.tsx           # App shell: sidebar navigation + view routing
│   ├── KPICard.tsx              # Reusable KPI metric card
│   ├── MachineCard.tsx          # Machine status card
│   ├── MachineDetailDialog.tsx  # Machine detail modal
│   ├── WorstMachineDetailDialog.tsx
│   ├── StatusBadge.tsx          # Status indicator badge
│   ├── theme-provider.tsx       # Theme context wrapper
│   ├── ui/                      # ~55 shadcn/ui components (do not edit directly)
│   └── views/                   # Feature views (main application pages)
│       ├── Dashboard.tsx        # Production overview dashboard
│       ├── Analytics.tsx        # Data analytics & charts
│       ├── HRKPIView.tsx        # HR management & KPI tracking
│       ├── CottonMixingView.tsx # AI cotton mixing management
│       ├── EnergyManagementView.tsx # Energy & HVAC monitoring
│       ├── MaintenanceView.tsx  # Maintenance scheduling
│       └── QualityManagementView.tsx # Quality control
├── hooks/
│   ├── useFactoryData.ts        # Core data hook (mock data + real-time simulation)
│   ├── use-mobile.ts            # Mobile breakpoint detection
│   └── use-toast.ts             # Toast notification hook
├── lib/
│   └── utils.ts                 # cn() utility (clsx + tailwind-merge)
├── public/                      # Static assets (icons, images)
├── styles/                      # Additional stylesheets
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js config
├── tsconfig.json                # TypeScript config
├── postcss.config.mjs           # PostCSS + Tailwind plugin
└── package.json
```

## Architecture

### Navigation / Routing

The app uses a **single-page client-side view router** (not Next.js file-based routing). All navigation is handled in `components/MainLayout.tsx`:

- `ViewType` union type defines available views: `'dashboard' | 'analytics' | 'hr' | 'cotton' | 'energy' | 'maintenance' | 'quality'`
- `activeView` state + `renderView()` switch statement controls which view is displayed
- Sidebar renders navigation from a `views` array with `{ id, name, icon }` entries

### Data Flow

- `hooks/useFactoryData.ts` is the central data source — it exports a custom hook returning all factory data
- Data is initialized with hardcoded mock values in `useEffect`
- Real-time simulation updates data every 3 seconds via `setInterval`
- No external API calls, no database, no server-side data fetching
- State management is local (`useState` only) — no Redux, Zustand, or Context

### Key Interfaces (in `hooks/useFactoryData.ts`)

- `Machine` — production machine with status, rates, temperature, RPM
- `WorstMachine` — machines flagged for poor performance
- `HRData` — employee records with shifts, performance, salary
- `AIData` — cotton mixing batch data with quality predictions
- `ProductionOrder` — order tracking with progress
- `MaintenanceData` — maintenance schedule entries

Machine status values: `'hoạt động'` (active), `'bảo trì'` (maintenance), `'lỗi'` (error), `'dừng'` (stopped)

## Code Conventions

### File & Component Naming

- **PascalCase** for React component files: `MainLayout.tsx`, `KPICard.tsx`, `Dashboard.tsx`
- **camelCase** for hook files: `useFactoryData.ts`
- **kebab-case** for shadcn/ui primitives: `dropdown-menu.tsx`, `alert-dialog.tsx`
- Components use `export default function ComponentName()` pattern

### Imports

Order: React/standard → third-party libraries → `@/` aliased internal imports

```tsx
import { useState, useEffect } from 'react'
import { BarChart3, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useFactoryData } from '@/hooks/useFactoryData'
import { cn } from '@/lib/utils'
```

Path alias: `@/*` maps to project root (configured in `tsconfig.json`)

### Client Components

All interactive components must include `'use client'` directive at the top of the file. The root layout is a server component; everything below `MainLayout` is client-rendered.

### Styling Patterns

- **Tailwind utility classes inline** — no separate CSS modules
- Dark theme is the default (`bg-slate-950`, `text-white` on body)
- Color palette: slate-800/900/950 for backgrounds, blue-600 for active states
- Use `cn()` from `@/lib/utils` for conditional class merging
- Status-to-color mapping objects for dynamic styling:
  ```tsx
  const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
    'hoạt động': { bg: 'bg-green-900', text: 'text-green-200', border: 'border-green-700' },
    'lỗi': { bg: 'bg-red-900', text: 'text-red-200', border: 'border-red-700' },
  }
  ```

### State Updates

Immutable update pattern for arrays:
```tsx
setData(prev => prev.map(item =>
  item.id === targetId ? { ...item, field: newValue } : item
))
```

### Modal/Dialog Pattern

Detail dialogs use fixed-position overlays:
```tsx
if (!open) return null
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-slate-900 border border-slate-800 rounded-lg ...">
      {/* content */}
    </div>
  </div>
)
```

### User-Facing Text

All user-visible text is in **Vietnamese**. Keep all labels, messages, and UI strings in Vietnamese when adding or modifying features.

## How to Add a New Feature View

1. **Create the view component** in `components/views/NewView.tsx`:
   ```tsx
   'use client'
   import { useFactoryData } from '@/hooks/useFactoryData'
   export default function NewView() { ... }
   ```

2. **Add the view ID** to `ViewType` union in `components/MainLayout.tsx`

3. **Add an entry** to the `views` array in `MainLayout.tsx` with `{ id, name, icon }`

4. **Add a case** to the `renderView()` switch in `MainLayout.tsx`

5. **Add data** to `hooks/useFactoryData.ts` if the view needs new data types

## shadcn/ui Components

- Configured with **new-york** style, CSS variables, neutral base color
- Components live in `components/ui/` and are generated — avoid hand-editing them
- To add new shadcn components, use the CLI: `npx shadcn@latest add <component>`
- Icon library: Lucide (`lucide-react`)

## Build Configuration Notes

- `next.config.mjs`: TypeScript build errors are **ignored** (`ignoreBuildErrors: true`)
- `next.config.mjs`: Image optimization is **disabled** (`unoptimized: true`)
- No CI/CD pipelines configured
- No test framework configured
- No pre-commit hooks configured
- No `.eslintrc` config file — `npm run lint` uses Next.js defaults

## Important Caveats

- There is **no backend** — all data is mock/simulated in `useFactoryData.ts`
- The `components/ui/` directory contains ~55 auto-generated shadcn/ui components; do not modify these files directly
- TypeScript errors do not block builds — be careful to maintain type safety manually
- The app is dark-mode only (hardcoded `className="dark"` on `<html>`)
