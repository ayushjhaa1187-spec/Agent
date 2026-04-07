import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { z } from 'zod'

const updateAlertSchema = z.object({
  is_read: z.boolean(),
})

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params
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

  const parsed = updateAlertSchema.safeParse(body)
  if (!parsed.success) {
    return apiError(parsed.error.issues.map(i => i.message).join(', '), 400)
  }

  const { data, error } = await supabase
    .from('alerts')
    .update(parsed.data)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return apiError('Alert not found', 404)
  }

  return apiSuccess(data)
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { id } = await context.params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return apiError('Unauthorized', 401)
  }

  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return apiError('Failed to delete alert', 500)
  }

  return apiSuccess({ deleted: true })
}
