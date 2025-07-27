#!/bin/bash

# BuildMate AI - Bootstrap Script
# Automated setup for development environment

echo "🏗️ BuildMate AI - Project Bootstrap"
echo "=================================="

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔍 Running type check..."
npm run type-check

echo "🧹 Running linter..."
npm run lint

echo "🏗️ Testing build process..."
npm run build

echo "📁 Verifying directory structure..."
directories=("src" "tests" "docs" "claude" "tasks" "errors" "scripts")
for dir in "${directories[@]}"; do
    if [[ -d "$dir" ]]; then
        echo "✅ /$dir exists"
    else
        echo "❌ /$dir missing"
        mkdir -p "$dir"
        echo "✅ Created /$dir"
    fi
done

echo "🎉 Bootstrap complete!"
echo "💡 Next steps:"
echo "   - npm run dev (start development server)"
echo "   - Check tasks/todo.md for current tasks"
echo "   - Review errors/debug.log for any issues"