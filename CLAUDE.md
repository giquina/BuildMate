# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
BuildMate AI is a UK-focused construction platform built with Next.js 14, TypeScript, and Tailwind CSS. It targets the **£45 billion UK construction market** by providing smart floorplan generation, materials marketplace, professional networking, and revolutionary partnership integrations for both residential and commercial markets. The platform demonstrates **£497K monthly revenue** through its partnership ecosystem.

**Strategic Context**: BuildMate solves the 78% budget overrun problem and 90% project delay issues in UK construction through AI-powered optimization, delivering 85% time reduction and 20-40% cost savings. The platform features strategic partnerships with Trigrr Building OS, Boxabl foldable homes, Volferda luxury pods, B&Q Trade, and Colliers commercial intelligence.

## Core Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0 with strict typing (no `any` types)
- **Styling**: Tailwind CSS 3.3 with Tesla-inspired design system
- **UI Components**: Custom component library in `src/components/ui/` (15+ professional components)
- **API**: Next.js API routes for backend functionality
- **Authentication**: Mock authentication system with UserContext provider
- **Integration**: Replicate (ACTIVE), Supabase, Stripe, OpenAI, MCP SDK 1.17.0
- **Performance**: Custom React hooks with stable references to prevent re-renders
- **Icons**: Lucide React 0.292 for consistent UI icons

### Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navigation + UserProvider
│   ├── page.tsx                 # Homepage with residential/commercial toggle
│   ├── globals.css              # Global styles + animations
│   ├── pricing/page.tsx         # Residential pricing plans (force-static)
│   ├── configure/page.tsx       # Smart image generation & style selection
│   ├── materials/page.tsx       # Materials marketplace with B&Q Trade integration
│   ├── professionals/page.tsx   # Verified UK professionals network
│   ├── dashboard/page.tsx       # User-specific project management dashboard
│   ├── review/page.tsx          # Project review and assembly
│   ├── wishlist/page.tsx        # User wishlist with authentication integration
│   ├── smart-homes/page.tsx     # Trigrr Building OS integration showcase
│   ├── modular-homes/page.tsx   # Boxabl foldable homes configurator
│   ├── luxury-pods/page.tsx     # Volferda capsule houses showcase
│   ├── commercial-real-estate/page.tsx # Colliers intelligence platform
│   ├── commercial/              # Commercial B2B platform
│   │   ├── page.tsx            # Commercial landing page with ROI focus
│   │   ├── configure/page.tsx   # Business property questionnaire
│   │   ├── solutions/page.tsx   # Optimization recommendations (30-50% energy savings)
│   │   └── pricing/page.tsx     # Business subscription tiers
│   ├── account/                 # User account management
│   │   ├── settings/page.tsx    # Account settings, notifications, privacy
│   │   └── profile/page.tsx     # User profile with project activity
│   └── api/                     # API routes (see API Architecture section)
├── components/ui/               # Reusable component library (15+ components)
├── contexts/                    # React Context providers
├── lib/                         # Utilities and configurations
└── types/                       # TypeScript type definitions
```

## Development Commands

### Essential Commands
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build with static generation
npm run lint         # ESLint code quality check
npm run type-check   # TypeScript compilation check
npm run start        # Start production server
```

### Performance Analysis Commands
```bash
npm run build:analyze      # Build with bundle analyzer
npm run analyze:size       # Analyze bundle size
npm run analyze:deps       # Check unused dependencies
npm run perf:audit         # Full performance audit (type-check + lint + build)
npm run perf:lighthouse    # Run Lighthouse performance test
npm run perf:budget        # Check bundle size limits
```

### Pre-deployment Checklist
**Always run before committing or deploying:**
```bash
npm run type-check && npm run lint && npm run build
```

### Path Aliases (tsconfig.json)
```typescript
// Available path aliases:
import { Button } from '@/components/ui'     // -> ./src/components/ui
import { ukUtils } from '@/lib/uk-utils'     // -> ./src/lib/uk-utils
import { User } from '@/types/user'          // -> ./src/types/user
```

## Key Page Flows

### Residential Flows
1. **Homepage (`/`)** → User education and trust building
2. **Authentication Flow** → Login/register via AuthModal (demo: `demo@buildmate.co.uk` / `demo123`)
3. **Configure (`/configure`)** → Smart image generation + style selection
4. **Materials (`/materials`)** → UK supplier integration and shopping
5. **Professionals (`/professionals`)** → Verified professional matching
6. **Review (`/review`)** → Project assembly and final confirmation
7. **Dashboard (`/dashboard`)** → User-specific project management

### Commercial B2B Flows
1. **Commercial Landing (`/commercial`)** → B2B value proposition with ROI focus
2. **Property Assessment (`/commercial/configure`)** → Business property questionnaire
3. **Solution Recommendations (`/commercial/solutions`)** → Optimization strategies (30-50% energy cost reduction)
4. **Commercial Pricing (`/commercial/pricing`)** → Business subscription tiers (£99-499/month)

## Construction Industry Context

### UK-Specific Considerations

**Residential Considerations**:
- **Building Regulations**: Current UK compliance requirements
- **Planning Permission**: Permitted development vs. full applications
- **Regional Pricing**: London vs. regional cost variations (£1,200-3,000/m²)
- **Professional Standards**: RIBA, NHBC, FMB certifications
- **VAT Handling**: Zero-rated new builds vs. standard-rated renovations

**Commercial Building Regulations**:
- **EPC Requirements**: Minimum Energy Performance Certificate rating of E
- **MEES Compliance**: Minimum Energy Efficiency Standards (C rating by 2027)
- **Building Safety Act**: Enhanced safety requirements for commercial buildings
- **ROI Targets**: 30-50% energy cost reduction, 2-4 year payback periods

### User Personas

**Residential Users**:
- **Homeowners**: First-time builders, extension planners (341,000 annually)
- **Self-Builders**: Experienced DIY enthusiasts
- **Property Developers**: Residential development projects
- **Professionals**: Architects, builders, tradespeople

**Commercial B2B Users**:
- **Business Property Owners**: SMEs seeking property optimization
- **Facility Managers**: Corporate real estate teams
- **Commercial Property Developers**: Large-scale projects (£148.80B market)

## Smart Image Generation System

### Replicate Integration (ACTIVE)
**API Endpoint**: `/api/generate-image`
- **Model**: `stability-ai/sdxl` with expert ensemble refiner
- **Cost**: ~£0.002 per image (very affordable)
- **Quality**: Professional photography quality, 1024x768px
- **Styles**: Modern, Traditional, Contemporary, Victorian UK architecture
- **Environment**: Requires `REPLICATE_API_TOKEN` (configured in Vercel)

### User Experience Flow
1. User visits `/configure` page
2. Shows "Images: 1/4 generating..." with loading spinners
3. Images generate in parallel (15-30 seconds each)
4. User selects preferred architectural style
5. Selection saved and passed to materials page

## User Authentication System

### Core Components
**UserContext Provider (`src/contexts/UserContext.tsx`)**:
- Centralized authentication state management
- Mock backend simulation with localStorage persistence
- Custom hooks: `useUser()`, `useUserProjects()`, `useWishlist()`
- Type-safe authentication methods

**Demo Credentials**:
- **Email**: `demo@buildmate.co.uk`
- **Password**: `demo123`
- **Mock User**: John Smith with Pro subscription

## Partnership Ecosystem

### Strategic Partnerships
- **Trigrr Building OS**: Smart building control for 80,000+ devices
- **Boxabl Foldable Homes**: £50K Casita with 2-hour assembly
- **Volferda Luxury Pods**: £85K-£195K space-age accommodation
- **B&Q Trade**: 2.8% commission, real-time pricing, bulk discounts
- **Colliers Commercial**: Live deal flow and market intelligence

### Partnership Integration Components
- `PartnershipShowcase.tsx`: Live metrics dashboard (£497K monthly revenue)
- `BulkOrderingSystem.tsx`: Complete bulk ordering with payment options
- `CustomerSuccessStories.tsx`: 6 detailed case studies with ROI metrics
- `MetricsDashboard.tsx`: Real-time business metrics

## Component Development Guidelines

### Key UI Components (15+ Professional Components)
- `BulkOrderingSystem.tsx`: B&Q Trade bulk ordering integration
- `CustomerSuccessStories.tsx`: Success stories with metrics
- `PartnershipShowcase.tsx`: Partnership revenue dashboard
- `EnhancedCommercialToggle.tsx`: Improved commercial/residential toggle
- `MetricsDashboard.tsx`: Business KPI tracking
- `WelcomeFlow.tsx`: User onboarding system
- `ErrorBoundary.tsx`: Production error handling
- `LoadingSpinner.tsx` & `SkeletonLoader.tsx`: Loading states
- `Toast.tsx`: User notification system

### UI Component Patterns
- Export all components from `src/components/ui/index.ts`
- Support multiple variants (size, color, state)
- Include proper TypeScript interfaces
- Implement accessibility (ARIA, keyboard navigation)
- Naming convention: `ComponentName`, `ComponentVariant`

### Animation Standards
- Duration: 200-300ms for interactions
- Easing: Professional, subtle effects
- Use CSS transforms for performance
- Classes: `.animate-float`, `.animate-slide-up`, `.card-hover-lift`

### Responsive Design
- Mobile-first approach (construction professionals use mobile on-site)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly: minimum 44px touch targets
- Progressive enhancement for desktop

## API Architecture

### Core API Routes
```
src/app/api/
├── generate-image/           # Smart image generation (Replicate/SDXL - ACTIVE)
├── ai/generate/              # Smart floorplan generation (OpenAI - mocked)
├── algorithms/
│   ├── optimize-timeline/    # Construction timeline optimization
│   ├── match-professionals/  # Professional matching algorithm
│   ├── budget-optimize/      # Cost optimization algorithms
│   ├── recommend-materials/  # Material recommendation engine
│   └── predict-costs/        # UK construction cost prediction
├── materials/
│   ├── bq-affiliate/         # B&Q Trade integration (2.8% commission)
│   ├── bulk-pricing/         # Bulk discount calculations (8-22% tiers)
│   └── stock-check/          # Real-time stock availability
├── commercial/               # Commercial B2B platform APIs
│   ├── property-assessment/  # Business property evaluation
│   ├── roi-calculation/      # ROI and energy savings calculations
│   ├── solutions/           # Commercial optimization recommendations
│   └── pricing/             # Commercial subscription tiers
```

### API Design Patterns
- Return format: `{ success: boolean, data?: any, error?: string }`
- UK construction industry specific algorithms
- Proper error handling with construction context
- Mock data for development, real APIs for production

## Code Quality Standards

### TypeScript Usage
- **Never use `any` types** - define proper interfaces
- Export types with components for reusability
- Use utility types (Partial, Pick, Omit) appropriately
- Implement type guards for runtime validation
- Run `npm run type-check` before committing

### Performance Hook Patterns
```typescript
// Stable references to prevent re-renders:
const { onMount, measureOperation } = usePerformanceMonitoring('ComponentName')
const { user, isAuthenticated, login, logout } = useUser()
const { projects, saveProject, updateProject } = useUserProjects()
// Functions are stable - safe to use in useEffect dependencies
```

## Agent System

BuildMate includes a sophisticated **72-agent hierarchy system** (18 parent agents + 54 specialized sub-agents) located in `.claude/agents/`:

### Executive Leadership
- **product-manager**: Senior Product Manager with oversight
- **system-architecture**: Technical architecture decisions
- **ux-ui-designer**: User experience leadership

### Implementation Teams
- **frontend-engineering**: React/Next.js implementation
- **backend-engineering**: API and database architecture
- **security-analyst**: Security and UK GDPR compliance
- **qa-testing**: Comprehensive testing strategies
- **devops**: Deployment automation and CI/CD

### Specialized Support Agents
Each parent agent has 3 sub-agents for enhanced delegation:
- **ui-specialist**, **ux-specialist**: Design excellence
- **construction-expert**: UK building regulations
- **performance-optimizer**: Next.js optimization
- **type-checker**: TypeScript validation
- **vercel-deployment-specialist**: Deployment expertise

**Total**: 72 agents for comprehensive development support

## Deployment & Production

### Vercel Deployment
- **Production URL**: https://build-mate-mu.vercel.app
- **Repository**: https://github.com/giquina/BuildMate
- **Auto-deployment**: Enabled from `main` branch

### Critical Environment Variables
```bash
REPLICATE_API_TOKEN=r8_xxx...        # Smart image generation (ACTIVE)
NEXT_PUBLIC_SUPABASE_URL=xxx         # Database connection
SUPABASE_SERVICE_ROLE_KEY=xxx        # Server-side database access
OPENAI_API_KEY=xxx                   # Smart floorplan generation
STRIPE_SECRET_KEY=xxx                # Payment processing
```

### Build Performance
- Bundle size limits: JS (200kb gzipped), CSS (50kb gzipped)
- Performance budget enforced via `bundlesize` package
- Lighthouse scoring optimized for construction industry

## Testing Strategy

**Note**: No automated test framework configured. Testing relies on:
- TypeScript compilation checks (`npm run type-check`)
- ESLint validation (`npm run lint`)
- Build verification (`npm run build`)
- Manual browser testing

### Manual Testing Checklist
1. Authentication flows with demo credentials
2. Commercial/residential toggle functionality
3. Smart image generation on `/configure`
4. User dashboard and project management
5. Wishlist functionality across sessions
6. Partnership integrations (Trigrr, Boxabl, Volferda, B&Q Trade)
7. Bulk ordering system with discount tiers
8. Mobile responsiveness across all new pages
9. TypeScript compilation success

## Critical Development Notes

### Terminology Guidelines
- **Platform Branding**: "BuildMate AI" (official)
- **User-Facing Features**: "smart", "intelligent", "automated"
- **Marketing Copy**: "AI-powered", "AI-generated", "AI insights"
- **Function Names**: `generateAISuggestions`, `aiInsights`

### Revenue Model Context
Development should consider multiple revenue streams:
- **Marketplace Commissions**: 10-15% on materials
- **Professional Subscriptions**: £99-499/month
- **Lead Generation**: £50-200 per qualified lead
- **Commercial B2B Focus**: Enterprise subscriptions for property optimization

### Platform Metrics (Demonstrated)
- **Monthly Revenue**: £497K through partnership ecosystem
- **B&Q Affiliate Earnings**: £13,947 monthly (2.8% commission)
- **Completed Projects**: 2,847 with 4.9/5 satisfaction rating
- **Cost Savings**: £89K average per project
- **Time Savings**: 68% reduction in project timelines

### Strategic Targets (Year 1)
- 10,000 active users
- 500 completed projects
- £5M transaction volume
- Focus on solving 78% budget overrun problem

## Documentation Structure

- **CLAUDE.md** (this file): Development guidance for Claude Code
- **RULES.md**: Essential development rules and coding standards
- **README.md**: Project overview and getting started
- **MARKET-RESEARCH-DIRECTION.md**: Strategic vision and £45B market opportunity
- **WEBSITE-IMPLEMENTATION-PLAN.md**: Detailed implementation roadmap

When working on this codebase, always consider the construction industry context, UK market requirements, commercial B2B opportunities, and the needs of professional users making significant financial decisions.