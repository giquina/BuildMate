# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Claude Code Operating Rules

1. **First think through the problem**, read the codebase for relevant files, and write a plan using TodoWrite tool.
2. **The plan should have a list of todo items** that you can check off as you complete them.
3. **Before you begin working**, check in with me and I will verify the plan.
4. **Then, begin working on the todo items**, marking them as complete as you go.
5. **Every step of the way**, give me a high-level summary of the changes you made.
6. **Make every code/task change as simple as humanly possible**. Avoid broad refactors.
7. **Finally, add a review section** to the `todo.md` file summarizing what you did.
8. **DO NOT BE LAZY. NO HALF FIXES.** Find the root cause and fix it properly.
9. **Minimize the code impact of every change**. Simplicity always wins.

## Project Overview
BuildMate AI is a UK-focused construction platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides smart floorplan generation, materials marketplace, and professional networking for both residential and commercial markets. The platform serves homeowners, self-builders, property developers, and business property owners seeking commercial property optimization.

**IMPORTANT**: The platform officially uses "BuildMate AI" branding to emphasize intelligent automation capabilities. However, user-facing copy should emphasize "smart" and "intelligent" features to make the platform accessible to general users unfamiliar with AI terminology.

## Core Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library in `src/components/ui/`
- **API**: Next.js API routes for backend functionality
- **Authentication**: Mock authentication system with UserContext provider
- **Integration**: OpenAI (mocked), Supabase, Stripe, Replicate (active)
- **Performance**: Custom React hooks with stable references to prevent re-renders

### Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navigation + UserProvider
│   ├── page.tsx                 # Homepage with residential/commercial toggle
│   ├── globals.css              # Global styles + animations
│   ├── pricing/page.tsx         # Residential pricing plans (force-static)
│   ├── configure/page.tsx       # Smart image generation & style selection
│   ├── materials/page.tsx       # Materials marketplace with UK suppliers
│   ├── professionals/page.tsx   # Verified UK professionals network
│   ├── dashboard/page.tsx       # User-specific project management dashboard
│   ├── review/page.tsx          # Project review and assembly
│   ├── wishlist/page.tsx        # User wishlist with authentication integration
│   ├── commercial/              # Commercial B2B platform
│   │   ├── page.tsx            # Commercial landing page with B2B focus
│   │   ├── configure/page.tsx   # Business property questionnaire
│   │   ├── solutions/page.tsx   # Optimization recommendations
│   │   └── pricing/page.tsx     # Business subscription tiers
│   ├── account/                 # User account management
│   │   ├── settings/page.tsx    # Account settings, notifications, privacy
│   │   └── profile/page.tsx     # User profile with project activity
│   └── api/                     # API routes (see API Architecture section)
├── components/ui/               # Reusable component library
├── contexts/                    # React Context providers
├── lib/                         # Utilities and configurations
└── types/                       # TypeScript type definitions
```

### Key Page Flows

**Residential Flows**:
1. **Homepage (`/`)** → User education and trust building with residential/commercial toggle
2. **Authentication Flow** → Login/register via AuthModal with demo credentials
3. **Configure (`/configure`)** → Smart image generation + style selection
4. **Materials (`/materials`)** → UK supplier integration and shopping
5. **Professionals (`/professionals`)** → Verified professional matching
6. **Review (`/review`)** → Project assembly and final confirmation
7. **Dashboard (`/dashboard`)** → User-specific project management and activity

**Commercial B2B Flows**:
1. **Commercial Landing (`/commercial`)** → B2B value proposition with ROI focus
2. **Property Assessment (`/commercial/configure`)** → Business property questionnaire and analysis
3. **Solution Recommendations (`/commercial/solutions`)** → Optimization strategies by category
4. **Commercial Pricing (`/commercial/pricing`)** → Business subscription tiers and features

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
```

### Pre-deployment Checklist
Always run before committing or deploying:
```bash
npm run type-check && npm run lint && npm run build
```

### Path Aliases (tsconfig.json)
The project uses TypeScript path aliases for cleaner imports:
```typescript
// Available path aliases:
import { Button } from '@/components/ui'     // -> ./src/components/ui
import { ukUtils } from '@/lib/uk-utils'     // -> ./src/lib/uk-utils
import { User } from '@/types/user'          // -> ./src/types/user
```

### Development Workflow
1. Always run `npm run type-check` before committing code changes
2. Use `npm run lint` to maintain code quality standards
3. Test UI changes across mobile/desktop breakpoints
4. Verify construction industry context in all features
5. Test authentication flows with demo credentials (`demo@buildmate.co.uk` / `demo123`)
6. Verify user-specific features work correctly (dashboard, projects, wishlist)
7. Test protected routes and authentication guards

## Construction Industry Context

### UK-Specific Considerations

**Residential Considerations**:
- **Building Regulations**: Current UK compliance requirements
- **Planning Permission**: Permitted development vs. full applications
- **Regional Pricing**: London vs. regional cost variations
- **Professional Standards**: RIBA, NHBC, FMB certifications
- **VAT Handling**: Zero-rated new builds vs. standard-rated renovations

**Commercial Building Regulations**:
- **EPC Requirements**: Minimum Energy Performance Certificate rating of E for commercial lettings
- **MEES Compliance**: Minimum Energy Efficiency Standards with C rating requirement by 2027
- **Building Safety Act**: Enhanced safety requirements for commercial high-rise buildings

### User Personas

**Residential Users**:
- **Homeowners**: First-time builders, extension planners
- **Self-Builders**: Experienced DIY enthusiasts
- **Property Developers**: Residential development projects
- **Professionals**: Architects, builders, tradespeople

**Commercial B2B Users**:
- **Business Property Owners**: Small to medium enterprises seeking property optimization
- **Facility Managers**: Corporate real estate and facility management teams
- **Commercial Property Developers**: Large-scale commercial development projects

## Smart Image Generation System

### Replicate Integration (ACTIVE)
The platform uses Replicate + SDXL for professional architectural rendering:

**API Endpoint**: `/api/generate-image`
- **Model**: `stability-ai/sdxl` with expert ensemble refiner
- **Cost**: ~£0.002 per image (very affordable)
- **Quality**: Professional photography quality, 1024x768px
- **Styles**: Modern, Traditional, Contemporary, Victorian UK architecture

**Environment Setup**:
- Requires `REPLICATE_API_TOKEN` in environment variables
- Already configured for all Vercel environments (production/preview/development)
- Falls back gracefully if API fails

### User Experience Flow
1. User visits `/configure` page
2. Shows "Images: 1/4 generating..." with loading spinners
3. Images generate in parallel (15-30 seconds each)
4. User selects preferred architectural style
5. Selection saved and passed to materials page

## User Authentication System

### Architecture Overview
BuildMate implements a comprehensive mock authentication system using React Context for state management. The system is designed to simulate a full authentication flow while maintaining type safety and user experience standards.

### Core Components

**UserContext Provider (`src/contexts/UserContext.tsx`)**:
- Centralized authentication state management
- Mock backend simulation with localStorage session persistence
- Custom hooks for user projects and wishlist management
- Type-safe authentication methods with proper error handling

**AuthModal Component (`src/components/ui/AuthModal.tsx`)**:
- Unified login/register modal with tab-based interface
- Form validation and error handling
- Demo credentials prominently displayed for development
- Responsive design optimized for mobile and desktop

### Demo Credentials
For development and testing, the system includes built-in demo credentials:
- **Email**: `demo@buildmate.co.uk`
- **Password**: `demo123`
- **Mock User**: John Smith with Pro subscription and sample project data

## Component Development Guidelines

### UI Component Patterns
- All components export from `src/components/ui/index.ts`
- Support multiple variants (size, color, state)
- Include proper TypeScript interfaces for props
- Implement accessibility features (ARIA, keyboard navigation)
- Follow naming convention: `ComponentName`, `ComponentVariant`

### Animation Standards
- Use CSS transforms for performance
- Duration: 200-300ms for interactions
- Easing: Professional, subtle effects
- Classes: `.animate-float`, `.animate-slide-up`, `.card-hover-lift`

### Responsive Design
- Mobile-first approach (construction professionals use mobile on-site)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions (minimum 44px touch targets)
- Progressive enhancement for desktop features

## API Development

### Endpoint Patterns
- Use Next.js API routes in `src/app/api/`
- Implement proper error handling with status codes
- Include TypeScript interfaces for request/response
- Mock external APIs during development (OpenAI, supplier APIs)

### Core API Routes
```
src/app/api/
├── ai/generate/              # Smart floorplan generation (OpenAI integration)
├── generate-image/           # Smart image generation (Replicate/SDXL - ACTIVE)
├── algorithms/
│   ├── optimize-timeline/    # Construction timeline optimization
│   ├── match-professionals/  # Professional matching algorithm
│   ├── budget-optimize/      # Cost optimization algorithms
│   ├── recommend-materials/  # Material recommendation engine
│   └── predict-costs/        # UK construction cost prediction
├── commercial/               # Commercial B2B platform APIs
│   ├── property-assessment/  # Business property evaluation
│   ├── roi-calculation/      # ROI and energy savings calculations
│   ├── solutions/           # Commercial optimization recommendations
│   └── pricing/             # Commercial subscription tiers
```

### API Design Patterns
- All routes return consistent `{ success: boolean, data?: any, error?: string }` format
- UK construction industry specific algorithms and data
- Proper error handling with construction context
- Mock data for development, real APIs for production integration

### Active API Integrations
- **Replicate SDXL**: Live image generation for architectural renders (~£0.002 per image)
- **Supabase**: Database integration (configured but using mock data for development)
- **Stripe**: Payment processing (configured but not active)
- **OpenAI**: Smart floorplan generation (mocked for development)

## Code Quality Standards

### TypeScript Usage
- Avoid `any` types - use proper interfaces
- Define interfaces for all API responses and component props
- Use utility types (Partial, Pick, Omit) where appropriate
- Implement type guards for runtime validation

### Component Architecture
- Single responsibility principle
- Reusable components with clear interfaces
- Consistent naming and file organization
- Proper separation of concerns (UI vs. business logic)

## Agent System

BuildMate includes a sophisticated **72-agent hierarchy system** with 18 parent agents and 54 specialized sub-agents for enhanced development efficiency (located in `.claude/agents/`):

### Executive Leadership (Tier 1)
- **product-manager**: Senior Product Manager with oversight of all BuildMate development
- **system-architecture**: Senior System Architecture agent for technical decisions
- **ux-ui-designer**: Senior UX/UI Designer for user experience leadership

### Implementation Teams (Tier 3)
- **frontend-engineering**: React/Next.js implementation specialist
- **backend-engineering**: API development and database architecture
- **security-analyst**: Enterprise-grade security and UK GDPR compliance

### Quality & Deployment (Tier 4)
- **qa-testing**: Comprehensive testing strategies and quality assurance
- **devops**: Deployment automation, CI/CD pipelines, and production management

### Specialized Support Agents
Each specialized support agent has 3 sub-agents for enhanced delegation:
- **ui-specialist**: Visual design expert
- **ux-specialist**: User experience specialist
- **construction-expert**: UK building regulations specialist
- **react-code-reviewer**: TypeScript/React code quality reviewer
- **docs-maintainer**: Technical documentation specialist
- **performance-optimizer**: Next.js performance optimization expert
- **api-validator**: API endpoint validation expert
- **type-checker**: TypeScript type validation specialist
- **vercel-deployment-specialist**: Vercel deployment expert

**Total System**: 72 agents (18 parent + 54 sub-agents) active and operational

## Deployment & Production

### Vercel Deployment
- **Production URL**: https://build-mate-mu.vercel.app
- **Repository**: https://github.com/giquina/BuildMate
- **Auto-deployment**: Enabled from `main` branch
- **Environment Variables**: Configured for all environments

### Critical Environment Variables
```bash
# Required for production
REPLICATE_API_TOKEN=r8_xxx...        # Smart image generation (ACTIVE)
NEXT_PUBLIC_SUPABASE_URL=xxx         # Database connection
SUPABASE_SERVICE_ROLE_KEY=xxx        # Server-side database access
OPENAI_API_KEY=xxx                   # Smart floorplan generation
STRIPE_SECRET_KEY=xxx                # Payment processing
```

### Build Performance
- Bundle size limits: JS (200kb gzipped), CSS (50kb gzipped)
- Performance budget enforced via `bundlesize` package
- Lighthouse scoring optimized for construction industry usage

## Testing Strategy

### Testing Framework
**Note**: No automated test framework is currently configured in package.json. Testing is primarily manual and relies on:
- TypeScript compilation checks (`npm run type-check`)
- ESLint code quality validation (`npm run lint`)
- Build verification (`npm run build`)
- Manual browser testing across devices

### Manual Testing Checklist
1. Authentication flows with demo credentials (`demo@buildmate.co.uk` / `demo123`)
2. Commercial/residential toggle functionality
3. Smart image generation on `/configure` page
4. User dashboard and project management
5. Wishlist functionality across sessions
6. Mobile responsiveness across all pages
7. TypeScript compilation and build success

## Critical Development Notes

### Performance Hook Usage
The `usePerformanceMonitoring` hook uses `useCallback` and `useRef` to prevent re-renders:
```typescript
const { onMount, measureOperation } = usePerformanceMonitoring('ComponentName')
// Functions are stable - safe to use in useEffect dependencies
```

### Terminology Guidelines
- **Platform Branding**: "BuildMate AI" (official brand name)
- **User-Facing Features**: Emphasize "smart", "intelligent", "automated", "advanced"
- **Marketing Copy**: "AI-powered", "AI-generated", "AI insights" for technical accuracy
- **Function Names**: `generateAISuggestions`, `aiInsights`, `aiRecommendation` (technical precision)
- **Navigation & Headers**: "BuildMate AI" for brand consistency

### Authentication Hook Usage
The authentication system uses custom hooks with proper dependency management:
```typescript
const { user, isAuthenticated, login, logout } = useUser()
const { projects, saveProject, updateProject } = useUserProjects()
const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
// All hooks return stable references - safe for useEffect dependencies
```

### Mock Authentication Development
- Use demo credentials: `demo@buildmate.co.uk` / `demo123`
- Session persisted in localStorage for development convenience
- All user data is mock data for development/testing
- Forms validate UK-specific formats (postcodes, phone numbers)

### Stability Considerations
- Avoid complex webpack optimizations that can cause module loading errors
- Use minimal Next.js experimental features to prevent runtime issues
- Ensure all React hooks have stable dependencies to prevent Fast Refresh errors
- Test development server stability after major changes
- Authentication context should be wrapped at root level in layout.tsx

## Documentation Structure

This repository uses a structured documentation approach:

### Core Documentation Files
- **CLAUDE.md** (this file): Development guidance for Claude Code
- **RULES.md**: Essential development rules and coding standards
- **README.md**: Project overview and getting started guide

### Strategic Direction
- **MARKET-RESEARCH-DIRECTION.md**: Strategic vision and £45B UK market opportunity
- **WEBSITE-IMPLEMENTATION-PLAN.md**: Detailed plan for implementing market research insights

### Key Strategic Context
BuildMate AI targets the **£45 billion UK construction market** through:
- **Speed**: 8-week delivery vs. 18-month traditional timelines (85% reduction)
- **Cost**: 20-40% savings through AI optimization and transparent pricing
- **Trust**: Solving the 78% budget overrun problem with guaranteed costs
- **Scale**: Serving 341,000 annual first-time buyers and 7 million renovation projects

**Always reference MARKET-RESEARCH-DIRECTION.md for strategic context when building features.**

When working on this codebase, always consider the construction industry context, UK market requirements, user authentication requirements, and the needs of professional users who rely on the platform for significant financial decisions.