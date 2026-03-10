import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="bg-white min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-900 font-medium">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features built for the field</h1>
          <p className="text-xl text-gray-600">Everything your field service company needs to track time, verify location, and prevent payroll fraud.</p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large feature */}
          <div className="md:col-span-2 bg-indigo-600 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">📍</div>
            <h2 className="text-2xl font-bold mb-3">GPS-Verified Clock-In</h2>
            <p className="text-indigo-200 text-lg mb-4">
              Before a worker can clock in, FieldClock verifies their GPS coordinates against the job site location. Set a custom radius (50 to 2,000 feet) per job. Workers outside the zone see a warning and cannot clock in until they are on-site.
            </p>
            <ul className="space-y-2">
              {['Custom radius per job site', 'Works on any smartphone browser', 'Flags attempted off-site clock-ins', 'Location stored with every entry'].map(f => (
                <li key={f} className="flex items-center gap-2 text-indigo-100">
                  <span>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Real-Time Dashboard</h2>
            <p className="text-gray-600">
              See exactly who is clocked in, at which job, and for how long. Track total hours for the week and get alerts when workers approach overtime.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">No-App Mobile Clock-In</h2>
            <p className="text-gray-600">
              Workers use a unique URL — no app download, no login. One tap to clock in, one tap to clock out. Works on any smartphone.
            </p>
          </div>

          <div className="md:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-4xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Automatic Timesheets</h2>
            <p className="text-gray-600 text-lg mb-4">
              Every clock-in and clock-out is automatically recorded. View weekly timesheets as a worker × day grid. Export to CSV for payroll in seconds.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {['Weekly grid view', 'CSV & PDF export', 'QuickBooks compatible'].map(f => (
                <div key={f} className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 text-center font-medium shadow-sm">
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">🔧</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Job Assignment</h2>
            <p className="text-gray-600">
              Assign workers to specific jobs. Track labor hours per project for accurate job costing and client billing.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Overtime Alerts</h2>
            <p className="text-gray-600">
              Get email notifications when workers hit 8 hours daily or 40 hours weekly. Configure per-company thresholds for your state&apos;s overtime rules.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">🔌</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">REST API + MCP</h2>
            <p className="text-gray-600">
              Integrate with your existing tools using our REST API. Includes MCP (Model Context Protocol) support for AI assistant access.
            </p>
          </div>

          <div className="md:col-span-3 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">Stop losing $18,000/yr to time theft</h2>
            <p className="text-indigo-700 text-center max-w-2xl mx-auto mb-6">
              Studies show field service companies lose an average of 4.5 hours per worker per week to buddy punching, early clock-outs, and inflated hours. At $25/hr average wage, that&apos;s $18,000 per year per worker.
            </p>
            <div className="flex justify-center">
              <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium">
                Start Preventing Time Theft Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
