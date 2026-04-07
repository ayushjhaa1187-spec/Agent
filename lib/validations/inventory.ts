import { z } from 'zod'

export const inventoryItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  batch_number: z.string().max(100).optional(),
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  category: z.string().min(1, 'Category is required').max(100),
  status: z.enum(['active', 'expired', 'expiring_soon']).default('active'),
  notes: z.string().max(1000).optional(),
})

export const inventoryUpdateSchema = inventoryItemSchema.partial()

export const alertSchema = z.object({
  item_id: z.string().uuid().optional(),
  alert_type: z.enum(['expiry_warning', 'expired', 'low_stock']),
  message: z.string().min(1, 'Message is required').max(1000),
  is_read: z.boolean().default(false),
})

export const chatHistorySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
  title: z.string().max(255).optional(),
})

export type InventoryItem = z.infer<typeof inventoryItemSchema>
export type InventoryUpdate = z.infer<typeof inventoryUpdateSchema>
export type Alert = z.infer<typeof alertSchema>
export type ChatHistory = z.infer<typeof chatHistorySchema>
