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
BuildMate is a UK-focused construction platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides smart floorplan generation, materials marketplace, and professional networking for homeowners, self-builders, and property developers.

**IMPORTANT**: All "AI" terminology has been removed from the platform. Use "smart", "intelligent", or "automated" instead to make the platform accessible to general users unfamiliar with AI terminology.

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
│   ├── page.tsx                 # Homepage with testimonials/stats
│   ├── globals.css              # Global styles + animations
│   ├── pricing/page.tsx         # Pricing plans (force-static)
│   ├── configure/page.tsx       # Smart image generation & style selection
│   ├── materials/page.tsx       # Materials marketplace with UK suppliers
│   ├── professionals/page.tsx   # Verified UK professionals network
│   ├── dashboard/page.tsx       # User-specific project management dashboard
│   ├── review/page.tsx          # Project review and assembly
│   ├── wishlist/page.tsx        # User wishlist with authentication integration
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
1. **Homepage (`/`)** → User education and trust building
2. **Authentication Flow** → Login/register via AuthModal with demo credentials
3. **Configure (`/configure`)** → Smart image generation + style selection
4. **Materials (`/materials`)** → UK supplier integration and shopping
5. **Professionals (`/professionals`)** → Verified professional matching
6. **Review (`/review`)** → Project assembly and final confirmation
7. **Dashboard (`/dashboard`)** → User-specific project management and activity
8. **Account Management** → Profile settings, notifications, and privacy controls
9. **Wishlist (`/wishlist`)** → Saved materials and professionals with authentication

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
- **Building Regulations**: Current UK compliance requirements
- **Planning Permission**: Permitted development vs. full applications
- **Regional Pricing**: London vs. regional cost variations
- **Professional Standards**: RIBA, NHBC, FMB certifications
- **VAT Handling**: Zero-rated new builds vs. standard-rated renovations

### User Personas
- **Homeowners**: First-time builders, extension planners
- **Self-Builders**: Experienced DIY enthusiasts
- **Property Developers**: Commercial and residential developers
- **Professionals**: Architects, builders, tradespeople

### Authentication Integration
All user personas now benefit from:
- **Personalized Experience**: Custom dashboards and project management
- **Subscription Tiers**: Free, Pro (£29/month), Enterprise (£99/month)
- **Saved Projects**: Persistent project data and progress tracking
- **Wishlist Functionality**: Save materials and professionals across sessions
- **Account Management**: Profile, settings, and privacy controls

### Industry Standards
- **Typical Costs**: Extensions £1,200-£2,500/m², new builds £1,500-£3,000/m²
- **Timeline Expectations**: Extensions 12-20 weeks, new builds 12-24+ months
- **Compliance Requirements**: Building regs, planning permission, professional certifications

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

## Specialized Agents Available

This project includes specialized agents for enhanced development (located in `.claude/agents/`):
- **ui-ux-specialist**: Construction industry UI/UX improvements and component design
- **construction-expert**: UK building regulations and industry validation
- **react-code-reviewer**: TypeScript/React code quality review and best practices
- **docs-maintainer**: Documentation updates and maintenance across all project files
- **performance-optimizer**: Next.js performance optimization and bundle analysis
- **api-validator**: API endpoint validation and construction industry business logic
- **type-checker**: TypeScript type validation and error resolution
- **vercel-deployment-specialist**: Vercel deployment expert for smooth production deployments

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
- **Production URL**: https://buildmate-ai.vercel.app
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
```

### API Design Patterns
- All routes return consistent `{ success: boolean, data?: any, error?: string }` format
- UK construction industry specific algorithms and data
- Proper error handling with construction context
- Mock data for development, real APIs for production integration

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
- **Never use**: "AI", "ai-powered", "ai-generated", "artificial intelligence"
- **Always use**: "smart", "intelligent", "automated", "advanced"
- **Function names**: `generateSmartSuggestions`, `smartInsights`, `smartSuggestion`
- **Branding**: "BuildMate" (not "BuildMate AI")

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