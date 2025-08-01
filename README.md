# BuildMate AI

**🏗️ UK's First AI-Powered Home Building & Renovation Platform**

Transform your home building dreams into reality with AI-generated floorplans, smart material sourcing, and verified professional networks - all designed specifically for the UK market.

## 🚀 Contributor Quickstart

**Get up and running in 5 minutes:**

```bash
# 1. Clone and enter the project
git clone https://github.com/giquina/BuildMate.git
cd BuildMate

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Add your API keys to .env.local (optional for basic development)

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000 and start building! 🎉
```

**Essential Commands:**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run lint        # Check code quality
npm run type-check  # Validate TypeScript
npm run test        # Run tests (when added)
```

**Contributing Workflow:**
1. Fork the repository (external contributors) or create a branch (team members)
2. Make your changes following our [code conventions](#code-conventions)
3. Run `npm run type-check && npm run lint` before committing
4. Submit a PR with a clear description
5. Get help in our [discussions](https://github.com/giquina/BuildMate/discussions)

**Code Style:**
- TypeScript with strict typing (no `any` types)
- React functional components with hooks
- Tailwind CSS for styling
- Mobile-first responsive design
- Accessible components (WCAG 2.1 AA)

**Need Help?** Check our [Contributing Guide](#contributing) or [join discussions](https://github.com/giquina/BuildMate/discussions)!

## 📋 Table of Contents
- [Contributor Quickstart](#contributor-quickstart)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Code Conventions](#code-conventions)
- [Development Workflow](#development-workflow)
- [Git Commands Reference](#git-commands-reference)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git** (version 2.0 or higher)
  - Check: `git --version`
  - Install: [Download Git](https://git-scm.com/downloads)

- **Node.js** (if this becomes a JavaScript project)
  - Check: `node --version`
  - Install: [Download Node.js](https://nodejs.org/)

- **Code Editor** (recommended)
  - [VS Code](https://code.visualstudio.com/)
  - [Cursor](https://cursor.sh/)

## 🚀 Installation & Setup

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/giquina/BuildMate.git
cd BuildMate

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ What is BuildMate AI?

BuildMate AI is a comprehensive platform that connects UK homeowners, self-builders, and property developers with:

- **🧠 AI Floorplan Generation**: Describe your dream home and get professional-grade layouts
- **🏠 AI Image Generation**: Create realistic home renders powered by Replicate + SDXL
- **🛒 Materials Marketplace**: Shop from Travis Perkins, Wickes, B&Q - all in one cart
- **👷 Verified Professionals**: Connect with rated builders, architects, and tradespeople
- **📋 Planning Assistance**: Navigate UK building regulations and planning permission
- **💰 Smart Budgeting**: Optimize costs with bulk purchasing and affiliate partnerships

## 📁 Project Structure

```
BuildMate/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with navigation
│   │   ├── page.tsx         # Homepage component
│   │   └── globals.css      # Global styles with Tailwind
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utilities and configurations
│   │   ├── uk-utils.ts      # UK-specific functions
│   │   └── utils.ts         # General utilities
│   └── types/
│       └── index.ts         # TypeScript definitions
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── DEVELOPMENT.md           # Development roadmap
└── .env.example            # Environment variables template
```

### Step 2: Verify Setup

```bash
# Check Git status
git status

# Check current branch
git branch

# View commit history
git log --oneline -10
```

### Step 3: Create Your Development Branch

```bash
# Create and switch to a new branch for your work
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

## 🏃‍♂️ Getting Started

### First Time Setup

1. **Explore the project structure**
   ```bash
   # List all files and folders
   ls -la    # On Mac/Linux
   dir       # On Windows
   ```

2. **Read the documentation**
   - Check `README.md` (this file)
   - Review `NOTES.md` for project-specific notes

3. **Set up your development environment**
   - Configure your code editor
   - Install any required dependencies (when added)

### Daily Workflow

1. **Start your work session**
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Switch to your branch
   git checkout your-branch-name
   ```

2. **Make your changes**
   - Edit files as needed
   - Test your changes
   - Document what you've done

3. **Save your work**
   ```bash
   # Check what changed
   git status
   
   # Add your changes
   git add .
   
   # Commit with a clear message
   git commit -m "Add: describe your changes clearly"
   ```

## 📁 Project Structure

```
BuildMate/
├── .git/                 # Git version control (don't modify)
├── README.md            # This file - project documentation
├── NOTES.md             # Personal project notes and todos
└── [Future files will be added here]
```

## 📝 Code Conventions

### File Naming
- **Components**: `PascalCase.tsx` (e.g., `AnimatedProgressBar.tsx`)
- **Pages**: `kebab-case` folders with `page.tsx` (e.g., `dashboard/page.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `ukUtils.ts`)
- **Types**: `camelCase.ts` (e.g., `index.ts`)
- **Branches**: `feature/description`, `fix/issue-name`, `docs/update-readme`

### TypeScript Standards
- Use strict TypeScript - no `any` types
- Define interfaces for all props and data structures
- Use utility types (`Partial`, `Pick`, `Omit`) where appropriate
- Export types with components for reusability

### Component Architecture
- Use functional components with hooks
- Implement proper prop interfaces with optional/required fields
- Include accessibility features (ARIA labels, keyboard navigation)
- Support multiple variants/sizes where appropriate
- Follow single responsibility principle

### Styling Guidelines
- Use Tailwind CSS with utility classes
- Create responsive designs (mobile-first)
- Maintain 4.5:1 color contrast ratio (WCAG AA)
- Use semantic HTML elements
- Implement smooth transitions (200-300ms duration)

### Import Organization
```typescript
// 1. React/Next.js imports
import React from 'react'
import { useState } from 'react'

// 2. Third-party libraries
import { cn } from '@/lib/utils'

// 3. Internal components
import { Button } from '@/components/ui/Button'

// 4. Types and utilities
import type { Project } from '@/types'
```

## 🔄 Development Workflow

### Branch Strategy

```bash
main                 # Main production branch
├── feature/login    # New feature branches  
├── fix/button-bug   # Bug fix branches
└── docs/readme      # Documentation updates
```

### Making Changes

1. **Always start from main**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/new-feature
   ```

2. **Work in small commits**
   ```bash
   # Make a small change
   git add specific-file.js
   git commit -m "Add user authentication function"
   
   # Make another small change  
   git add another-file.css
   git commit -m "Style login form buttons"
   ```

3. **Push your branch**
   ```bash
   git push origin feature/new-feature
   ```

## 📚 Git Commands Reference

### Daily Commands

```bash
# Check status of your files
git status

# See what you've changed
git diff

# Add files to staging
git add filename.js          # Add specific file
git add .                    # Add all changes

# Commit your changes
git commit -m "Your message here"

# Push to remote repository  
git push origin branch-name
```

### Syncing Commands

```bash
# Get latest changes from remote
git pull origin main

# See commit history
git log --oneline -10

# See all branches
git branch -a

# Switch branches
git checkout branch-name
```

### Advanced Commands

```bash
# Create new branch and switch to it
git checkout -b new-branch-name

# Merge changes from another branch
git merge branch-name

# Reset to last commit (careful!)
git reset --hard HEAD

# View remote repositories
git remote -v
```

## 🛠️ Troubleshooting

### Common Issues

**Problem**: "Permission denied" when pushing
```bash
# Solution: Check your Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Problem**: "Branch diverged" error
```bash
# Solution: Pull latest changes first
git pull origin main
```

**Problem**: Accidentally committed wrong files
```bash
# Solution: Undo last commit (keeps changes)
git reset HEAD~1
```

**Problem**: Want to discard all local changes
```bash
# Solution: Reset to remote state (CAREFUL - loses work!)
git reset --hard origin/main
```

### Getting Help

```bash
# Get help for any Git command
git help status
git help commit
git help push

# Quick help
git status --help
```

## 🤝 Contributing

### Before You Start

1. **Create an issue** describing what you want to work on
2. **Fork the repository** (if you're not a collaborator)
3. **Create a feature branch** from main

### Making Good Commits

**Good commit messages:**
```
Add user login functionality
Fix button alignment on mobile
Update README with installation steps
Remove unused CSS classes
```

**Bad commit messages:**
```
Fixed stuff
WIP
asdfgh
Update
```

### Pull Request Process

1. **Push your branch**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create Pull Request** on GitHub
3. **Write clear description** of what you changed and why
4. **Wait for review** and address any feedback

## 📝 Development Notes

### Project Status
- **Current Version**: Initial setup
- **Last Updated**: July 22, 2025
- **Active Branches**: main
- **Contributors**: giquina

### Future Enhancements
- [ ] Add project dependencies and build system
- [ ] Implement core functionality
- [ ] Add automated testing
- [ ] Set up continuous integration
- [ ] Create deployment pipeline

### Resources
- **Repository**: https://github.com/giquina/BuildMate
- **Issues**: https://github.com/giquina/BuildMate/issues
- **Discussions**: https://github.com/giquina/BuildMate/discussions

---

## 💡 Tips for Beginners

1. **Always pull before you push** - prevents conflicts
2. **Commit small changes often** - easier to track and fix issues
3. **Use clear, descriptive commit messages** - your future self will thank you
4. **Keep your NOTES.md updated** - document what you learn
5. **Don't be afraid to experiment** - Git makes it safe to try things

## 🆘 Need Help?

- Check the [NOTES.md](./NOTES.md) file for project-specific information
- Look at existing issues on GitHub
- Ask questions in the repository discussions
- Review Git documentation: https://git-scm.com/docs

Remember: Every expert was once a beginner! 🚀