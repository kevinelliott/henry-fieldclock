export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

interface JsonRpcRequest {
  jsonrpc: string
  id: string | number
  method: string
  params?: {
    name?: string
    arguments?: Record<string, unknown>
  }
}

interface JsonRpcError {
  code: number
  message: string
}

function rpcError(id: string | number, error: JsonRpcError) {
  return NextResponse.json({
    jsonrpc: '2.0',
    id,
    error,
  })
}

function rpcSuccess(id: string | number, result: unknown) {
  return NextResponse.json({
    jsonrpc: '2.0',
    id,
    result,
  })
}

const TOOLS = [
  {
    name: 'list_workers',
    description: 'List all workers for a company',
    inputSchema: {
      type: 'object',
      properties: {
        company_id: { type: 'string', description: 'Company UUID' },
        is_active: { type: 'boolean', description: 'Filter by active status' },
      },
    },
  },
  {
    name: 'get_worker_status',
    description: 'Get current clock status for a worker by token',
    inputSchema: {
      type: 'object',
      properties: {
        worker_token: { type: 'string', description: 'Worker token string' },
      },
      required: ['worker_token'],
    },
  },
  {
    name: 'list_jobs',
    description: 'List jobs for a company',
    inputSchema: {
      type: 'object',
      properties: {
        company_id: { type: 'string', description: 'Company UUID' },
        status: { type: 'string', enum: ['active', 'completed'], description: 'Filter by status' },
      },
    },
  },
  {
    name: 'get_time_entries',
    description: 'Get time entries with optional filters',
    inputSchema: {
      type: 'object',
      properties: {
        worker_id: { type: 'string', description: 'Worker UUID' },
        job_id: { type: 'string', description: 'Job UUID' },
        start_date: { type: 'string', description: 'ISO date string' },
        end_date: { type: 'string', description: 'ISO date string' },
      },
    },
  },
]

async function callTool(name: string, args: Record<string, unknown>) {
  const client = createServiceClient()

  if (name === 'list_workers') {
    let query = client.from('workers').select('id, name, email, role, hourly_rate, is_active, worker_token, created_at')
    if (args.company_id) query = query.eq('company_id', args.company_id as string)
    if (typeof args.is_active === 'boolean') query = query.eq('is_active', args.is_active)
    const { data, error } = await query.order('name')
    if (error) throw new Error(error.message)
    return { workers: data }
  }

  if (name === 'get_worker_status') {
    const { data: worker, error } = await client
      .from('workers')
      .select('id, name, role, is_active')
      .eq('worker_token', args.worker_token as string)
      .single()
    if (error || !worker) throw new Error('Worker not found')

    const { data: currentEntry } = await client
      .from('time_entries')
      .select('id, clock_in, job_id, jobs(name)')
      .eq('worker_id', worker.id)
      .is('clock_out', null)
      .single()

    return {
      worker,
      is_clocked_in: !!currentEntry,
      current_entry: currentEntry || null,
    }
  }

  if (name === 'list_jobs') {
    let query = client.from('jobs').select('id, name, client_name, address, status, start_date, end_date, latitude, longitude')
    if (args.company_id) query = query.eq('company_id', args.company_id as string)
    if (args.status) query = query.eq('status', args.status as string)
    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return { jobs: data }
  }

  if (name === 'get_time_entries') {
    let query = client
      .from('time_entries')
      .select('id, worker_id, job_id, clock_in, clock_out, hours_worked, clock_in_lat, clock_in_lng, notes, workers(name), jobs(name)')
      .order('clock_in', { ascending: false })
      .limit(100)
    if (args.worker_id) query = query.eq('worker_id', args.worker_id as string)
    if (args.job_id) query = query.eq('job_id', args.job_id as string)
    if (args.start_date) query = query.gte('clock_in', args.start_date as string)
    if (args.end_date) query = query.lte('clock_in', args.end_date as string)
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return { time_entries: data }
  }

  throw new Error(`Unknown tool: ${name}`)
}

export async function POST(request: Request) {
  let body: JsonRpcRequest
  try {
    body = await request.json()
  } catch {
    return rpcError(0, { code: -32700, message: 'Parse error' })
  }

  const { id, method, params } = body

  if (method === 'tools/list') {
    return rpcSuccess(id, { tools: TOOLS })
  }

  if (method === 'tools/call') {
    const toolName = params?.name
    const toolArgs = (params?.arguments ?? {}) as Record<string, unknown>

    if (!toolName) {
      return rpcError(id, { code: -32602, message: 'Missing tool name' })
    }

    try {
      const result = await callTool(toolName, toolArgs)
      return rpcSuccess(id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Tool execution failed'
      return rpcError(id, { code: -32603, message })
    }
  }

  if (method === 'initialize') {
    return rpcSuccess(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'fieldclock-mcp', version: '1.0.0' },
    })
  }

  return rpcError(id, { code: -32601, message: `Method not found: ${method}` })
}
