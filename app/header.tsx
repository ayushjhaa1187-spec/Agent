'use client'

import { ToggleWelcome } from '@/components/modals/welcome'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon, CodeIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
}

export function Header({ className }: Props) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className={cn('sticky top-0 z-20 flex items-center justify-between px-4 py-2.5 bg-card/80 backdrop-blur-md border-b border-border', className)}>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
          <CodeIcon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground leading-none">
            StockSense Agent
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5">
            AI Coding Platform
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Online</span>
        </div>

        {mounted && (
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer h-8 w-8 p-0"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </Button>
        )}

        <ToggleWelcome />
      </div>
    </header>
  )
}
