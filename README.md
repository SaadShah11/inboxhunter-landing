# InboxHunter Landing Page

The official landing page for **InboxHunter** - an AI-powered lead generation and email list automation application.

## Overview

This landing page provides:

- **Product information** - Learn about InboxHunter's features and capabilities
- **Download links** - Get the app for macOS, Windows, or Linux
- **Getting Started guides** - Step-by-step setup instructions
- **FAQ section** - Answers to common questions
- **Support resources** - Links to GitHub, Discord, and documentation

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool with HMR
- **Tailwind CSS 4** - Utility-first styling via `@tailwindcss/vite`
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository (if not already done)
cd inboxhunter-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
inboxhunter-landing/
├── public/
│   └── favicon.svg          # App favicon
├── src/
│   ├── App.tsx               # Main landing page component
│   ├── App.css               # App-specific styles
│   ├── index.css             # Global styles + Tailwind
│   └── main.tsx              # React entry point
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

## Page Sections

1. **Navbar** - Fixed navigation with responsive mobile menu
2. **Hero** - Headline, CTA buttons, stats, and app preview mockup
3. **Features** - 6 feature cards highlighting AI capabilities
4. **How It Works** - 4-step visual process guide
5. **Download** - Platform-specific download buttons
6. **Getting Started** - Interactive tabbed installation guide
7. **FAQ** - Accordion-style frequently asked questions
8. **Support** - Links to community and documentation
9. **Footer** - Navigation and copyright

## Design System

The landing page uses the same design language as the InboxHunter app:

- **Colors**: Dark background with blue-to-purple gradients
- **Typography**: Inter font family
- **Effects**: Glass morphism, grid backgrounds, glow effects
- **Animations**: Scroll-triggered reveals using Framer Motion

### CSS Custom Properties

```css
--background: 240 10% 4%;      /* Near black */
--foreground: 0 0% 98%;        /* White */
--primary: 217 91% 60%;        /* Blue */
--accent: 262 83% 58%;         /* Purple */
--muted-foreground: 240 5% 65%; /* Gray text */
--border: 240 5% 17%;          /* Subtle borders */
```

## Customization

### Update Download Links

Edit the `platforms` array in the `DownloadSection` component in `src/App.tsx`:

```tsx
const platforms = [
  {
    name: 'macOS',
    icon: Apple,
    version: 'v1.0.0',
    size: '85 MB',
    file: 'InboxHunter-1.0.0-macos.dmg',
    available: true
  },
  // ...
]
```

### Update FAQ Content

Edit the `faqs` array in the `FAQSection` component:

```tsx
const faqs = [
  {
    question: 'Your question here?',
    answer: 'Your answer here.'
  },
  // ...
]
```

### Update Support Links

Edit the `supportOptions` array in the `SupportSection` component to add your actual GitHub, Discord, and documentation URLs.

## Deployment

This is a static site that can be deployed to any hosting platform:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your Git repository
- **GitHub Pages**: Use the `gh-pages` branch
- **Cloudflare Pages**: Connect your repository

## Related Projects

- **[inboxhunter-app](../inboxhunter-app)** - The main Tauri desktop application
- **[Reverse-Outreach-AutomationBot](../inboxhunter-app/Reverse-Outreach-AutomationBot)** - Python automation engine

## License

MIT License - See the main project repository for details.
