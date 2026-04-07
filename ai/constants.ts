import { type GatewayModelId } from '@ai-sdk/gateway'

export enum Models {
  AmazonNova2Pro = 'amazon/nova-2-pro',
  AnthropicClaudeSonnet46 = 'anthropic/claude-sonnet-4.6',
  AnthropicClaudeOpus46 = 'anthropic/claude-opus-4.6',
  GoogleGemini3Flash = 'google/gemini-3-flash',
  MoonshotKimiK25 = 'moonshotai/kimi-k2.5',
  OpenAIGPT52 = 'openai/gpt-5.2',
  XaiGrok41Fast = 'xai/grok-4.1-fast-non-reasoning',
}

export const DEFAULT_MODEL = Models.OpenAIGPT52

export const SUPPORTED_MODELS: GatewayModelId[] = [
  Models.OpenAIGPT52,
  Models.AmazonNova2Pro,
  Models.AnthropicClaudeSonnet46,
  Models.AnthropicClaudeOpus46,
  Models.GoogleGemini3Flash,
  Models.MoonshotKimiK25,
  Models.XaiGrok41Fast,
]

export const TEST_PROMPTS = [
  'What medications in my inventory are expiring within the next 30 days?',
  'How should I handle expired pharmaceutical stock?',
  'Help me optimize my pharmacy inventory levels for this quarter',
  'What are the best practices for batch tracking and FIFO management?',
]
