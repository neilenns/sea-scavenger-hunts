# SEA Scavenger Hunts

SEA Scavenger Hunts is a Next.js 15 web application for interactive scavenger hunts at Seattle-Tacoma International Airport (SEA). The app features internationalization (English/French), deploys to Cloudflare via OpenNext, and provides a mobile-first experience for airport visitors.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Setup

- **CRITICAL**: Install Node.js 22.18.0 (specified in `.nvmrc`):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install && nvm use
  ```
- Enable corepack for pnpm: `corepack enable`
- Install dependencies: `pnpm install --frozen-lockfile` -- takes 36 seconds. Set timeout to 90+ seconds.

### Build and Development Commands

- **Development server**: `pnpm run dev` -- starts in 2.7 seconds on http://localhost:3000
- **Production build**: `pnpm run build` -- takes 22 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
  - **CRITICAL BUILD ISSUE**: Build fails with Google Fonts network access. This is expected in restricted environments.
  - **WORKAROUND**: Temporarily replace Google Fonts imports in `src/app/[locale]/layout.tsx` with system fonts for testing.
- **CI build**: `pnpm run ci` -- takes 32 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
  - Calls `opennextjs-cloudflare build --env=dev` to build for Cloudflare deployment.
- **Production server**: `pnpm run start` -- starts in 442ms
- **Linting**: `pnpm run lint` -- takes 3.5 seconds
- **Cloudflare type generation**: `pnpm run cf-typegen` -- takes 1.3 seconds

### Cloudflare Deployment Commands

- **Preview deployment**: `pnpm run cf-preview` -- builds and previews on Cloudflare
- **Deploy**: `pnpm run cf-deploy` -- requires DEPLOY_ENV environment variable
- **Cache population**: `pnpm run cf-populate` -- populates Cloudflare cache

## Validation

### Essential Testing Scenarios

Always manually validate changes by running through these complete scenarios:

1. **Basic functionality test**:
   - Start dev server: `pnpm run dev`
   - Navigate to http://localhost:3000 (redirects to /en)
   - Verify homepage loads with "SEA scavenger hunts" title
   - Navigate to `/en/post-security` for full scavenger hunt interface

2. **Scavenger hunt functionality**:
   - Verify sidebar navigation between airport areas (Airport-wide, Concourses A-D, North/South Satellite, Central Terminal)
   - Test clue accordion expansion/collapse
   - Verify language switching between English/French
   - Test theme switching (light/dark/system)
   - Confirm answer storage works (stored locally in browser)

3. **Multi-language support**:
   - Test both `/en/` and `/fr/` routes
   - Verify language switcher functionality
   - Confirm translations load properly

### Build Validation

- **CRITICAL**: Always run `pnpm run lint` before committing - CI will fail otherwise
- Test both development and production builds
- Verify Cloudflare build succeeds for deployment readiness
- There is no need to re-generate Cloudflare types on each build

### Known Issues and Workarounds

- **Google Fonts Build Failure**: Production builds fail when Google Fonts cannot be accessed. This is normal in restricted network environments.
  - **Solution**: Use system fonts temporarily for testing, or ensure network access to fonts.googleapis.com
- **No Tests**: Project currently has no test scripts - focus on manual validation
- **Port Conflicts**: Dev server will use next available port if 3000 is busy

## Common Tasks

### Development Workflow

1. **Starting development**:

   ```bash
   nvm use                    # Ensure correct Node.js version
   pnpm install              # Install dependencies if needed
   pnpm run dev               # Start development server
   ```

2. **Before committing changes**:

   ```bash
   pnpm run lint              # Required - CI will fail without this
   ```

3. **Testing builds**:
   ```bash
   pnpm run build             # Test standard Next.js build
   pnpm run ci                # Test Cloudflare deployment build
   ```

### Key Project Structure

```
src/
├── app/[locale]/              # Next.js App Router with i18n
│   ├── layout.tsx            # Root layout with fonts and providers
│   ├── page.tsx              # Homepage
│   └── post-security/        # Main scavenger hunt feature
├── components/               # Reusable React components
│   ├── ui/                  # shadcn/ui components (DO NOT modify)
│   ├── theme-provider.tsx   # Theme switching logic
│   └── language-switcher.tsx # Internationalization controls
├── data/                    # Static data and clue definitions
│   └── post-security-clues.ts # All scavenger hunt clues
├── i18n/                    # Internationalization configuration
├── types/                   # TypeScript type definitions
│   ├── clue.ts             # Core clue and airport area types
│   └── cloudflare-env.d.ts # Auto-generated Cloudflare types
└── middleware.ts            # Next.js middleware for i18n routing
```

### Important Configuration Files

- `package.json` - Dependencies and scripts (pnpm workspace)
- `next.config.ts` - Next.js configuration with next-intl
- `open-next.config.ts` - OpenNext Cloudflare configuration
- `wrangler.jsonc` - Cloudflare Workers configuration
- `eslint.config.mjs` - ESLint configuration (flat config)
- `tsconfig.json` - TypeScript configuration
- `.nvmrc` - Node.js version specification (22.18.0)

### Frequent File Locations

- **Clue definitions**: `src/data/post-security-clues.ts`
- **Translations**: `messages/en.json`, `messages/fr.json`
- **Theme configuration**: `src/components/theme-provider.tsx`
- **Airport area definitions**: `src/types/clue.ts`
- **Main scavenger hunt page**: `src/app/[locale]/post-security/page.tsx`
- **Layout and fonts**: `src/app/[locale]/layout.tsx`

### Deployment Information

- **Development**: Deploys to `sea-hunts-dev.neilenns.com`
- **Production**: Deploys to `sea-hunts.neilenns.com`
- **Platform**: Cloudflare Workers with static assets
- **CI/CD**: GitHub Actions workflows in `.github/workflows/`

## Architecture Notes

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Styling**: TailwindCSS 4 with shadcn/ui components
- **Internationalization**: next-intl
- **Deployment**: OpenNext for Cloudflare Workers
- **Package Manager**: pnpm 10.14.0
- **Development Environment**: VS Code Dev Containers

### Key Features

- **Server-Side Generation**: Static generation for optimal performance
- **Internationalization**: English and French support with URL-based routing
- **Responsive Design**: Mobile-first design for airport usage
- **Local Storage**: Answers saved in browser, no server storage
- **Theme Support**: Light, dark, and system theme modes
- **Accessibility**: ARIA labels and keyboard navigation support
