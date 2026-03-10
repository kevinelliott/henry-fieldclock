import { NextResponse } from 'next/server'
import { createServiceClient, supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const workerId = searchParams.get('worker_id')
  const jobId = searchParams.get('job_id')
  const startDate = searchParams.get('start_date')
  const endDate = searchParams.get('end_date')

  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let query = supabase
    .from('time_entries')
    .select('*, workers(name, worker_token), jobs(name, address)')
    .order('clock_in', { ascending: false })

  if (workerId) query = query.eq('worker_id', workerId)
  if (jobId) query = query.eq('job_id', jobId)
  if (startDate) query = query.gte('clock_in', startDate)
  if (endDate) query = query.lte('clock_in', endDate)

  const { data, error } = await query.limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ entries: data })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { workerToken, action, latitude, longitude, jobId } = body

  if (!workerToken || !action) {
    return NextResponse.json({ error: 'workerToken and action are required' }, { status: 400 })
  }

  const serviceClient = createServiceClient()

  // Lookup worker by token
  const { data: worker, error: workerError } = await serviceClient
    .from('workers')
    .select('id, name, is_active, company_id')
    .eq('worker_token', workerToken)
    .single()

  if (workerError || !worker) {
    return NextResponse.json({ error: 'Worker not found' }, { status: 404 })
  }

  if (!worker.is_active) {
    return NextResponse.json({ error: 'Worker account is inactive' }, { status: 403 })
  }

  if (action === 'clock_in') {
    // Check not already clocked in
    const { data: existing } = await serviceClient
      .from('time_entries')
      .select('id')
      .eq('worker_id', worker.id)
      .is('clock_out', null)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Worker is already clocked in' }, { status: 409 })
    }

    const { data: entry, error: insertError } = await serviceClient
      .from('time_entries')
      .insert({
        worker_id: worker.id,
        job_id: jobId || null,
        clock_in: new Date().toISOString(),
        clock_in_lat: latitude,
        clock_in_lng: longitude,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, entry, action: 'clock_in' })
  }

  if (action === 'clock_out') {
    // Find open entry
    const { data: openEntry, error: findError } = await serviceClient
      .from('time_entries')
      .select('id, clock_in')
      .eq('worker_id', worker.id)
      .is('clock_out', null)
      .single()

    if (findError || !openEntry) {
      return NextResponse.json({ error: 'No active clock-in found' }, { status: 404 })
    }

    const clockOut = new Date()
    const clockIn = new Date(openEntry.clock_in)
    const hoursWorked = (clockOut.getTime() - clockIn.getTime()) / 3600000

    const { data: entry, error: updateError } = await serviceClient
      .from('time_entries')
      .update({
        clock_out: clockOut.toISOString(),
        clock_out_lat: latitude,
        clock_out_lng: longitude,
        hours_worked: Math.round(hoursWorked * 100) / 100,
      })
      .eq('id', openEntry.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, entry, action: 'clock_out', hours_worked: hoursWorked })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
