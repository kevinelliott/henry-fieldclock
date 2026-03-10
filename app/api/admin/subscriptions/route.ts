export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

function checkAdminKey(request: Request) {
  const adminKey = request.headers.get('x-admin-key')
  if (process.env.ADMIN_API_KEY && adminKey !== process.env.ADMIN_API_KEY) {
    return false
  }
  return true
}

export async function GET(request: Request) {
  if (!checkAdminKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan')
  const status = searchParams.get('status')

  const client = createServiceClient()

  let query = client
    .from('subscriptions')
    .select('id, user_id, stripe_customer_id, stripe_subscription_id, plan, status, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (plan) query = query.eq('plan', plan)
  if (status) query = query.eq('status', status)

  const { data, error } = await query.limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ subscriptions: data })
}
