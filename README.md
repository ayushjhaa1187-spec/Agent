<p align="center">
  <h1 align="center">StockSense Agent</h1>
  <p align="center">An AI-powered vibe coding platform that turns natural language prompts into full-stack applications, built with the Vercel AI SDK and sandbox execution environment.</p>
</p>

<p align="center">
  <a href="https://vibe-coding-platform-brown-two.vercel.app"><img src="https://img.shields.io/badge/Live-Demo-01696f?style=for-the-badge" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
</p>

---

## What It Does

StockSense Agent is a browser-based coding assistant. You describe the application you want in plain English, and the AI agent:

1. Creates a secure cloud sandbox (Vercel Sandbox)
2. Generates all necessary files (components, configs, styles)
3. Installs dependencies and starts a dev server
4. Provides a live preview URL of the running application
5. Automatically detects and fixes build errors

It supports multiple AI models (GPT-5.2, Claude Opus 4.6, Gemini 3 Flash, and more) and provides a split-panel IDE experience with chat, live preview, file explorer, and command logs.

## Features

- [x] **AI Code Generation** --- Describe an app in natural language and get a working project
- [x] **Multi-Model Support** --- Switch between GPT-5.2, Claude Sonnet/Opus, Gemini Flash, Grok, and more
- [x] **Vercel Sandbox Execution** --- Isolated cloud environments with live preview URLs
- [x] **Split-Panel IDE** --- Resizable panels for chat, preview, file explorer, and logs
- [x] **Auto Error Fix** --- Monitors build errors and sends them back to the AI for correction
- [x] **Syntax Highlighting** --- Full language support in the file explorer
- [x] **Mobile Responsive** --- Tab-based layout for mobile, split panels for desktop
- [x] **Dark / Light Mode** --- Toggle between themes with system preference detection

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| AI | Vercel AI SDK 6.0 (Gateway) |
| Models | GPT-5.2, Claude Opus 4.6, Gemini 3 Flash, Grok 4.1 |
| Execution | Vercel Sandbox |
| UI | Radix UI, Tailwind CSS 4, Lucide Icons |
| State | Zustand |
| Validation | Zod |
| Bot Protection | BotID |

## Getting Started

### Prerequisites

- Node.js 22.x
- pnpm (recommended) or npm

### Installation

```bash
git clone https://github.com/ayushjhaa1187-spec/stocksense-agent.git
cd stocksense-agent
pnpm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| :--- | :---: | :--- |
| `AI_GATEWAY_BASE_URL` | Yes | Vercel AI Gateway endpoint URL |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

## API Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/chat` | Main AI chat endpoint (streams responses) |
| `POST` | `/api/errors` | Error analysis endpoint for auto-fix |
| `GET` | `/api/models` | Returns available AI models |
| `GET` | `/api/sandboxes/[id]` | Check sandbox status |
| `GET` | `/api/sandboxes/[id]/files` | Get sandbox file contents |
| `GET` | `/api/sandboxes/[id]/cmds/[cmdId]/logs` | Stream command logs |

## Project Structure

```
├── ai/                    # AI configuration and tools
│   ├── constants.ts       # Model definitions, supported models
│   ├── gateway.ts         # AI Gateway provider setup
│   ├── messages/          # Data part and metadata schemas
│   └── tools/             # Sandbox tools (create, files, run, URL)
├── app/                   # Next.js App Router
│   ├── api/               # API routes (chat, errors, models, sandboxes)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main IDE page
│   ├── chat.tsx           # Chat panel component
│   ├── not-found.tsx      # Custom 404 page
│   └── globals.css        # Design system CSS variables
├── components/            # UI components
│   ├── chat/              # Chat message rendering
│   ├── commands-logs/     # Command log streaming
│   ├── error-monitor/     # Auto error detection
│   ├── file-explorer/     # Sandbox file browser
│   ├── layout/            # Resizable panel layout
│   ├── preview/           # Live preview iframe
│   ├── settings/          # Model and settings controls
│   └── ui/                # Radix UI primitives
└── lib/                   # Shared utilities
```

## License

MIT &copy; 2026 Ayush Kumar Jha
