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
BuildMate is a UK-focused construction platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides smart floorplan generation, materials marketplace, and professional networking for both residential and commercial markets. The platform serves homeowners, self-builders, property developers, and now business property owners seeking commercial property optimization.

**IMPORTANT**: The platform officially uses "BuildMate AI" branding to emphasize intelligent automation capabilities. However, user-facing copy should emphasize "smart" and "intelligent" features to make the platform accessible to general users unfamiliar with AI terminology.

## Commercial B2B Platform Extension

BuildMate's Commercial B2B platform extension represents a major market expansion that doubles the platform's addressable market by targeting business property owners. The commercial section focuses on property optimization for energy efficiency, smart technology integration, compliance, and ROI maximization.

### Commercial Architecture Overview

The commercial platform extends BuildMate's core architecture to support business property optimization alongside residential construction. The commercial section operates as a seamless extension of the main platform while providing specialized business-focused functionality.

**Commercial User Journey Pages**:
- **`/commercial`**: Commercial landing page with B2B value proposition and ROI focus
- **`/commercial/configure`**: Business property questionnaire and assessment system
- **`/commercial/solutions`**: Optimization recommendations categorized by property type and solution area
- **`/commercial/pricing`**: Business subscription tiers with commercial-specific features and pricing

**Commercial/Residential Toggle System**:
The platform implements a homepage toggle system allowing users to select between residential and commercial experiences. Users can choose between "🏠 Build Your Home" (residential construction) and "🏢 Optimize Your Property" (commercial real estate optimization). This toggle is implemented through the `CommercialToggle` component and maintains user preference throughout the session.

**Commercial Property Optimization Focus**:
The commercial platform focuses on **"Optimize Your Property"** messaging, targeting business property owners seeking to maximize their commercial real estate investments. The platform emphasizes measurable business outcomes including:
- **Energy Cost Reduction**: 30-50% savings on commercial energy bills (£15K-£100K annually)
- **Property Value Enhancement**: 8-15% increase in commercial property values
- **ROI Optimization**: 2-4 year payback periods on efficiency investments
- **UK Commercial Compliance**: EPC rating improvements, MEES compliance, Building Safety Act adherence
- **Tenant Satisfaction**: 25% improvement in occupancy and retention rates
- **Smart Building Technology**: IoT integration, automated systems, energy monitoring

**UK Commercial Real Estate Market Context** (2025):
- Market size: £148.80 billion growing to £177.40 billion by 2030 (3.58% CAGR)
- Focus on portfolio diversification across logistics, retail, and regional offices
- Technology integration priority: 41% investing in digital twin technologies
- Sustainability requirements: EPC B+ ratings, solar integration, net-zero transition
- Regional opportunities beyond London: emerging logistics and mixed-use projects

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
│   ├── Navigation.tsx           # Main navigation with UserMenu integration
│   ├── AuthModal.tsx            # Login/register modal with demo credentials
│   ├── UserMenu.tsx             # User profile dropdown and account management
│   ├── Button.tsx               # Primary button component with variants
│   ├── Card.tsx                 # Card components for content layout
│   └── index.ts                 # Centralized component exports
├── contexts/                    # React Context providers
│   └── UserContext.tsx          # Authentication state management
├── lib/                         # Utilities and configurations
│   ├── uk-utils.ts              # UK-specific functions (postcodes, pricing)
│   ├── performance.ts           # Performance monitoring hooks with stable references
│   └── utils.ts                 # General utilities
├── types/                       # TypeScript type definitions
│   ├── index.ts                 # Core domain types (Project, Material, Professional)
│   └── user.ts                  # User authentication and profile types
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
8. **Account Management** → Profile settings, notifications, and privacy controls
9. **Wishlist (`/wishlist`)** → Saved materials and professionals with authentication

**Commercial B2B Flows**:
1. **Commercial Landing (`/commercial`)** → B2B value proposition with ROI focus
2. **Property Assessment (`/commercial/configure`)** → Business property questionnaire and analysis
3. **Solution Recommendations (`/commercial/solutions`)** → Optimization strategies by category
4. **Commercial Pricing (`/commercial/pricing`)** → Business subscription tiers and features
5. **ROI Dashboard** → Commercial-specific metrics and progress tracking
6. **Professional Network** → Commercial specialists and certified professionals

### Key Architectural Patterns

1. **Component System**: Centralized UI components with variants (Button, Card, Badge, etc.)
2. **Authentication System**: Context-based user state management with mock backend
3. **Type Safety**: Comprehensive TypeScript interfaces for all data structures
4. **UK Market Focus**: Specialized utilities in `uk-utils.ts` for postcodes, pricing, regulations
5. **Construction Domain**: Strong typing for projects, materials, professionals, quotes
6. **API Architecture**: RESTful endpoints with proper error handling and mock data

### Data Models

Core entities are defined in `src/types/index.ts` and `src/types/user.ts`:

**Authentication & User Types (`src/types/user.ts`)**:
- **User**: Profile data, subscription tiers (free/pro/enterprise), preferences
- **UserSession**: Authentication state and methods (login, register, logout)
- **UserPreferences**: Project types, suppliers, budget ranges, notifications, privacy
- **SavedProject**: User-specific projects with status tracking and progress
- **WishlistItem**: Saved materials and professionals with metadata

**Core Business Types (`src/types/index.ts`)**:
- **Project**: Construction types (new_build/renovation/extension), status tracking
- **Floorplan**: Smart-generated SVG data with specifications
- **Material**: UK supplier integration, categories, pricing
- **Professional**: UK trades with certifications, insurance verification
- **Quote**: Professional estimates with timeline and status

**Commercial B2B Types (Extension to `src/types/index.ts`)**:
- **CommercialProperty**: Business property types (Office, Retail, Warehouse, Hotel, Manufacturing, Healthcare)
- **PropertyOptimization**: Energy efficiency solutions, smart technology integration, compliance improvements, productivity enhancements
- **ROICalculation**: Energy savings projections, operational cost reductions, payback period analysis, productivity gains
- **CommercialSubscription**: Business tier structure with commercial-specific features and pricing
- **CommercialProfessional**: Specialized commercial contractors, energy consultants, smart building specialists
- **EnergyAudit**: Property energy assessment data and improvement recommendations
- **ComplianceReport**: UK commercial building regulation compliance status and requirements

### UI Design System

Components follow construction industry aesthetics:
- **Colors**: Professional blues, construction oranges, trust-building greens
- **Mobile-First**: Optimized for on-site construction usage
- **Animations**: Subtle, professional (200-300ms), hardware-accelerated
- **Accessibility**: WCAG compliant with proper ARIA labels

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

### Performance Commands
```bash
npm run perf:audit         # Full performance audit (type-check + lint + build)
npm run perf:lighthouse    # Run Lighthouse performance test
npm run perf:budget        # Check bundle size limits
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

### UK Commercial Market Integration

**Commercial Building Regulations**:
- **EPC Requirements**: Minimum Energy Performance Certificate rating of E for commercial lettings
- **MEES Compliance**: Minimum Energy Efficiency Standards with C rating requirement by 2027
- **Building Safety Act**: Enhanced safety requirements for commercial high-rise buildings
- **Accessibility Standards**: DDA and Equality Act compliance for commercial properties
- **Fire Safety**: Updated fire safety regulations and risk assessments

**UK Commercial Energy Market**:
- **Energy Costs**: Average £2-4 per sq ft annually across different commercial property types
- **Regional Variations**: London commercial energy costs 20-30% higher than regional averages
- **Peak Demand Pricing**: Time-of-use electricity tariffs for commercial properties
- **Carbon Reporting**: Mandatory carbon emissions reporting for large commercial properties
- **Government Incentives**: Enhanced Capital Allowances for energy-efficient equipment

**Professional Network Extension**:
- **Commercial Specialists**: MEP engineers, energy consultants, smart building integrators
- **Certification Requirements**: CIBSE membership, BREEAM assessors, LEED AP credentials
- **Insurance Standards**: Professional indemnity and public liability for commercial projects
- **Procurement Standards**: Construction Line, CHAS, SafeContractor accreditations

**ROI Calculation Framework**:
- **Energy Savings**: Quantified reductions in electricity, gas, and water consumption
- **Operational Efficiency**: Productivity gains from improved workspace design and smart systems
- **Compliance Savings**: Avoided penalties and regulatory compliance costs
- **Property Value**: Commercial property value enhancement through efficiency improvements
- **Tax Benefits**: Capital allowances and tax incentives for sustainable improvements

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
- **Energy Consultants**: Specialists in commercial energy efficiency and sustainability
- **Smart Building Professionals**: IoT, automation, and smart technology specialists

### Authentication Integration
All user personas now benefit from:
- **Personalized Experience**: Custom dashboards and project management
- **Dual Subscription Systems**: Residential and commercial tier structures
- **Saved Projects**: Persistent project data and progress tracking
- **Wishlist Functionality**: Save materials and professionals across sessions
- **Account Management**: Profile, settings, and privacy controls

**Residential Subscription Tiers**:
- **Free**: Basic features with upgrade prompts
- **Pro (£29/month)**: Enhanced residential features
- **Enterprise (£99/month)**: Full residential features with commercial access

**Commercial B2B Subscription Tiers**:
- **Business Starter (£199/month)**: Essential commercial property optimization tools (up to 3 properties)
- **Business Professional (£499/month)**: Advanced analytics, ROI tracking, and multi-property management (up to 15 properties)
- **Business Enterprise (£1,499/month)**: Complete commercial platform with dedicated support, unlimited properties, and custom integrations

### Industry Standards

**Residential Standards**:
- **Typical Costs**: Extensions £1,200-£2,500/m², new builds £1,500-£3,000/m²
- **Timeline Expectations**: Extensions 12-20 weeks, new builds 12-24+ months
- **Compliance Requirements**: Building regs, planning permission, professional certifications

**Commercial Standards**:
- **Energy Costs**: UK commercial properties average £2-4/sq ft annually for energy across different property types
- **EPC Requirements**: Minimum EPC rating of E for commercial lettings (upgrading to C by 2027 under MEES)
- **ROI Expectations**: Energy efficiency improvements typically achieve 30-50% cost savings (£15K-£100K annually)
- **Payback Periods**: Smart building technologies average 2-4 years payback with industry-leading returns
- **Property Value Impact**: Efficiency upgrades increase commercial property values by 8-15%
- **Compliance Requirements**: Building Safety Act, EPC B+ ratings, net-zero transition requirements, BREEAM standards

## Component Development Guidelines

### UI Component Patterns
- All components export from `src/components/ui/index.ts`
- Support multiple variants (size, color, state)
- Include proper TypeScript interfaces for props
- Implement accessibility features (ARIA, keyboard navigation)
- Follow naming convention: `ComponentName`, `ComponentVariant`

### Authentication Components
- **AuthModal**: Modal component for login/register with tab-based interface
- **UserMenu**: Dropdown menu with user profile, settings, and logout functionality
- **UserProvider**: Context provider wrapping the entire application in `layout.tsx`
- **useUser Hook**: Access authentication state and methods throughout the app
- **useUserProjects Hook**: Manage user-specific projects with CRUD operations
- **useWishlist Hook**: Handle user wishlist for materials and professionals

### Commercial B2B Components

**Core Commercial Components**:
- **CommercialToggle**: Homepage residential/commercial selection with preference persistence
- **ROICalculator**: UK commercial energy cost calculations with property-specific inputs
- **CommercialSolutions**: Optimization recommendations categorized by property type and solution area
- **CommercialQuestionnaire**: Business property assessment form with progressive disclosure
- **EnergyAuditDisplay**: Visual representation of energy usage and improvement opportunities
- **PaybackAnalysis**: Interactive ROI timeline and payback period visualization

**Commercial Navigation Components**:
- **CommercialNav**: Specialized navigation for commercial user flows
- **BusinessSubscriptionTier**: Commercial subscription display with upgrade prompts
- **CommercialDashboard**: Business property management interface with KPI tracking

**Commercial Form Components**:
- **PropertyTypeSelector**: Business property category selection (Office, Retail, Warehouse, etc.)
- **OptimizationGoals**: Multi-select component for energy, compliance, productivity goals
- **BudgetRangeSlider**: Commercial budget selection with business-appropriate ranges
- **ContactPreferences**: B2B communication preferences with account manager options

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

### Data Validation
- Validate UK postcodes using utilities in `uk-utils.ts`
- Sanitize user inputs for construction project data
- Implement proper error messages for construction-specific validation

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

## Comprehensive Agent Hierarchy System

BuildMate now includes a sophisticated **72-agent hierarchy system** with 18 parent agents and 54 specialized sub-agents for enhanced development efficiency (located in `.claude/agents/`):

### Executive Leadership (Tier 1)
- **product-manager**: Senior Product Manager with oversight of all BuildMate development. Coordinates and delegates to specialized agents to ensure efficient, high-quality delivery of commercial B2B features while maintaining platform integrity.
  - `stakeholder-liaison`: Stakeholder communication and requirement gathering specialist
  - `feature-prioritization`: Feature analysis and prioritization specialist
  - `market-research`: UK commercial real estate market research specialist

### Strategic Leadership (Tier 2)
- **system-architecture**: Senior System Architecture agent responsible for technical architecture decisions. Reports to Product Manager and coordinates backend/frontend implementation strategies.
  - `database-design`: Supabase schema optimization specialist
  - `api-design`: REST API architecture and integration specialist
  - `scalability-planning`: System scalability and performance architecture specialist

- **ux-ui-designer**: Senior UX/UI Designer responsible for user experience design leadership, commercial B2B interface design, and conversion optimization.
  - `user-research`: Construction industry user behavior analysis specialist
  - `design-systems`: UI component design and brand consistency specialist
  - `conversion-optimization`: A/B testing and user journey optimization specialist

### Implementation Teams (Tier 3)
- **frontend-engineering**: Senior Frontend Engineer specializing in React/Next.js implementation, component architecture, and responsive design.
  - `component-architecture`: React component systems and reusability specialist
  - `state-management`: React state, context, and hooks optimization specialist
  - `responsive-design`: Mobile-first design and cross-device compatibility specialist

- **backend-engineering**: Senior Backend Engineer responsible for API development, database architecture, and server-side functionality.
  - `api-implementation`: Next.js API routes and backend logic specialist
  - `database-optimization`: PostgreSQL/Supabase query performance specialist
  - `third-party-integration`: External API integration and data synchronization specialist

- **security-analyst**: Senior Security Analyst focusing on enterprise-grade security, UK GDPR compliance, and vulnerability assessment.
  - `authentication-security`: User authentication and access control specialist
  - `data-protection`: UK GDPR compliance and data encryption specialist
  - `vulnerability-assessment`: Security testing and penetration analysis specialist

### Quality & Deployment (Tier 4)
- **qa-testing**: Senior QA Engineer responsible for comprehensive testing strategies, quality assurance, and validation.
  - `test-automation`: Automated testing framework and CI/CD testing specialist
  - `user-acceptance`: Manual testing and user acceptance validation specialist
  - `performance-testing`: Load testing and performance validation specialist

- **devops**: Senior DevOps Engineer handling deployment automation, CI/CD pipelines, and production environment management.
  - `ci-cd-automation`: GitHub Actions and deployment automation specialist
  - `infrastructure-management`: Vercel configuration and environment management specialist
  - `monitoring-alerts`: Application monitoring and alerting systems specialist

### Specialized Support Agents (18 Total)
Each specialized support agent now has 3 sub-agents for enhanced delegation:

- **ui-specialist**: Visual design expert (3 sub-agents: `tailwind-optimization`, `design-tokens`, `accessibility-compliance`)
- **ux-specialist**: User experience specialist (3 sub-agents: `user-journey-mapping`, `interaction-design`, `usability-testing`)
- **construction-expert**: UK building regulations specialist (3 sub-agents: `uk-building-regulations`, `materials-expertise`, `professional-network`)
- **react-code-reviewer**: TypeScript/React code quality reviewer (3 sub-agents: `code-quality`, `best-practices`, `refactoring-optimization`)
- **docs-maintainer**: Technical documentation specialist (3 sub-agents: `technical-writing`, `api-documentation`, `user-guides`)
- **performance-optimizer**: Next.js performance optimization expert (3 sub-agents: `bundle-optimization`, `loading-performance`, `runtime-optimization`)
- **api-validator**: API endpoint validation expert (3 sub-agents: `endpoint-testing`, `data-validation`, `integration-testing`)
- **type-checker**: TypeScript type validation specialist (3 sub-agents: `type-definitions`, `error-resolution`, `domain-modeling`)
- **vercel-deployment-specialist**: Vercel deployment expert (3 sub-agents: `deployment-automation`, `environment-configuration`, `build-optimization`)
- **ui-ux-specialist**: Deprecated UI/UX specialist (3 sub-agents for completeness)

### Advanced Agent Coordination Protocol

#### Hierarchical Delegation with Sub-Agent Support
1. **Product Manager** provides strategic oversight and delegates to Tier 2 agents
2. **Parent Agents** can delegate specialized tasks to their 3 sub-agents for expert-level execution
3. **Sub-Agents** handle narrow-focus tasks without requiring broad oversight
4. **Cross-Agent Coordination** enables complex features requiring multiple specializations
5. **Quality Assurance Flow** includes sub-agent validation and parent agent review

#### Enhanced Task Assignment Strategy
- **Complex Features**: Product Manager → System Architecture → Database Design + API Design + Scalability Planning
- **User Experience**: UX/UI Designer → User Research + Design Systems + Conversion Optimization
- **Implementation**: Engineering teams delegate to component, state, and responsive design specialists
- **Quality Assurance**: QA delegates to automation, acceptance, and performance testing specialists
- **Specialized Tasks**: Each parent agent leverages 3 sub-agents for expert-level execution

#### Sub-Agent Specialization Benefits
- **54 Domain Experts** available for immediate delegation
- **Parallel Task Processing** through specialized sub-agent assignment
- **Higher Quality Outputs** from narrow-focus domain expertise
- **Efficient Resource Allocation** through hierarchical task distribution
- **Construction Industry Expertise** built into every sub-agent

### Agent Activation Status
**Total System**: 72 agents (18 parent + 54 sub-agents) active and operational
**Parent Agents**: 18 strategic and specialized agents for high-level coordination
**Sub-Agents**: 54 highly specialized experts for focused task execution
**Coordination**: Multi-tier hierarchical system with efficient delegation patterns
**Specialization**: Construction industry and UK market expertise across all agents
**Documentation**: Comprehensive sub-agent system documentation in `.claude/agents/sub-agents/README.md`

## Slash Commands Available

- **`/update-docs`**: Auto-update all documentation based on current codebase
- **`/project-health`**: Comprehensive repository health check and status report
- **`/generate-home`**: Create realistic UK home renders using AI image generation powered by Replicate + SDXL

## Development Hooks

Auto-commit hook is configured to:
- Run type-check and lint on code changes
- Automatically commit if no errors found
- Skip commit if type errors or linting issues exist

## Smart Image Generation System

### Replicate Integration (ACTIVE)
The platform uses Replicate + SDXL for professional architectural rendering:

**API Endpoint**: `/api/generate-image`
- **Model**: `stability-ai/sdxl` with expert ensemble refiner
- **Cost**: ~£0.002 per image (very affordable)
- **Quality**: Professional photography quality, 1024x768px
- **Styles**: Modern, Traditional, Contemporary, Victorian UK architecture

**Implementation Details**:
```typescript
// Configure page auto-generates 4 architectural style images
const architecturalStyles = [
  { id: 'modern', prompt: 'modern UK house with large windows...' },
  { id: 'traditional', prompt: 'traditional British house, red brick...' },
  { id: 'contemporary', prompt: 'contemporary UK house, glass and steel...' },
  { id: 'victorian', prompt: 'Victorian UK house, period elegance...' }
]
```

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

**UserMenu Component (`src/components/ui/UserMenu.tsx`)**:
- User profile dropdown with subscription tier display
- Quick access to account management and projects
- Contextual actions based on subscription level
- Graceful loading states and error handling

### Demo Credentials
For development and testing, the system includes built-in demo credentials:
- **Email**: `demo@buildmate.co.uk`
- **Password**: `demo123`
- **Mock User**: John Smith with Pro subscription and sample project data

### User Account Management

**Account Settings (`/account/settings`)**:
- Profile information (name, email, phone, postcode)
- Notification preferences (email, SMS, browser)
- Privacy controls (public profile, data sharing)
- Real-time form validation with success/error feedback

**User Profile (`/account/profile`)**:
- Comprehensive profile overview with activity statistics
- Editable contact information with inline editing
- Project activity summary and recent project highlights
- Subscription tier display with upgrade prompts for free users

**Wishlist Integration (`/wishlist`)**:
- Authentication-gated wishlist functionality
- Support for both materials and professionals
- User-specific wishlist management with persistence
- Integration with materials and professionals pages

### Dashboard Integration

**User-Specific Projects**:
- `useUserProjects` hook provides user-scoped project management
- Multiple project support with status tracking and progress indicators
- Project switching interface in dashboard
- Sample projects automatically created for demo user

**Authentication Guards**:
- Protected routes automatically redirect unauthenticated users
- Graceful loading states during authentication checks
- Clear access denied messages with login prompts

### Authentication Flow

**Registration Process**:
1. User opens AuthModal via "Sign In" button or protected route
2. Switches to "Create Account" tab
3. Fills form with validation (name, email, password, optional details)
4. Selects subscription tier (Free/Pro/Enterprise)
5. Agrees to terms and conditions
6. Account created with session persistence

**Login Process**:
1. User enters credentials in AuthModal
2. System validates against demo credentials or mock database
3. Success creates session token and user context
4. User redirected to intended page or dashboard

**Session Management**:
- localStorage-based session persistence
- Automatic session restoration on page reload
- Graceful session expiration handling
- Secure logout with complete session cleanup

### Navigation Integration

**Navigation Component Updates**:
- UserMenu integrated into main navigation
- AuthModal triggered from navigation buttons
- Responsive user state display (signed in/out)
- Mobile-optimized user interface

### Development Features

**Mock Data Architecture**:
- Realistic user profiles with UK-specific data (postcode, phone format)
- Sample projects with construction industry context
- Professional preferences and notification settings
- Subscription tiers with appropriate feature access

**Type Safety**:
- Comprehensive TypeScript interfaces in `src/types/user.ts`
- Full type coverage for authentication methods and user data
- Type-safe form handling and validation
- Runtime type checking for API responses

**Error Handling**:
- Detailed error messages for authentication failures
- Form validation with real-time feedback
- Network error handling with retry mechanisms
- Graceful degradation for authentication system failures

### User Experience Features

**Subscription Tiers**:
- Free: Basic features with upgrade prompts
- Pro: Enhanced features with blue badge display
- Enterprise: Full features with crown icon and purple badge

**Personalization**:
- User greeting in dashboard and navigation
- Subscription-specific feature access
- Personalized project recommendations
- Custom notification preferences

**Accessibility**:
- ARIA labels for all authentication forms
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### Future Authentication Enhancements
- Real backend API integration (Supabase Auth)
- Social login providers (Google, Apple)
- Multi-factor authentication
- Password reset functionality
- Email verification system
- Role-based access control for professionals

## Key Implementation Notes

### Mock Data Strategy
- Smart generation uses mock SVG and data structures for floorplans
- Professional and material data includes realistic UK market information
- Case studies and testimonials reflect authentic UK construction scenarios
- **Authentication is MOCK** - uses localStorage with demo credentials for development
- **Image generation is LIVE** - uses real Replicate API for architectural renders

### Performance Considerations
- Lazy loading for construction images and material catalogs
- Optimized bundle sizes for mobile usage
- Efficient component rendering for large data sets (materials, professionals)

### Security Requirements
- No API keys in client-side code
- Proper input validation for all construction project data
- Secure handling of professional credentials and certifications
- Authentication data handled securely with session management
- Form validation prevents XSS and injection attacks
- Protected routes implement proper authentication guards

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

### Static Generation Issues
- Pricing page requires `export const dynamic = 'force-static'` for proper deployment
- Configure page has complex client-side state for image generation
- All pages designed for static generation where possible

### Build Performance
- Bundle size limits: JS (200kb gzipped), CSS (50kb gzipped)
- Performance budget enforced via `bundlesize` package
- Lighthouse scoring optimized for construction industry usage

## API Architecture

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

### Commercial B2B API Endpoints
- **`POST /api/commercial/property-assessment`**: Evaluate business property energy efficiency and optimization potential
- **`POST /api/commercial/roi-calculation`**: Calculate ROI projections for commercial property improvements
- **`GET /api/commercial/solutions`**: Fetch optimization recommendations by property type and goals
- **`GET /api/commercial/pricing`**: Retrieve commercial subscription tiers and pricing

### Active API Integrations
- **Replicate SDXL**: Live image generation for architectural renders (~£0.002 per image)
- **Supabase**: Database integration (configured but using mock data for development)
- **Stripe**: Payment processing (configured but not active)
- **OpenAI**: Smart floorplan generation (mocked for development)

## Future Development Areas

### Planned Integrations
- Real OpenAI API implementation for floorplan generation
- Live supplier API connections (Travis Perkins, Wickes, B&Q)
- Payment processing with Stripe for materials purchases
- Professional verification system integration

### Feature Roadmap
- Advanced smart features for project optimization
- Real-time collaboration tools for project teams
- Mobile app development for on-site usage
- Integration with UK planning permission systems

## Testing Strategy

### Component Testing
- Test all UI components across construction industry use cases
- Verify responsive design on mobile devices
- Validate accessibility features for professional users

### Integration Testing
- Mock external APIs (suppliers, OpenAI, payment systems)
- Test construction project workflows end-to-end
- Validate UK-specific business logic and calculations
- Test authentication flows with demo credentials
- Verify user-specific data persistence and retrieval
- Test protected route access and authentication guards

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

When working on this codebase, always consider the construction industry context, UK market requirements, user authentication requirements, and the needs of professional users who rely on the platform for significant financial decisions.