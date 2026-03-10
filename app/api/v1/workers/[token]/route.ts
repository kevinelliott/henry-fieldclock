export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params
  const serviceClient = createServiceClient()

  const { data: worker, error: workerError } = await serviceClient
    .from('workers')
    .select('id, name, role, is_active, company_id')
    .eq('worker_token', token)
    .single()

  if (workerError || !worker) {
    return NextResponse.json({ error: 'Worker not found' }, { status: 404 })
  }

  if (!worker.is_active) {
    return NextResponse.json({ error: 'Worker account is inactive' }, { status: 403 })
  }

  // Get current open time entry
  const { data: currentEntry } = await serviceClient
    .from('time_entries')
    .select('id, clock_in, job_id, jobs(id, name, address)')
    .eq('worker_id', worker.id)
    .is('clock_out', null)
    .single()

  // Calculate today's hours
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const { data: todayEntries } = await serviceClient
    .from('time_entries')
    .select('clock_in, clock_out, hours_worked')
    .eq('worker_id', worker.id)
    .gte('clock_in', todayStart.toISOString())

  let todayHours = 0
  if (todayEntries) {
    for (const entry of todayEntries) {
      if (entry.hours_worked) {
        todayHours += Number(entry.hours_worked)
      } else if (entry.clock_in && !entry.clock_out) {
        // Currently clocked in - calculate running time
        const elapsed = (Date.now() - new Date(entry.clock_in).getTime()) / 3600000
        todayHours += elapsed
      }
    }
  }

  // Format current entry with job info
  let formattedEntry = null
  if (currentEntry) {
    const jobData = (currentEntry as unknown as { jobs?: { id: string; name: string; address?: string } }).jobs
    formattedEntry = {
      id: currentEntry.id,
      clock_in: currentEntry.clock_in,
      job: jobData || null,
    }
  }

  return NextResponse.json({
    worker: {
      id: worker.id,
      name: worker.name,
      role: worker.role,
      is_active: worker.is_active,
    },
    current_entry: formattedEntry,
    today_hours: Math.round(todayHours * 100) / 100,
  })
}
