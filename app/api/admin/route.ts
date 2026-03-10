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

  const [workers, jobs, companies, entries] = await Promise.all([
    client.from('workers').select('id', { count: 'exact', head: true }),
    client.from('jobs').select('id', { count: 'exact', head: true }),
    client.from('companies').select('id', { count: 'exact', head: true }),
    client.from('time_entries').select('id', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    overview: {
      total_workers: workers.count ?? 0,
      total_jobs: jobs.count ?? 0,
      total_companies: companies.count ?? 0,
      total_time_entries: entries.count ?? 0,
    },
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
