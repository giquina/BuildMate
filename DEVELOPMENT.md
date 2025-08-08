# BuildMate AI Development Guide

## 🚀 Quick Start Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

## 📁 Current Project Structure

```
BuildMate/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout component
│   │   ├── page.tsx         # Homepage component
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions & configurations
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # Core type definitions
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── .env.example            # Environment variables template
```

## 🎯 Next Development Steps

### Phase 1: Core Setup (Week 1)
- [ ] Install dependencies (`npm install`)
- [ ] Set up environment variables (`.env.local`)
- [ ] Test homepage (`npm run dev`)
- [ ] Create basic navigation component
- [ ] Set up Supabase database connection
- [ ] Implement user authentication

### Phase 2: AI Integration (Week 2)
- [ ] OpenAI API integration for floorplan generation
- [ ] Project setup workflow (budget, location, preferences)
- [ ] Basic floorplan display component
- [ ] AI prompt optimization for UK building standards

### Phase 3: Database & Materials (Week 3)
- [ ] Supabase schema implementation
- [ ] Materials database structure
- [ ] Basic shopping cart functionality
- [ ] UK supplier API mock data setup

### Phase 4: Professionals & Polish (Week 4)
- [ ] Professional directory components
- [ ] User dashboard
- [ ] Export functionality
- [ ] Mobile responsiveness testing

## 💰 Subscription Tiers Implementation

### Free Tier Features
- 1 active project
- Basic AI generation
- Materials browsing (view only)
- Basic professional directory

### Pro Tier Features (£29.99/month)
- Unlimited projects
- Advanced AI with 3D visualization
- Full shopping cart with affiliate links
- Professional quotes and reviews
- Premium exports (PDF, CAD)

### Enterprise Tier Features (£199/month+)
- Team collaboration
- White-label options
- API access
- Advanced analytics
- Dedicated support
