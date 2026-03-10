import Link from 'next/link'

export default function TimesheetsPage() {
  const workers = ['Mike Johnson', 'Sarah Williams', 'Carlos Rivera', 'Jen Park', 'Tom Walsh']
  const days = ['Mon 3/4', 'Tue 3/5', 'Wed 3/6', 'Thu 3/7', 'Fri 3/8', 'Sat 3/9', 'Sun 3/10']

  const data: Record<string, Record<string, number>> = {
    'Mike Johnson': { 'Mon 3/4': 8.5, 'Tue 3/5': 8, 'Wed 3/6': 9, 'Thu 3/7': 8.5, 'Fri 3/8': 8, 'Sat 3/9': 0, 'Sun 3/10': 0 },
    'Sarah Williams': { 'Mon 3/4': 8, 'Tue 3/5': 8.5, 'Wed 3/6': 8, 'Thu 3/7': 8, 'Fri 3/8': 8.5, 'Sat 3/9': 0, 'Sun 3/10': 0 },
    'Carlos Rivera': { 'Mon 3/4': 9, 'Tue 3/5': 9, 'Wed 3/6': 9.5, 'Thu 3/7': 9, 'Fri 3/8': 9, 'Sat 3/9': 4, 'Sun 3/10': 0 },
    'Jen Park': { 'Mon 3/4': 8, 'Tue 3/5': 0, 'Wed 3/6': 8, 'Thu 3/7': 8, 'Fri 3/8': 8, 'Sat 3/9': 0, 'Sun 3/10': 0 },
    'Tom Walsh': { 'Mon 3/4': 8, 'Tue 3/5': 8, 'Wed 3/6': 8, 'Thu 3/7': 8, 'Fri 3/8': 8, 'Sat 3/9': 0, 'Sun 3/10': 0 },
  }

  const getTotal = (name: string) => Object.values(data[name]).reduce((a, b) => a + b, 0)
  const isOvertime = (name: string) => getTotal(name) > 40

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link>
              <Link href="/dashboard/workers" className="text-gray-600 hover:text-gray-900 text-sm">Workers</Link>
              <Link href="/dashboard/jobs" className="text-gray-600 hover:text-gray-900 text-sm">Jobs</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Timesheets</h1>
            <p className="text-gray-600">Week of Mar 4 – Mar 10, 2026</p>
          </div>
          <div className="flex gap-3">
            <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
              ← Prev Week
            </button>
            <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
              Next Week →
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-sm font-medium text-gray-500 sticky left-0 bg-white">Worker</th>
                {days.map((day) => (
                  <th key={day} className="text-center p-4 text-sm font-medium text-gray-500">{day}</th>
                ))}
                <th className="text-center p-4 text-sm font-medium text-gray-500">Total</th>
                <th className="text-center p-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {workers.map((name) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900 sticky left-0 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-700">
                        {name[0]}
                      </div>
                      {name}
                    </div>
                  </td>
                  {days.map((day) => {
                    const hrs = data[name][day]
                    const isOT = hrs > 8
                    return (
                      <td key={day} className={`p-4 text-center text-sm ${hrs === 0 ? 'text-gray-300' : isOT ? 'text-orange-600 font-medium' : 'text-gray-900'}`}>
                        {hrs === 0 ? '—' : `${hrs}h`}
                      </td>
                    )
                  })}
                  <td className={`p-4 text-center font-bold text-sm ${isOvertime(name) ? 'text-orange-600' : 'text-gray-900'}`}>
                    {getTotal(name)}h
                  </td>
                  <td className="p-4 text-center">
                    {isOvertime(name) ? (
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">OT</span>
                    ) : (
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Orange = overtime (daily &gt; 8hrs or weekly &gt; 40hrs)</p>
      </div>
    </div>
  )
}
