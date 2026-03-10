import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">⏱️ FieldClock</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
          GPS-Verified Time Tracking
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Your crew. Always accountable.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          The average contractor loses <span className="font-bold text-red-600">$18,000/yr to time theft.</span> FieldClock uses GPS verification to ensure your field workers are actually on-site when they clock in.
        </p>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
          Real-time tracking. Mobile clock-in. Automatic timesheets. Built for HVAC, plumbing, electrical, and landscaping crews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium">
            Start Free Trial
          </Link>
          <Link href="/clock/demo" className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-medium">
            See Demo Clock-In
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">No credit card required. Free for up to 3 workers.</p>
      </section>

      {/* Feature Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Everything you need to run your crew</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📍',
                title: 'GPS Verification',
                desc: 'Verify workers are on-site before allowing clock-in. Set custom radius per job site.',
              },
              {
                icon: '📊',
                title: 'Real-Time Dashboard',
                desc: 'See who\'s clocked in, where they are, and how many hours this week — right now.',
              },
              {
                icon: '📱',
                title: 'Mobile Clock-In',
                desc: 'Workers clock in from their phone with one tap. No app download required.',
              },
              {
                icon: '📄',
                title: 'Timesheet Export',
                desc: 'Export weekly timesheets to CSV or PDF. Send directly to payroll.',
              },
              {
                icon: '🔧',
                title: 'Job Assignment',
                desc: 'Assign workers to jobs. Track time by project for accurate job costing.',
              },
              {
                icon: '⚠️',
                title: 'Overtime Alerts',
                desc: 'Get notified when workers approach overtime. Automatically flag daily and weekly OT.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Callouts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Built for field service trades</h2>
          <p className="text-gray-600 text-center mb-12">Whether you run one truck or fifty, FieldClock keeps your crew accountable.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '❄️', name: 'HVAC', desc: 'Track install & service calls' },
              { icon: '🔩', name: 'Plumbing', desc: 'Multi-site crew management' },
              { icon: '⚡', name: 'Electrical', desc: 'Job-cost by project phase' },
              { icon: '🌿', name: 'Landscaping', desc: 'Seasonal workforce tracking' },
            ].map((ind) => (
              <div key={ind.name} className="text-center p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
                <div className="text-4xl mb-3">{ind.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{ind.name}</h3>
                <p className="text-sm text-gray-600">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-600 text-center mb-12">No per-user fees on our Growth plan. Scale your crew without scaling your bill.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'forever',
                features: ['3 workers', '2 active jobs', 'Basic clock-in/out', 'Mobile access'],
                cta: 'Get Started',
                highlight: false,
              },
              {
                name: 'Starter',
                price: '$29',
                period: '/month',
                features: ['15 workers', 'Unlimited jobs', 'GPS verification', 'CSV export', 'Email support'],
                cta: 'Start Trial',
                highlight: true,
              },
              {
                name: 'Growth',
                price: '$79',
                period: '/month',
                features: ['Unlimited workers', 'Overtime alerts', 'API access', 'Priority support', 'Custom integrations'],
                cta: 'Start Trial',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 ${plan.highlight ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'} shadow-sm`}
              >
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-indigo-100' : 'text-gray-600'}`}>
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center py-2 px-4 rounded-lg font-medium ${
                    plan.highlight
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-xl font-bold text-gray-900 mb-4 md:mb-0">⏱️ FieldClock</span>
            <div className="flex gap-8 text-sm text-gray-600">
              <Link href="/features" className="hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="hover:text-gray-900">Docs</Link>
              <Link href="/auth/signup" className="hover:text-gray-900">Sign Up</Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            © 2026 FieldClock. GPS-verified time tracking for field service companies.
          </p>
        </div>
      </footer>
    </div>
  )
}
