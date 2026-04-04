import { ToggleWelcome } from '@/components/modals/welcome'
import { VercelDashed } from '@/components/icons/vercel-dashed'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-white/5', className)}>
      <div className="flex items-center gap-3">
        <VercelDashed className="w-5 h-5 text-primary animate-pulse" />
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-tighter text-white uppercase leading-none">
            CORE_VIBE <span className="text-primary">AI</span>
          </span>
          <span className="text-[9px] font-mono font-medium text-slate-500 tracking-[0.2em] uppercase mt-1">
            Neural_Engine_v1.0.4
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">System_Online</span>
        </div>
        <ToggleWelcome />
      </div>
    </header>
  )
}
