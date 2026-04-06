'use client'

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { InfoIcon, CodeIcon, CpuIcon, GlobeIcon, ZapIcon } from 'lucide-react'
import { create } from 'zustand'
import { useEffect } from 'react'

interface State {
  open: boolean | undefined
  setOpen: (open: boolean) => void
}

export const useWelcomeStore = create<State>((set) => ({
  open: undefined,
  setOpen: (open) => set({ open }),
}))

export function Welcome(props: {
  onDismissAction(): void
  defaultOpen: boolean
}) {
  const { open, setOpen } = useWelcomeStore()

  useEffect(() => {
    setOpen(props.defaultOpen)
  }, [setOpen, props.defaultOpen])

  if (!(typeof open === 'undefined' ? props.defaultOpen : open)) {
    return null
  }

  const handleDismiss = () => {
    props.onDismissAction()
    setOpen(false)
  }

  return (
    <div className="fixed w-screen h-screen z-10 flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-background/80 backdrop-blur-sm transition-all duration-300" onClick={handleDismiss} />

      <div
        className="relative w-full max-w-xl bg-card border border-border shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-300 ease-out"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-8 space-y-5">
          <div className="p-2.5 w-fit rounded-xl bg-primary/10 border border-primary/20">
            <CodeIcon className="text-primary w-5 h-5" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            StockSense Agent
          </h1>

          <div className="space-y-3">
            <p className="text-base text-foreground/80 leading-relaxed">
              An AI-powered coding platform that turns your ideas into working applications.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Describe the app you want to build, and the AI agent will create a sandbox, generate
              code, install dependencies, and give you a live preview — all in seconds.
            </p>

            <div className="pt-4 border-t border-border space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Capabilities</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Cloud Sandboxes', icon: GlobeIcon },
                  { label: 'Multi-Model AI', icon: CpuIcon },
                  { label: 'Live Preview', icon: ZapIcon },
                  { label: 'Auto Error Fix', icon: CodeIcon },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 border border-border">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-foreground/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-muted/50 px-8 py-4 border-t border-border flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Ready to start</span>
          <Button
            className="font-medium text-sm px-6"
            onClick={handleDismiss}
          >
            Get started
          </Button>
        </footer>
      </div>
    </div>
  )
}

export function ToggleWelcome() {
  const { open, setOpen } = useWelcomeStore()
  return (
    <Button
      className="cursor-pointer"
      onClick={() => setOpen(!open)}
      variant="outline"
      size="sm"
    >
      <InfoIcon className="w-4 h-4" /> <span className="hidden lg:inline">About</span>
    </Button>
  )
}

export function ExternalLink({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  return (
    <a
      className="underline underline-offset-3 text-primary"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
