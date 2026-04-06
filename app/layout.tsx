import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ChatProvider } from '@/lib/chat-context'
import { CommandLogsStream } from '@/components/commands-logs/commands-logs-stream'
import { ErrorMonitor } from '@/components/error-monitor/error-monitor'
import { SandboxState } from '@/components/modals/sandbox-state'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const title = 'StockSense Agent'
const description = 'An AI-powered coding platform that turns natural language prompts into full-stack applications using Vercel AI SDK and cloud sandboxes.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | StockSense Agent`
  },
  description,
  openGraph: {
    images: [
      {
        url: 'https://assets.vercel.com/image/upload/v1754588799/OSSvibecodingplatform/OG.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://assets.vercel.com/image/upload/v1754588799/OSSvibecodingplatform/OG.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <NuqsAdapter>
              <ChatProvider>
                <ErrorMonitor>{children}</ErrorMonitor>
              </ChatProvider>
            </NuqsAdapter>
          </Suspense>
          <Toaster />
          <CommandLogsStream />
          <SandboxState />
        </ThemeProvider>
      </body>
    </html>
  )
}
