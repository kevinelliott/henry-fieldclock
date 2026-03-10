import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard/workers" className="text-gray-600 hover:text-gray-900 text-sm">Workers</Link>
              <Link href="/dashboard/jobs" className="text-gray-600 hover:text-gray-900 text-sm">Jobs</Link>
              <Link href="/dashboard/timesheets" className="text-gray-600 hover:text-gray-900 text-sm">Timesheets</Link>
              <Link href="/dashboard/settings" className="text-gray-600 hover:text-gray-900 text-sm">Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Your field operations at a glance</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/workers/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              + Add Worker
            </Link>
            <Link href="/dashboard/jobs/new" className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
              + New Job
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Workers Now', value: '3', sub: 'of 5 total', icon: '🟢', color: 'text-green-600' },
            { label: 'Total Hours This Week', value: '124.5', sub: 'hrs', icon: '⏱️', color: 'text-indigo-600' },
            { label: 'Jobs In Progress', value: '2', sub: 'of 4 active', icon: '🔧', color: 'text-blue-600' },
            { label: 'Overtime Alerts', value: '1', sub: 'worker flagged', icon: '⚠️', color: 'text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Active Workers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Active Workers</h2>
              <Link href="/dashboard/workers" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: 'Mike Johnson', job: 'HVAC - Oak St', since: '8:02 AM', hours: '4.2 hrs', status: 'On-site' },
                { name: 'Sarah Williams', job: 'Plumbing - Elm Ave', since: '7:45 AM', hours: '4.5 hrs', status: 'On-site' },
                { name: 'Carlos Rivera', job: 'HVAC - Oak St', since: '8:00 AM', hours: '4.3 hrs', status: 'On-site' },
              ].map((w) => (
                <div key={w.name} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm">
                      {w.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{w.name}</p>
                      <p className="text-xs text-gray-500">{w.job}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{w.status}</span>
                    <p className="text-xs text-gray-500 mt-1">Since {w.since} · {w.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Active Jobs</h2>
              <Link href="/dashboard/jobs" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: 'HVAC Installation - Oak Street', client: 'Johnson Family', workers: 2, progress: 60 },
                { name: 'Plumbing Repair - Elm Ave', client: 'Riverside Apartments', workers: 1, progress: 35 },
              ].map((job) => (
                <div key={job.name} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{job.name}</p>
                      <p className="text-xs text-gray-500">{job.client} · {job.workers} workers</p>
                    </div>
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{job.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
