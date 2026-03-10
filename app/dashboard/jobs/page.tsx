import Link from 'next/link'

export default function JobsPage() {
  const jobs = [
    { id: '1', name: 'HVAC Installation - Oak Street', client: 'Johnson Family', address: '123 Oak Street, Springfield', status: 'active', workers: 2, startDate: 'Mar 1', endDate: 'Mar 15', hoursLogged: 48 },
    { id: '2', name: 'Plumbing Repair - Elm Ave', client: 'Riverside Apartments', address: '456 Elm Avenue, Springfield', status: 'active', workers: 1, startDate: 'Mar 5', endDate: 'Mar 20', hoursLogged: 24 },
    { id: '3', name: 'Electrical Panel - Cedar Rd', client: 'Tech Startup Inc', address: '789 Cedar Road, Springfield', status: 'completed', workers: 3, startDate: 'Feb 10', endDate: 'Feb 28', hoursLogged: 120 },
    { id: '4', name: 'Landscaping - Maple Dr', client: 'HOA Association', address: '321 Maple Drive, Springfield', status: 'completed', workers: 4, startDate: 'Jan 15', endDate: 'Feb 1', hoursLogged: 96 },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link>
              <Link href="/dashboard/workers" className="text-gray-600 hover:text-gray-900 text-sm">Workers</Link>
              <Link href="/dashboard/timesheets" className="text-gray-600 hover:text-gray-900 text-sm">Timesheets</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
            <p className="text-gray-600">{jobs.filter(j => j.status === 'active').length} active, {jobs.filter(j => j.status === 'completed').length} completed</p>
          </div>
          <Link href="/dashboard/jobs/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + New Job
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{job.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {job.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{job.client} · {job.address}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-500">{job.startDate} – {job.endDate}</p>
                </div>
              </div>
              <div className="flex gap-6 mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                <span>👷 {job.workers} workers</span>
                <span>⏱️ {job.hoursLogged} hrs logged</span>
                <span>💰 ${(job.hoursLogged * 30).toLocaleString()} est. labor</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
