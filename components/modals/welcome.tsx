'use client'

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { InfoIcon } from 'lucide-react'
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
      <div className="absolute w-full h-full bg-[#05070a]/90 backdrop-blur-xl transition-all duration-700" onClick={handleDismiss} />
      
      <div
        className="relative w-full max-w-xl bg-[#0a0c10] border border-white/5 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-500 ease-out"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-8 space-y-6">
          <div className="p-3 w-fit rounded-xl bg-primary/10 border border-primary/20 mb-4 animate-pulse">
            <InfoIcon className="text-primary w-6 h-6" />
          </div>

          <h1 className="text-3xl font-black tracking-tighter text-white uppercase font-mono">
            CORE_VIBE <span className="text-primary">AI</span>
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg font-medium text-slate-200 leading-relaxed font-sans">
              Welcome to the <strong>Neural_Coding_Environment</strong>.
            </p>
            <p className="text-sm text-slate-400 leading-6 font-mono">
              The next evolution in AI-driven development. Enter a text prompt, and the 
              Core_Vibe agent will architect a production-ready application within seconds.
            </p>
            
            <div className="pt-4 border-t border-white/5 space-y-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">INFRASTRUCTURE CORE</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Secure Sandbox', icon: '01' },
                  { label: 'GPT-5 Neural Links', icon: '02' },
                  { label: 'Fluid Compute Engine', icon: '03' },
                  { label: 'AI SDK v4 Runtime', icon: '04' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[8px] font-mono text-primary/40">{item.icon}</span>
                    <span className="text-[11px] font-mono text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-black/40 px-8 py-5 border-t border-white/5 flex justify-between items-center">
          <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest animate-pulse">Ready_to_initialize</span>
          <Button className="font-black uppercase tracking-widest text-xs px-8 py-5 bg-primary text-black hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/20" onClick={handleDismiss}>
            Initialize_Workspace
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
      <InfoIcon /> <span className="hidden lg:inline">What&apos;s this?</span>
    </Button>
  )
}

function ExternalLink({
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
