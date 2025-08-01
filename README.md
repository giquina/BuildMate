# BuildMate

**🏗️ UK's First Smart Home Building & Renovation Platform**

Transform your home building dreams into reality with smart floorplan generation, intelligent material sourcing, and verified professional networks - all designed specifically for the UK market.

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

## 🏗️ What is BuildMate?

BuildMate is a comprehensive platform that connects UK homeowners, self-builders, and property developers with:

- **🧠 Smart Floorplan Generation**: Describe your dream home and get professional-grade layouts
- **🏠 Intelligent Image Generation**: Create realistic home renders powered by Replicate + SDXL
- **🛒 Materials Marketplace**: Shop from Travis Perkins, Wickes, B&Q - all in one cart
- **👷 Verified Professionals**: Connect with rated builders, architects, and tradespeople
- **📋 Planning Assistance**: Navigate UK building regulations and planning permission
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
- **Intelligent Questionnaire**: Dynamically adapts based on user responses
- **UK Property Types**: Detached, semi-detached, terraced, bungalow, flat, cottage
- **Architectural Styles**: Victorian, Edwardian, Georgian, Modern, Contemporary
- **Regional Pricing**: London vs. regional cost variations

### Live Image Generation
- **Replicate + SDXL Integration**: Professional architectural rendering
- **Cost**: ~£0.002 per image (very affordable)
- **Quality**: Professional photography quality, 1024x768px
- **Real-time Generation**: 4 style options generated in parallel

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
- **Integration**: Replicate (active), Supabase, Stripe, OpenAI (mocked)
- **Performance**: Custom React hooks with stable references

## 📝 Code Conventions

### Terminology Guidelines
- **Never use**: "AI", "ai-powered", "ai-generated", "artificial intelligence"
- **Always use**: "smart", "intelligent", "automated", "advanced"
- **Function names**: `generateSmartSuggestions`, `smartInsights`, `smartSuggestion`
- **Branding**: "BuildMate" (not "BuildMate AI")

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
- **Production URL**: https://buildmate-ai.vercel.app
- **Repository**: https://github.com/giquina/BuildMate
- **Auto-deployment**: Enabled from `main` branch

### Environment Variables
```bash
# Required for full functionality
REPLICATE_API_TOKEN=r8_xxx...        # Smart image generation (ACTIVE)
NEXT_PUBLIC_SUPABASE_URL=xxx         # Database connection
SUPABASE_SERVICE_ROLE_KEY=xxx        # Server-side database access
OPENAI_API_KEY=xxx                   # Smart floorplan generation
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
feat: Add smart material recommendation system
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
- **Framework**: Next.js 14.2.30
- **Node Version**: 20+
- **Build Status**: ✅ Stable
- **Deployment**: ✅ Auto-deployed to Vercel
- **Performance**: ✅ Optimized (bundle size < 200kb)

## 🎯 Industry Focus

### User Personas
- **Homeowners**: First-time builders, extension planners
- **Self-Builders**: Experienced DIY enthusiasts  
- **Property Developers**: Commercial and residential developers
- **Professionals**: Architects, builders, tradespeople

### UK Market Standards
- **Typical Costs**: Extensions £1,200-£2,500/m², new builds £1,500-£3,000/m²
- **Timeline Expectations**: Extensions 12-20 weeks, new builds 12-24+ months
- **Compliance**: Building regs, planning permission, professional certifications

---

**Built with ❤️ for the UK construction industry**

For detailed development guidance, see [CLAUDE.md](./CLAUDE.md)