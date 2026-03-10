import Link from 'next/link'

export default function WorkerDetailPage({ params }: { params: { id: string } }) {
  const worker = {
    id: params.id,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '555-0101',
    role: 'Field Tech',
    hourlyRate: 28,
    status: 'Clocked In',
    workerToken: 'abc123def456',
    totalHoursWeek: 32.5,
    totalHoursMonth: 142,
  }

  const recentEntries = [
    { date: 'Mon Mar 10', clockIn: '8:00 AM', clockOut: '4:30 PM', hours: 8.5, job: 'HVAC - Oak St', gps: 'Verified' },
    { date: 'Fri Mar 7', clockIn: '7:45 AM', clockOut: '4:15 PM', hours: 8.5, job: 'HVAC - Oak St', gps: 'Verified' },
    { date: 'Thu Mar 6', clockIn: '8:15 AM', clockOut: '5:00 PM', hours: 8.75, job: 'Plumbing - Elm', gps: 'Verified' },
    { date: 'Wed Mar 5', clockIn: '8:00 AM', clockOut: '4:30 PM', hours: 8.5, job: 'HVAC - Oak St', gps: 'Verified' },
    { date: 'Tue Mar 4', clockIn: '8:30 AM', clockOut: '4:00 PM', hours: 7.5, job: 'Electrical - Main', gps: 'Unverified' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/workers" className="text-sm text-gray-500 hover:text-gray-700">← Back to Workers</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Worker profile */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-700 mx-auto mb-3">
                {worker.name[0]}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{worker.name}</h2>
              <p className="text-gray-500">{worker.role}</p>
              <span className="inline-flex mt-2 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                {worker.status}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900">{worker.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-900">{worker.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rate</span>
                <span className="text-gray-900">${worker.hourlyRate}/hr</span>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-500 mb-1">Clock-In Link</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block break-all">
                  /clock/{worker.workerToken}
                </code>
              </div>
            </div>
          </div>

          {/* Stats + entries */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Hours This Week</p>
                <p className="text-3xl font-bold text-indigo-600 mt-1">{worker.totalHoursWeek}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Hours This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{worker.totalHoursMonth}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Recent Time Entries</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 text-xs font-medium text-gray-500">Date</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500">In / Out</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500">Hours</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500">Job</th>
                    <th className="text-left p-4 text-xs font-medium text-gray-500">GPS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentEntries.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-700">{entry.date}</td>
                      <td className="p-4 text-sm text-gray-600">{entry.clockIn} → {entry.clockOut}</td>
                      <td className="p-4 text-sm font-medium text-gray-900">{entry.hours}h</td>
                      <td className="p-4 text-sm text-gray-600">{entry.job}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${entry.gps === 'Verified' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                          {entry.gps}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
