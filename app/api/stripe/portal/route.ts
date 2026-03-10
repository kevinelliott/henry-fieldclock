import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const body = await request.json()
  const { userId } = body

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const client = createServiceClient()
  const { data: sub, error } = await client
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (error || !sub?.stripe_customer_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
  }

  const stripe = getStripe()
  const origin = request.headers.get('origin') || 'http://localhost:3000'

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${origin}/dashboard/settings`,
  })

  return NextResponse.json({ url: session.url })
}
