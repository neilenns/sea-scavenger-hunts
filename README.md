# SEA Scavenger Hunts

SEA Scavenger Hunts is a Next.js 15 web application for interactive scavenger hunts at Seattle-Tacoma International Airport (SEA). The app features internationalization (English/French), deploys to Cloudflare via OpenNext, and provides a mobile-first experience for airport visitors.

## 🌟 Features

- **Interactive Scavenger Hunts**: Explore different areas of SEA Airport with engaging clues and challenges
- **Multi-language Support**: Available in English, French, Spanish, and German
- **Mobile-First Design**: Optimized for phones and tablets for use while traveling
- **Offline Capable**: Answers are saved locally in the browser
- **Accessible**: ARIA labels and keyboard navigation support
- **Theme Support**: Light, dark, and system theme modes

## 🚀 Getting Started with VS Code Dev Containers

The recommended way to develop this project is using VS Code with Dev Containers, which provides a consistent development environment.

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Setup Instructions

1. **Clone the repository in a dev container**:
   - Open VS Code
   - Use Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Select "Dev Containers: Clone Repository in Container Volume..."
   - Enter: `https://github.com/neilenns/sea-scavenger-hunts.git`

2. **Wait for setup**: The dev container will automatically:
   - Install Node.js 22.18.0
   - Set up pnpm package manager
   - Install all dependencies
   - Configure development tools

3. **Start developing**: Once the container is ready, you can start the development server:
   ```bash
   pnpm run dev
   ```

4. **Debug your code**: Press `F5` to start debugging with breakpoints and step-through debugging.

The app will be available at http://localhost:3000 and will automatically redirect to `/en` for the English version.

## 🔧 Local Development (Without Dev Containers)

If you prefer to develop without Docker, you can set up the project locally:

### Prerequisites

- Node.js 22.18.0 (check `.nvmrc` file)
- pnpm 10.14.0+

### Setup

1. **Install the correct Node.js version**:
   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   nvm install && nvm use
   ```

2. **Enable corepack and install dependencies**:
   ```bash
   corepack enable
   pnpm install --frozen-lockfile
   ```

### Development Commands

- **Start development server**: `pnpm run dev` (starts in ~2.7 seconds)
- **Build for production**: `pnpm run build` (takes ~22 seconds)
- **Start production server**: `pnpm run start`
- **Lint code**: `pnpm run lint` (required before commits)
- **Build for Cloudflare**: `pnpm run ci` (builds for deployment)

### Build Notes

⚠️ **Production builds may fail** in restricted network environments due to Google Fonts access. This is expected and the build will work in CI/CD environments.

## 📝 Adding New Clues

Adding new scavenger hunt clues involves three main steps: creating the clue data, adding translations, and optionally adding clue images.

### Step 1: Add Clue Data

1. **Open the clues file**:
   ```
   src/data/post-security-clues.ts
   ```

2. **Add your new clue** to the `postSecurityClues` array:
   ```typescript
   {
     id: "unique-clue-id", // Generate using nanoid VSCode plugin (installed in dev container)
     airportArea: AirportArea.CONCOURSE_A, // Choose appropriate area
     answer: { type: AnswerType.TEXT }, // or AnswerType.IMAGE with expectedImageCount
     type: ClueType.TEXT, // or ClueType.IMAGE if you want to show an image with the clue
   },
   ```

3. **Airport Areas available**:
   - `AirportArea.AIRPORT_WIDE` - Clues that can be found anywhere
   - `AirportArea.CENTRAL_TERMINAL` - Main terminal area
   - `AirportArea.CONCOURSE_A` through `AirportArea.CONCOURSE_D` - Specific concourses
   - `AirportArea.NORTH_SATELLITE` - North satellite terminal
   - `AirportArea.SOUTH_SATELLITE` - South satellite terminal

### Step 2: Add Translations

1. **Open translation files**:
   - `messages/en.json` (English - required)
   - `messages/fr.json` (French - required)
   - Add to other language files as needed

2. **Add your clue translations** under the `post-security.clues` section:
   ```json
   "post-security": {
     "clues": {
       "unique-clue-id": {
         "clue": "Your clue text here",
         "hint": "Optional hint text",
         "alternateText": "Alt text for images (if using ClueType.IMAGE)",
         "answer": {
           "answer": "The answer to the clue",
           "details": "Optional detailed explanation in **markdown**"
         }
       }
     }
   }
   ```

### Step 3: Add Clue Images (Optional)

If using `ClueType.IMAGE`, add your image:

1. **Add the image file**:
   ```
   public/clue-images/{clue-id}.jpg
   ```

2. **Image requirements**:
   - Format: JPG
   - Filename: Must match your clue ID exactly
   - Size: Optimized for web (recommended max 800px wide)
   - Aspect ratio: 16:9 works best for the display

### Step 4: Test Your Changes

1. **Start the development server**:
   ```bash
   pnpm run dev
   ```

2. **Navigate to the scavenger hunt**:
   ```
   http://localhost:3000/en/post-security
   ```

3. **Verify your clue**:
   - Check it appears in the correct airport area section
   - Test the answer functionality
   - Verify translations work by switching languages
   - Ensure images display correctly (if applicable)

### Clue ID Generation

Generate unique clue IDs using the nanoid VSCode plugin (automatically installed in the dev container):

1. **Place your cursor** where you need a new ID
2. **Use Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. **Select "Nanoid: Generate"** to insert a unique ID

## 🏗️ Project Structure

```
sea-scavenger-hunts/
├── src/
│   ├── app/[locale]/              # Next.js App Router with i18n
│   │   ├── layout.tsx            # Root layout with fonts and providers
│   │   ├── page.tsx              # Homepage
│   │   └── post-security/        # Main scavenger hunt feature
│   ├── components/               # Reusable React components
│   │   ├── ui/                  # shadcn/ui components (DO NOT modify)
│   │   ├── theme-provider.tsx   # Theme switching logic
│   │   └── language-switcher.tsx # Internationalization controls
│   ├── data/                    # Static data and clue definitions
│   │   └── post-security-clues.ts # All scavenger hunt clues
│   ├── i18n/                    # Internationalization configuration
│   ├── types/                   # TypeScript type definitions
│   │   ├── clue.ts             # Core clue and airport area types
│   │   └── cloudflare-env.d.ts # Auto-generated Cloudflare types
│   └── middleware.ts            # Next.js middleware for i18n routing
├── messages/                    # Translation files
│   ├── en.json                 # English translations
│   ├── fr.json                 # French translations
│   └── ...                     # Other language files
├── public/                     # Static assets
│   └── clue-images/           # Clue images (named by clue ID)
├── .devcontainer/             # VS Code dev container configuration
└── Configuration files...
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS 4 with shadcn/ui components
- **Internationalization**: next-intl
- **Deployment**: OpenNext for Cloudflare Workers
- **Package Manager**: pnpm 10.14.0
- **Development Environment**: VS Code Dev Containers

## 🚀 Deployment

- **Development**: Deploys to `sea-hunts-dev.neilenns.com`
- **Production**: Deploys to `sea-hunts.neilenns.com`
- **Platform**: Cloudflare Workers with static assets
- **CI/CD**: GitHub Actions workflows in `.github/workflows/`

### Manual Deployment Commands

```bash
# Preview deployment
pnpm run cf-preview

# Deploy to production (requires DEPLOY_ENV environment variable)
DEPLOY_ENV=prod pnpm run cf-deploy

# Populate Cloudflare cache
pnpm run cf-populate
```

## 🧪 Testing

Currently, the project relies on manual testing. Before committing changes:

1. **Run linting** (required):
   ```bash
   pnpm run lint
   ```

2. **Test functionality manually**:
   - Start dev server: `pnpm run dev`
   - Navigate to http://localhost:3000/en/post-security
   - Verify clue navigation, answers, language switching, and themes

3. **Test builds**:
   ```bash
   pnpm run build  # Test standard Next.js build
   pnpm run ci     # Test Cloudflare deployment build
   ```

## 🤝 Contributing

1. **Clone the repository** and set up the dev container (see setup instructions above)
2. **Create a feature branch** from `main`
3. **Make your changes** following the minimal-change principle
4. **Run linting**: `pnpm run lint` (CI will fail without this)
5. **Test manually** using the development server
6. **Create a pull request** with a clear description of changes

### Key Guidelines

- Make minimal, surgical changes to existing files
- Always run linting before committing
- Test your changes manually in the browser
- Add translations for all supported languages when adding new text
- Follow existing code patterns and styling

## 📄 License

This project is licensed under the MIT License.
