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

  const client = createServiceClient()

  const [workers, activeWorkers, jobs, activeJobs, subs, freeSubs] = await Promise.all([
    client.from('workers').select('id', { count: 'exact', head: true }),
    client.from('workers').select('id', { count: 'exact', head: true }).eq('is_active', true),
    client.from('jobs').select('id', { count: 'exact', head: true }),
    client.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    client.from('subscriptions').select('id', { count: 'exact', head: true }),
    client.from('subscriptions').select('id', { count: 'exact', head: true }).eq('plan', 'free'),
  ])

  return NextResponse.json({
    workers: {
      total: workers.count ?? 0,
      active: activeWorkers.count ?? 0,
    },
    jobs: {
      total: jobs.count ?? 0,
      active: activeJobs.count ?? 0,
    },
    subscriptions: {
      total: subs.count ?? 0,
      free: freeSubs.count ?? 0,
      paid: (subs.count ?? 0) - (freeSubs.count ?? 0),
    },
    timestamp: new Date().toISOString(),
  })
}
