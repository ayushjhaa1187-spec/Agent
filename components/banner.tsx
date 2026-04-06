'use client'

import { XIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  defaultOpen: boolean
  onDismiss: () => void
}

export function Banner({ defaultOpen, onDismiss }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  if (!open) {
    return null
  }

  return (
    <div className="relative full text-xs border border-dashed border-amber-400 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 py-2 pl-2 pr-8 text-foreground">
      <strong>StockSense Agent</strong> — This is an AI coding platform built with
      Vercel&apos;s AI SDK, AI Gateway, and Next.js, with code execution via Vercel Sandbox.
      <button
        aria-label="Close Banner"
        className="absolute top-2 right-2 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors cursor-pointer"
        onClick={() => {
          onDismiss()
          setOpen(false)
        }}
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  )
}
