'use client'

import type { ChatUIMessage } from '@/components/chat/types'
import { TEST_PROMPTS } from '@/ai/constants'
import { MessageCircleIcon, SendIcon } from 'lucide-react'
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
import { useCallback, useEffect } from 'react'
import { useSharedChatContext } from '@/lib/chat-context'
import { useSettings } from '@/components/settings/use-settings'
import { useSandboxStore } from './state'

interface Props {
  className: string
  modelId?: string
}

export function Chat({ className }: Props) {
  const [input, setInput] = useLocalStorageValue('prompt-input')
  const { chat } = useSharedChatContext()
  const { modelId, reasoningEffort } = useSettings()
  const { messages, sendMessage, status } = useChat<ChatUIMessage>({ chat })
  const { setChatStatus } = useSandboxStore()

  const validateAndSubmitMessage = useCallback(
    (text: string) => {
      if (text.trim()) {
        sendMessage({ text }, { body: { modelId, reasoningEffort } })
        setInput('')
      }
    },
    [sendMessage, modelId, setInput, reasoningEffort]
  )

  useEffect(() => {
    setChatStatus(status)
  }, [status, setChatStatus])

  return (
    <Panel className={cn('bg-card border-border', className)}>
      <PanelHeader className="border-b border-border bg-muted/50">
        <div className="flex items-center text-sm font-medium text-foreground">
          <MessageCircleIcon className="mr-2 w-4 h-4 text-primary" />
          Chat
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full',
            status === 'streaming' || status === 'submitted' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
          )} />
          <span className="text-xs text-muted-foreground capitalize">{status}</span>
        </div>
      </PanelHeader>

      {/* Messages Area */}
      {messages.length === 0 ? (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-6">
            <MessageCircleIcon className="w-10 h-10 text-muted-foreground/40" />
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1">Start a conversation</h3>
          <p className="text-sm text-muted-foreground mb-6">Describe the application you want to build</p>

          <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
            {TEST_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className="group flex items-center text-left px-4 py-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 hover:bg-accent transition-all"
                onClick={() => validateAndSubmitMessage(prompt)}
              >
                <span className="text-xs text-muted-foreground mr-3">{idx + 1}.</span>
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors truncate">{prompt}</span>
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
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      )}

      <div className="p-3 border-t border-border bg-muted/30">
        <form
          className="flex items-center gap-2 p-1.5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20"
          onSubmit={async (event) => {
            event.preventDefault()
            validateAndSubmitMessage(input)
          }}
        >
          <div className="flex items-center gap-1.5 px-1 border-r border-border">
            <Settings className="scale-90 opacity-70 hover:opacity-100 transition-opacity" />
            <ModelSelector className="scale-90" />
          </div>
          <Input
            className="flex-1 bg-transparent border-none text-foreground text-sm placeholder:text-muted-foreground focus-visible:ring-0"
            disabled={status === 'streaming' || status === 'submitted'}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            value={input}
          />
          <Button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="h-9 w-9 p-0 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <SendIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Panel>
  )
}
