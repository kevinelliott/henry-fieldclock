export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const stripe = getStripe()
  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const client = createServiceClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as {
      id: string
      customer: string
      subscription: string
      metadata: { userId?: string; plan?: string }
    }
    const userId = session.metadata?.userId
    const plan = session.metadata?.plan ?? 'starter'

    if (userId) {
      await client.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        plan,
        status: 'active',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
    }
  }

  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as {
      id: string
      status: string
      customer: string
    }

    await client
      .from('subscriptions')
      .update({
        status: subscription.status,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id)
  }

  return NextResponse.json({ received: true })
}
