'use client'

import type { ChatUIMessage } from '@/components/chat/types'
import { TEST_PROMPTS } from '@/ai/constants'
import { MessageCircleIcon, SendIcon, Trash2Icon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Input } from '@/components/ui/input'
import { Message } from '@/components/chat/message'
import { ModelSelector } from '@/components/settings/model-selector'
import { Panel, PanelHeader } from '@/components/panels/panels'
import { cn } from "@/lib/utils";
import { Settings } from '@/components/settings/settings'
import { useChat } from '@ai-sdk/react'
import { useLocalStorageValue } from '@/lib/use-local-storage-value'
import { useCallback, useEffect, useRef } from 'react'
import { useSharedChatContext } from '@/lib/chat-context'
import { useSettings } from '@/components/settings/use-settings'
import { useSandboxStore } from './state'
import { toast } from 'sonner'

interface Props {
  className: string
  modelId?: string
}

function sanitizeInput(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
}

export function Chat({ className }: Props) {
  const [input, setInput] = useLocalStorageValue('prompt-input')
  const { chat } = useSharedChatContext()
  const { modelId, reasoningEffort } = useSettings()
  const { messages, sendMessage, status, setMessages } = useChat<ChatUIMessage>({ chat })
  const { setChatStatus } = useSandboxStore()
  const chatIdRef = useRef<string | null>(null)

  const validateAndSubmitMessage = useCallback(
    (text: string) => {
      const sanitized = sanitizeInput(text)
      if (sanitized) {
        sendMessage({ text: sanitized }, { body: { modelId, reasoningEffort } })
        setInput('')
      }
    },
    [sendMessage, modelId, setInput, reasoningEffort]
  )

  const handleClearConversation = useCallback(() => {
    setMessages([])
    chatIdRef.current = null
    toast.success('Conversation cleared')
  }, [setMessages])

  // Save chat history to Supabase when messages change
  useEffect(() => {
    if (messages.length === 0 || status !== 'ready') return

    const saveChatHistory = async () => {
      const simplifiedMessages = messages
        .filter(m => m.parts.some(p => p.type === 'text'))
        .map(m => ({
          role: m.role,
          content: m.parts
            .filter(p => p.type === 'text')
            .map(p => (p as { type: 'text'; text: string }).text)
            .join(''),
        }))
        .filter(m => m.content.length > 0)

      if (simplifiedMessages.length === 0) return

      const title = simplifiedMessages[0]?.content?.slice(0, 100) || 'New conversation'

      try {
        if (chatIdRef.current) {
          await fetch(`/api/chat-history/${chatIdRef.current}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: simplifiedMessages, title }),
          })
        } else {
          const res = await fetch('/api/chat-history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: simplifiedMessages, title }),
          })
          const result = await res.json()
          if (result.success && result.data?.id) {
            chatIdRef.current = result.data.id
          }
        }
      } catch {
        // Silently fail — chat persistence is non-critical
      }
    }

    const timeout = setTimeout(saveChatHistory, 2000)
    return () => clearTimeout(timeout)
  }, [messages, status])

  useEffect(() => {
    setChatStatus(status)
  }, [status, setChatStatus])

  const isGenerating = status === 'streaming' || status === 'submitted'

  return (
    <Panel className={cn('bg-[#05070a]/50 backdrop-blur-sm border-r border-white/5', className)}>
      <PanelHeader className="border-b border-white/5 bg-black/20">
        <div className="flex items-center font-mono font-black uppercase text-[11px] tracking-[0.2em] text-white">
          <MessageCircleIcon className="mr-2 w-3.5 h-3.5 text-primary" />
          StockSense_AI
        </div>
        <div className="ml-auto flex items-center gap-2">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearConversation}
              disabled={isGenerating}
              className="h-6 px-2 text-slate-500 hover:text-white hover:bg-white/5"
              title="Clear conversation"
            >
              <Trash2Icon className="w-3 h-3" />
            </Button>
          )}
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest leading-none">[{status}]</span>
        </div>
      </PanelHeader>

      {/* Messages Area */}
      {messages.length === 0 ? (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <MessageCircleIcon className="w-12 h-12 text-primary relative z-10 opacity-50" />
          </div>

          <h3 className="text-white font-black uppercase tracking-tighter text-lg mb-2">StockSense AI</h3>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mb-8">Your pharmacy inventory assistant</p>

          <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
            {TEST_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className="group relative flex items-center text-left px-4 py-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-300"
                onClick={() => validateAndSubmitMessage(prompt)}
              >
                <span className="text-[10px] font-mono text-primary/40 mr-4 font-bold group-hover:text-primary transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors truncate">{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Conversation className="relative w-full">
          <ConversationContent className="space-y-6 p-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isGenerating && (
              <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-[10px] uppercase tracking-widest">StockSense AI is thinking...</span>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      )}

      <div className="p-3 bg-black/40 border-t border-white/5">
        <form
          className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all focus-within:border-primary/50"
          onSubmit={async (event) => {
            event.preventDefault()
            validateAndSubmitMessage(input)
          }}
        >
          <div className="flex items-center gap-1.5 px-1 border-r border-white/10">
            <Settings className="scale-75 opacity-60 hover:opacity-100 transition-opacity" />
            <ModelSelector className="scale-90" />
          </div>
          <Input
            className="flex-1 bg-transparent border-none text-white font-mono text-sm placeholder:text-slate-600 focus-visible:ring-0"
            disabled={isGenerating}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your pharmacy inventory..."
            value={input}
          />
          <Button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="h-10 w-10 p-0 rounded-lg bg-primary text-black hover:bg-white transition-all shadow-lg shadow-primary/10 disabled:opacity-20"
          >
            <SendIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Panel>
  )
}
