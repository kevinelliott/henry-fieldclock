import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER ?? 'price_starter_placeholder',
  growth: process.env.STRIPE_PRICE_GROWTH ?? 'price_growth_placeholder',
}

export async function POST(request: Request) {
  const body = await request.json()
  const { plan, userId, email } = body

  if (!plan || !PRICE_IDS[plan]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const stripe = getStripe()
  const origin = request.headers.get('origin') || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price: PRICE_IDS[plan],
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId ?? '',
      plan,
    },
    success_url: `${origin}/dashboard?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=cancelled`,
  })

  return NextResponse.json({ url: session.url, sessionId: session.id })
}
