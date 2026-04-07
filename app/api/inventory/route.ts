import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { inventoryItemSchema } from '@/lib/validations/inventory'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return apiError('Unauthorized', 401)
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('user_id', user.id)
    .order('expiry_date', { ascending: true })

  if (error) {
    return apiError(error.message, 500)
  }

  return apiSuccess(data)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return apiError('Unauthorized', 401)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError('Invalid JSON body', 400)
  }

  const parsed = inventoryItemSchema.safeParse(body)
  if (!parsed.success) {
    return apiError(parsed.error.issues.map(i => i.message).join(', '), 400)
  }

  const { data, error } = await supabase
    .from('inventory_items')
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single()

  if (error) {
    return apiError(error.message, 500)
  }

  return apiSuccess(data, 201)
}
