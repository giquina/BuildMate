# BuildMate AI Development Rules

Essential development rules and coding standards for BuildMate AI platform.

## 🚨 Critical Rules - Never Break These

### 1. Authentication & Security
- **NEVER** commit API keys, tokens, or secrets to the repository
- **ALWAYS** use demo credentials for development: `demo@buildmate.co.uk` / `demo123`
- **NEVER** expose sensitive data in client-side code
- **ALWAYS** validate UK-specific formats (postcodes, phone numbers)
- **NEVER** skip authentication guards on protected routes

### 2. TypeScript Standards
- **NEVER** use `any` types - always define proper interfaces
- **ALWAYS** export types with components for reusability
- **NEVER** ignore TypeScript errors - fix them properly
- **ALWAYS** run `npm run type-check` before committing
- **NEVER** use loose typing when strict typing is possible

### 3. Performance Requirements
- **NEVER** create unstable references in React hooks
- **ALWAYS** use `useCallback` and `useRef` in performance hooks
- **NEVER** skip bundle size checks - stay under 200kb JS, 50kb CSS
- **ALWAYS** test development server stability after major changes
- **NEVER** add dependencies without checking bundle impact

### 4. Construction Industry Context
- **ALWAYS** consider UK building regulations and compliance
- **NEVER** ignore regional pricing variations (London vs. regional)
- **ALWAYS** validate professional certifications (RIBA, NHBC, FMB)
- **NEVER** misrepresent construction timelines or costs
- **ALWAYS** use accurate UK construction industry terminology

## 📋 Development Workflow Rules

### Pre-Commit Checklist
**ALWAYS run before committing:**
```bash
npm run type-check && npm run lint && npm run build
```

### Component Development
- **Export from `src/components/ui/index.ts`** - maintain centralized exports
- **Support multiple variants** - size, color, state variations
- **Include TypeScript interfaces** - proper prop typing required
- **Implement accessibility** - ARIA labels, keyboard navigation
- **Follow naming convention** - `ComponentName`, `ComponentVariant`

### API Development
- **Use Next.js API routes** in `src/app/api/` directory structure
- **Return consistent format** - `{ success: boolean, data?: any, error?: string }`
- **Include TypeScript interfaces** for all request/response objects
- **Mock external APIs** during development (OpenAI, supplier APIs)
- **Handle errors properly** with appropriate HTTP status codes

### Mobile-First Design
- **Construction professionals use mobile on-site** - optimize for mobile experience
- **Touch-friendly interactions** - minimum 44px touch targets
- **Progressive enhancement** for desktop features
- **Test across breakpoints** - sm (640px), md (768px), lg (1024px), xl (1280px)

## 🎯 Branding & Terminology Rules

### Platform Branding
- **Official Brand Name**: "BuildMate AI" (use in headers, navigation, official docs)
- **User-Facing Features**: Emphasize "smart", "intelligent", "automated", "advanced"
- **Marketing Copy**: "AI-powered", "AI-generated", "AI insights" for technical accuracy
- **Function Names**: `generateAISuggestions`, `aiInsights`, `aiRecommendation`

### Construction Industry Language
- **Use accurate UK terminology** - extensions, renovations, new builds
- **Professional standards references** - Building Regulations, Planning Permission
- **Regional considerations** - London vs. regional variations
- **VAT handling awareness** - zero-rated new builds vs. standard-rated renovations

## 🔧 Technical Implementation Rules

### React Hook Standards
```typescript
// ✅ GOOD - Stable references
const { user, isAuthenticated, login, logout } = useUser()
const { projects, saveProject, updateProject } = useUserProjects()
const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

// ✅ GOOD - Performance hook usage
const { onMount, measureOperation } = usePerformanceMonitoring('ComponentName')
// Functions are stable - safe to use in useEffect dependencies

// ❌ BAD - Unstable references that cause re-renders
const handleClick = () => { /* handler logic */ } // Creates new function on every render
```

### Path Aliases Usage
```typescript
// ✅ GOOD - Use configured path aliases
import { Button } from '@/components/ui'
import { ukUtils } from '@/lib/uk-utils'
import { User } from '@/types/user'

// ❌ BAD - Relative imports when aliases exist
import { Button } from '../../../components/ui/Button'
```

### Animation Standards
- **Duration**: 200-300ms for interactions
- **Easing**: Professional, subtle effects only
- **CSS transforms**: Use for performance (hardware-accelerated)
- **Classes**: `.animate-float`, `.animate-slide-up`, `.card-hover-lift`

## 🌐 UK Market Requirements

### Regulatory Compliance
- **Building Regulations**: Current UK compliance requirements
- **Planning Permission**: Permitted development vs. full applications
- **EPC Requirements**: Commercial property energy performance standards
- **MEES Compliance**: Minimum Energy Efficiency Standards (C rating by 2027)
- **Building Safety Act**: Enhanced safety requirements for commercial buildings

### User Personas Consideration
**Residential Users**:
- Homeowners (first-time builders, extension planners)
- Self-builders (experienced DIY enthusiasts)
- Property developers (residential projects)
- Professionals (architects, builders, tradespeople)

**Commercial B2B Users**:
- Business property owners (SMEs seeking optimization)
- Facility managers (corporate real estate teams)
- Commercial property developers (large-scale projects)

### Market Standards
- **Residential costs**: Extensions £1,200-£2,500/m², new builds £1,500-£3,000/m²
- **Commercial energy**: £2-4 per sq ft annually across property types
- **Timeline expectations**: Extensions 12-20 weeks, new builds 12-24+ months
- **ROI performance**: 30-50% energy cost reduction, 2-4 year payback periods

## 🚀 Testing & Quality Assurance

### Manual Testing Requirements
1. **Authentication flows** with demo credentials
2. **Commercial/residential toggle** functionality
3. **Smart image generation** on `/configure` page
4. **User dashboard** and project management
5. **Wishlist functionality** across sessions
6. **Mobile responsiveness** across all pages
7. **TypeScript compilation** and build success

### Performance Monitoring
- **Bundle size limits**: Enforce via `bundlesize` package
- **Lighthouse scoring**: Optimize for construction industry usage
- **Core Web Vitals**: Monitor LCP, FID, CLS for mobile users
- **Error tracking**: Monitor and fix Fast Refresh warnings

## 📁 File Organization Rules

### Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `AnimatedProgressBar.tsx`)
- **Pages**: `kebab-case` folders with `page.tsx` (e.g., `dashboard/page.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `ukUtils.ts`)
- **Types**: `camelCase.ts` with clear interfaces (e.g., `user.ts`, `index.ts`)

### Directory Structure
```
src/
├── app/           # Next.js App Router pages
├── components/ui/ # Reusable component library
├── contexts/      # React Context providers
├── lib/           # Utilities and configurations
└── types/         # TypeScript type definitions
```

## 🔒 Security Requirements

### Authentication System
- **Mock authentication** uses localStorage with demo credentials
- **Session management** with proper cleanup on logout
- **Protected routes** redirect unauthenticated users appropriately
- **Form validation** prevents XSS and injection attacks
- **UK data formats** validated (postcodes, phone numbers)

### API Security
- **No client-side secrets** - all API keys server-side only
- **Input validation** for all construction project data
- **Error handling** without exposing sensitive information
- **Professional credentials** handled securely

## 🎨 UI/UX Standards

### Design System
- **Colors**: Professional blues, construction oranges, trust-building greens
- **Mobile-first**: Optimized for on-site construction usage
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Component variants**: Support size, color, and state variations

### Construction Industry Aesthetics
- **Professional appearance** suitable for business users
- **Trust-building elements** for high-value financial decisions
- **Clear information hierarchy** for complex construction data
- **Mobile optimization** for on-site professional usage

## ⚡ Environment & Deployment

### Environment Variables
```bash
# Required for production
REPLICATE_API_TOKEN=r8_xxx...        # Smart image generation (ACTIVE)
NEXT_PUBLIC_SUPABASE_URL=xxx         # Database connection
SUPABASE_SERVICE_ROLE_KEY=xxx        # Server-side database access
OPENAI_API_KEY=xxx                   # Smart floorplan generation
STRIPE_SECRET_KEY=xxx                # Payment processing
```

### Build Requirements
- **Static generation** where possible for performance
- **Force-static** for pricing pages to ensure proper deployment
- **Bundle optimization** to stay within size limits
- **Error-free builds** - never deploy with TypeScript errors

## 📖 Documentation Standards

### Code Documentation
- **Clear component interfaces** with TypeScript
- **Inline comments** only when logic is complex
- **README updates** when adding major features
- **API documentation** for all endpoints

### Construction Context
- **Industry terminology** used correctly
- **UK-specific considerations** clearly marked
- **Professional standards** referenced appropriately
- **Market requirements** documented for features

---

**Remember**: BuildMate AI serves professional users making significant financial decisions. Quality, accuracy, and reliability are non-negotiable.