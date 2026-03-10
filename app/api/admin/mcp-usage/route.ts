import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_API_KEY && process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    total_calls: 1247,
    calls_today: 89,
    top_tools: [
      { tool: 'list_workers', calls: 523 },
      { tool: 'get_time_entries', calls: 412 },
      { tool: 'get_worker_status', calls: 312 },
    ],
    by_day: [
      { date: '2026-03-04', calls: 145 },
      { date: '2026-03-05', calls: 167 },
      { date: '2026-03-06', calls: 134 },
      { date: '2026-03-07', calls: 189 },
      { date: '2026-03-08', calls: 156 },
      { date: '2026-03-09', calls: 167 },
      { date: '2026-03-10', calls: 89 },
    ]
  })
}
