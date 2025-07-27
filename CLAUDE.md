# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Claude Code Operating Rules

1. **First think through the problem**, read the codebase for relevant files, and write a plan to `tasks/todo.md`.
2. **The plan should have a list of todo items** that you can check off as you complete them.
3. **Before you begin working**, check in with me and I will verify the plan.
4. **Then, begin working on the todo items**, marking them as complete as you go.
5. **Every step of the way**, give me a high-level summary of the changes you made.
6. **Make every code/task change as simple as humanly possible**. Avoid broad refactors.
7. **Finally, add a review section** to the `todo.md` file summarizing what you did.
8. **DO NOT BE LAZY. NO HALF FIXES.** Find the root cause and fix it properly.
9. **Minimize the code impact of every change**. Simplicity always wins.

## Project Overview
BuildMate AI is a UK-focused construction platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides AI-powered floorplan generation, materials marketplace, and professional networking for homeowners, self-builders, and property developers.

## Core Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library in `src/components/ui/`
- **API**: Next.js API routes for backend functionality
- **Integration**: OpenAI (mocked), Supabase, Stripe

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage with testimonials/stats
│   ├── globals.css        # Global styles + animations
│   ├── api/ai/generate/   # AI floorplan generation endpoint
│   └── [pages]/           # Feature pages (materials, professionals, etc.)
├── components/ui/         # Reusable component library
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
```

### Key Architectural Patterns

1. **Component System**: Centralized UI components with variants (Button, Card, Badge, etc.)
2. **Type Safety**: Comprehensive TypeScript interfaces for all data structures
3. **UK Market Focus**: Specialized utilities in `uk-utils.ts` for postcodes, pricing, regulations
4. **Construction Domain**: Strong typing for projects, materials, professionals, quotes
5. **API Architecture**: RESTful endpoints with proper error handling and mock data

### Data Models

Core entities are defined in `src/types/index.ts`:
- **User**: Subscription tiers (free/pro/enterprise), UK postcode integration
- **Project**: Construction types (new_build/renovation/extension), status tracking
- **Floorplan**: AI-generated SVG data with specifications
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
npm run build        # Production build
npm run lint         # ESLint code quality check
npm run type-check   # TypeScript compilation check
```

### Development Workflow
1. Always run `npm run type-check` before committing code changes
2. Use `npm run lint` to maintain code quality standards
3. Test UI changes across mobile/desktop breakpoints
4. Verify construction industry context in all features

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

## Sub-Agents Available

This project includes specialized sub-agents for enhanced development:
- **ui-ux-specialist**: Construction industry UI/UX improvements
- **construction-expert**: UK building regulations and industry validation
- **react-code-reviewer**: TypeScript/React code quality review
- **docs-maintainer**: Documentation updates and maintenance
- **performance-optimizer**: Next.js performance optimization

## Development Hooks

Auto-commit hook is configured to:
- Run type-check and lint on code changes
- Automatically commit if no errors found
- Skip commit if type errors or linting issues exist

## Key Implementation Notes

### Mock Data Strategy
- AI generation uses mock SVG and data structures
- Professional and material data includes realistic UK market information
- Case studies and testimonials reflect authentic UK construction scenarios

### Performance Considerations
- Lazy loading for construction images and material catalogs
- Optimized bundle sizes for mobile usage
- Efficient component rendering for large data sets (materials, professionals)

### Security Requirements
- No API keys in client-side code
- Proper input validation for all construction project data
- Secure handling of professional credentials and certifications

## Future Development Areas

### Planned Integrations
- Real OpenAI API implementation for floorplan generation
- Live supplier API connections (Travis Perkins, Wickes, B&Q)
- Payment processing with Stripe for materials purchases
- Professional verification system integration

### Feature Roadmap
- Advanced AI features for project optimization
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

When working on this codebase, always consider the construction industry context, UK market requirements, and the needs of professional users who rely on the platform for significant financial decisions.