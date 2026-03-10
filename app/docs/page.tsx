import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="bg-white min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-900 font-medium">Docs</Link>
              <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
        <p className="text-xl text-gray-600 mb-12">FieldClock exposes a REST API and supports the Model Context Protocol (MCP) for AI assistant integrations.</p>

        {/* REST API */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">REST API</h2>
          <p className="text-gray-600 mb-4">Base URL: <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://your-domain.com/api/v1</code></p>

          <div className="space-y-6">
            {[
              {
                method: 'GET',
                path: '/api/v1/workers/:token',
                description: 'Get worker info and current clock status by worker token.',
                auth: 'Worker token (URL param)',
                response: `{
  "worker": {
    "id": "uuid",
    "name": "Mike Johnson",
    "role": "field",
    "is_active": true
  },
  "current_entry": {
    "id": "uuid",
    "clock_in": "2026-03-10T08:00:00Z",
    "job": { "id": "uuid", "name": "HVAC Install - Oak St" }
  },
  "today_hours": 4.5
}`,
              },
              {
                method: 'POST',
                path: '/api/v1/time-entries',
                description: 'Clock in or clock out a worker.',
                auth: 'Worker token (body param)',
                response: `// Clock in body:
{
  "workerToken": "abc123",
  "action": "clock_in",
  "latitude": 39.7817,
  "longitude": -89.6501,
  "jobId": "uuid"
}
// Clock out body:
{
  "workerToken": "abc123",
  "action": "clock_out",
  "latitude": 39.7817,
  "longitude": -89.6501
}`,
              },
            ].map((endpoint) => (
              <div key={endpoint.path} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-3">{endpoint.description}</p>
                  <p className="text-sm text-gray-500 mb-3">Auth: <span className="font-medium text-gray-700">{endpoint.auth}</span></p>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    {endpoint.response}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MCP */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">MCP (Model Context Protocol)</h2>
          <p className="text-gray-600 mb-6">
            FieldClock supports MCP, allowing AI assistants like Claude to directly query your time tracking data. Connect your MCP endpoint to any compatible AI tool.
          </p>
          <p className="text-gray-600 mb-4">MCP Endpoint: <code className="bg-gray-100 px-2 py-1 rounded text-sm">POST /api/mcp</code></p>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available MCP Tools</h3>
          <div className="space-y-4">
            {[
              {
                tool: 'list_workers',
                description: 'List all workers for the authenticated company.',
                params: '{ "company_id": "uuid" }',
              },
              {
                tool: 'get_worker_status',
                description: 'Get current clock status for a specific worker.',
                params: '{ "worker_token": "string" }',
              },
              {
                tool: 'list_jobs',
                description: 'List all active jobs for the company.',
                params: '{ "company_id": "uuid", "status": "active" | "completed" }',
              },
              {
                tool: 'get_time_entries',
                description: 'Get time entries with optional filters.',
                params: '{ "worker_id": "uuid", "job_id": "uuid", "start_date": "ISO date", "end_date": "ISO date" }',
              },
            ].map((t) => (
              <div key={t.tool} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded">TOOL</span>
                  <code className="font-mono text-sm text-gray-800">{t.tool}</code>
                </div>
                <p className="text-gray-600 text-sm mb-2">{t.description}</p>
                <pre className="bg-gray-100 text-gray-700 p-3 rounded text-xs">{t.params}</pre>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">MCP Request Format (JSON-RPC 2.0)</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`POST /api/mcp
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "tools/call",
  "params": {
    "name": "list_workers",
    "arguments": {
      "company_id": "your-company-uuid"
    }
  }
}`}
            </pre>
          </div>
        </section>

        {/* Admin API */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin API</h2>
          <p className="text-gray-600 mb-4">
            Admin endpoints require an <code className="bg-gray-100 px-2 py-1 rounded text-sm">X-Admin-Key</code> header.
          </p>
          <div className="space-y-3">
            {[
              ['GET', '/api/admin', 'Overview stats'],
              ['GET', '/api/admin/stats', 'User and subscription counts'],
              ['GET', '/api/admin/users', 'Paginated user list'],
              ['GET', '/api/admin/subscriptions', 'All subscription records'],
              ['GET', '/api/admin/mcp-usage', 'MCP tool usage statistics'],
            ].map(([method, path, desc]) => (
              <div key={path} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                <span className={`text-xs font-bold px-2 py-1 rounded ${method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {method}
                </span>
                <code className="text-sm font-mono text-gray-800 flex-1">{path}</code>
                <span className="text-sm text-gray-500">{desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
