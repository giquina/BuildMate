# BuildMate AI

**🏗️ UK's First Smart Home Building & Renovation Platform**

Transform your home building dreams into reality with AI-powered floorplan generation, intelligent material sourcing, and verified professional networks - all designed specifically for the UK market.

## 🚀 Quick Start

**Get up and running in 5 minutes:**

```bash
# 1. Clone and enter the project
git clone https://github.com/giquina/BuildMate.git
cd BuildMate

# 2. Install dependencies
npm install

# 3. Set up environment (optional for basic development)
cp .env.example .env.local
# Add your API keys to .env.local if needed

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000 and start building! 🎉
```

## 🏗️ What is BuildMate AI?

BuildMate AI is a comprehensive platform that connects UK homeowners, self-builders, and property developers with:

- **🧠 Smart Floorplan Generation**: Describe your dream home and get professional-grade layouts
- **🏠 Smart Image Generation**: Create realistic home renders powered by Replicate + SDXL
- **🛒 Materials Marketplace**: Shop from Travis Perkins, Wickes, B&Q - all in one cart
- **👷 Verified Professionals**: Connect with rated builders, architects, and tradespeople
- **📋 Smart Planning Assistance**: Navigate UK building regulations and planning permission
- **💰 Smart Budgeting**: Optimize costs with bulk purchasing and regional pricing

## 🛠️ Development Commands

### Essential Commands
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build with static generation
npm run lint         # ESLint code quality check
npm run type-check   # TypeScript compilation check
npm run start        # Start production server
```

### Performance Analysis
```bash
npm run build:analyze      # Build with bundle analyzer
npm run perf:audit         # Full performance audit (type-check + lint + build)
npm run perf:lighthouse    # Run Lighthouse performance test
npm run perf:budget        # Check bundle size limits
```

### Pre-deployment Checklist
Always run before committing:
```bash
npm run type-check && npm run lint && npm run build
```

## 📁 Project Structure

```
BuildMate/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with navigation
│   │   ├── page.tsx         # Homepage with testimonials/stats
│   │   ├── globals.css      # Global styles + animations
│   │   ├── configure/       # Smart image generation & style selection
│   │   ├── materials/       # Materials marketplace with UK suppliers
│   │   ├── professionals/   # Verified UK professionals network
│   │   ├── dashboard/       # Project management dashboard
│   │   └── api/             # API routes for backend functionality
│   ├── components/ui/       # Reusable component library
│   │   ├── Navigation.tsx   # Main navigation with mobile menu
│   │   ├── Button.tsx       # Primary button component with variants
│   │   ├── Card.tsx         # Card components for content layout
│   │   └── index.ts         # Centralized component exports
│   ├── lib/                 # Utilities and configurations
│   │   ├── uk-utils.ts      # UK-specific functions (postcodes, pricing)
│   │   ├── performance.ts   # Performance monitoring hooks
│   │   └── utils.ts         # General utilities
│   └── types/
│       └── index.ts         # TypeScript definitions
├── public/                  # Static assets
├── CLAUDE.md               # Claude Code guidance
├── package.json            # Dependencies and scripts
└── .env.example           # Environment variables template
```

## 🎯 Key Features

### Smart Configuration System
- **Smart Questionnaire**: Dynamically adapts based on user responses
- **UK Property Types**: Detached, semi-detached, terraced, bungalow, flat, cottage
- **Architectural Styles**: Victorian, Edwardian, Georgian, Modern, Contemporary
- **Regional Pricing**: London vs. regional cost variations

### Live Smart Image Generation
- **Replicate + SDXL Integration**: Professional architectural rendering
- **Cost**: ~£0.002 per image (very affordable)
- **Quality**: Professional photography quality, 1024x768px
- **Real-time Generation**: 4 style options generated in parallel

### User Authentication System
- **Mock Authentication**: Full user system with demo credentials (`demo@buildmate.co.uk` / `demo123`)
- **User Accounts**: Profile management, settings, and preferences
- **Project Management**: User-specific projects with progress tracking
- **Wishlist**: Save materials and professionals across sessions
- **Subscription Tiers**: Free, Pro, and Enterprise with feature differentiation

### UK Construction Focus
- **Building Regulations**: Current UK compliance requirements
- **Planning Permission**: Permitted development vs. full applications
- **Professional Standards**: RIBA, NHBC, FMB certifications
- **VAT Handling**: Zero-rated new builds vs. standard-rated renovations

## 🔧 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library
- **API**: Next.js API routes for backend functionality
- **Smart Integration**: Replicate (active), OpenAI (mocked), Supabase, Stripe
- **Performance**: Custom React hooks with stable references

## 📝 Code Conventions

### Terminology Guidelines
- **Platform Branding**: "BuildMate AI" (official platform name)
- **Feature Naming**: "AI-powered", "AI-generated", "AI insights" (technical accuracy)
- **User-Facing Copy**: Emphasize "smart", "intelligent", "automated" for accessibility
- **Function Names**: `generateAISuggestions`, `aiInsights`, `aiRecommendation`
- **Marketing Copy**: Balance AI capabilities with user-friendly smart terminology

### File Naming
- **Components**: `PascalCase.tsx` (e.g., `AnimatedProgressBar.tsx`)
- **Pages**: `kebab-case` folders with `page.tsx` (e.g., `dashboard/page.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `ukUtils.ts`)
- **Branches**: `feature/description`, `fix/issue-name`, `docs/update-readme`

### TypeScript Standards
- Use strict TypeScript - no `any` types
- Define interfaces for all props and data structures
- Export types with components for reusability
- Implement type guards for runtime validation

### Performance Considerations
- Use `useCallback` and `useRef` in performance hooks to prevent re-renders
- Avoid complex webpack optimizations that can cause module loading errors
- Test development server stability after major changes
- Ensure all React hooks have stable dependencies

## 🌐 Deployment

### Vercel Deployment
- **Production URL**: https://build-mate-mu.vercel.app
- **Repository**: https://github.com/giquina/BuildMate
- **Auto-deployment**: Enabled from `main` branch

### Environment Variables
```bash
# Required for full functionality
REPLICATE_API_TOKEN=r8_xxx...        # AI image generation (ACTIVE)
NEXT_PUBLIC_SUPABASE_URL=xxx         # Database connection
SUPABASE_SERVICE_ROLE_KEY=xxx        # Server-side database access
OPENAI_API_KEY=xxx                   # AI floorplan generation
STRIPE_SECRET_KEY=xxx                # Payment processing
```

## 🤝 Contributing

### Development Workflow
1. **Fork the repository** (external contributors) or create a branch (team members)
2. **Follow our code conventions** (see above)
3. **Run pre-deployment checks**: `npm run type-check && npm run lint && npm run build`
4. **Submit a PR** with clear description
5. **Address feedback** from code review

### Branch Strategy
```bash
main                    # Main production branch
├── feature/smart-ui    # New feature branches  
├── fix/performance     # Bug fix branches
└── docs/readme         # Documentation updates
```

### Making Good Commits
**Good commit messages:**
```
feat: Add AI material recommendation system
fix: Resolve Fast Refresh runtime errors in performance hook
docs: Update README with current terminology guidelines
perf: Optimize bundle size with simplified webpack config
```

## 🛠️ Troubleshooting

### Common Development Issues

**Fast Refresh Warnings:**
- Ensure performance hooks use stable references (`useCallback`, `useRef`)
- Check useEffect dependencies for changing function references

**Build Failures:**
- Run `npm run type-check` to identify TypeScript errors
- Ensure all imports are correctly typed
- Check for circular dependencies

**Module Loading Errors:**
- Simplify Next.js experimental features
- Avoid aggressive webpack optimizations
- Clear `.next` cache: `rm -rf .next`

### Getting Help
- Check [CLAUDE.md](./CLAUDE.md) for comprehensive development guidance
- Review [GitHub Issues](https://github.com/giquina/BuildMate/issues)
- Join [GitHub Discussions](https://github.com/giquina/BuildMate/discussions)

## 📊 Project Status

- **Current Version**: 0.1.0
- **Framework**: Next.js 14+ with App Router
- **Node Version**: 20+
- **Build Status**: ✅ Stable
- **Deployment**: ✅ Auto-deployed to Vercel
- **Performance**: ✅ Optimized (bundle size < 200kb)
- **API Status**: ✅ Replicate image generation active, other APIs mocked
- **Authentication**: ✅ Mock authentication with demo credentials

## 🎯 Industry Focus

### User Personas

#### Residential Users
- **Homeowners**: First-time builders, extension planners
- **Self-Builders**: Experienced DIY enthusiasts  
- **Property Developers**: Residential development projects
- **Professionals**: Architects, builders, tradespeople

#### Commercial B2B Users
- **Business Property Owners**: SMEs seeking property optimization (primary target)
- **Facility Managers**: Corporate real estate and facility management teams
- **Commercial Property Developers**: Large-scale commercial development projects
- **Energy Consultants**: Specialists in commercial energy efficiency
- **Smart Building Professionals**: IoT, automation, and smart technology specialists

### UK Market Standards

#### Residential Construction
- **Typical Costs**: Extensions £1,200-£2,500/m², new builds £1,500-£3,000/m²
- **Timeline Expectations**: Extensions 12-20 weeks, new builds 12-24+ months
- **Compliance**: Building regs, planning permission, professional certifications

#### Commercial Property Optimization
- **Energy Costs**: UK commercial properties average £2-4/sq ft annually
- **ROI Performance**: 30-50% energy cost reduction, 2-4 year payback periods
- **Property Value Impact**: 8-15% increase through efficiency improvements
- **Market Growth**: 3.58% CAGR (£148.80B to £177.40B by 2030)
- **Compliance Requirements**: EPC B+ ratings, MEES standards, net-zero transition

### Dual Platform Navigation
Users can seamlessly switch between:
- **🏠 Build Your Home**: Extensions, new builds, renovations
- **🏢 Optimize Your Property**: Commercial assets, energy efficiency, ROI

## 🤖 AI-Powered Development

### 17-Agent Development Hierarchy
BuildMate AI utilizes a sophisticated 17-agent smart development system for enhanced project management:

#### Executive & Strategic (Tiers 1-2)
- **product-manager**: Executive oversight and coordination
- **system-architecture**: Technical architecture decisions
- **ux-ui-designer**: User experience design leadership

#### Implementation Teams (Tier 3)
- **frontend-engineering**: React/Next.js development
- **backend-engineering**: API and database architecture
- **security-analyst**: Enterprise-grade security

#### Quality & Deployment (Tier 4)
- **qa-testing**: Comprehensive testing strategies
- **devops**: Deployment automation and monitoring

#### Specialized Support (9 Additional Agents)
- UI/UX specialists, construction experts, code reviewers, documentation maintainers, performance optimizers, and deployment specialists

**Agent Status**: All 17 agents active and available for immediate coordination

---

**Built with ❤️ for the UK construction industry**

For detailed development guidance, see [CLAUDE.md](./CLAUDE.md)