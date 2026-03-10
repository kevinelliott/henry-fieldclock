import Link from 'next/link'

export default function WorkersPage() {
  const workers = [
    { id: '1', name: 'Mike Johnson', role: 'Field Tech', email: 'mike@example.com', status: 'Clocked In', hourlyRate: 28, jobs: 3 },
    { id: '2', name: 'Sarah Williams', role: 'Field Tech', email: 'sarah@example.com', status: 'Clocked In', hourlyRate: 32, jobs: 2 },
    { id: '3', name: 'Carlos Rivera', role: 'Lead Tech', email: 'carlos@example.com', status: 'Clocked In', hourlyRate: 40, jobs: 4 },
    { id: '4', name: 'Jen Park', role: 'Field Tech', email: 'jen@example.com', status: 'Off', hourlyRate: 28, jobs: 1 },
    { id: '5', name: 'Tom Walsh', role: 'Field Tech', email: 'tom@example.com', status: 'Off', hourlyRate: 30, jobs: 2 },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link>
              <Link href="/dashboard/jobs" className="text-gray-600 hover:text-gray-900 text-sm">Jobs</Link>
              <Link href="/dashboard/timesheets" className="text-gray-600 hover:text-gray-900 text-sm">Timesheets</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workers</h1>
            <p className="text-gray-600">{workers.length} workers in your team</p>
          </div>
          <Link href="/dashboard/workers/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add Worker
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Role</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Rate</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Jobs</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {workers.map((worker) => (
                <tr key={worker.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-medium text-indigo-700">
                        {worker.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{worker.name}</p>
                        <p className="text-xs text-gray-500">{worker.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{worker.role}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${worker.status === 'Clocked In' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">${worker.hourlyRate}/hr</td>
                  <td className="p-4 text-sm text-gray-600">{worker.jobs} assigned</td>
                  <td className="p-4">
                    <Link href={`/dashboard/workers/${worker.id}`} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
