import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-900 font-medium">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600">Scale your crew without scaling your payroll software bill.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Free',
              price: '$0',
              period: 'forever',
              description: 'Perfect for solo operators trying us out',
              features: [
                '3 workers',
                '2 active jobs',
                'Basic clock-in/out',
                'Mobile access',
                'Community support',
              ],
              notIncluded: ['GPS verification', 'CSV export', 'Overtime alerts', 'API access'],
              cta: 'Get Started Free',
              highlight: false,
            },
            {
              name: 'Starter',
              price: '$29',
              period: '/month',
              description: 'For growing crews that need GPS accountability',
              features: [
                '15 workers',
                'Unlimited jobs',
                'GPS verification',
                'CSV timesheet export',
                'Job cost tracking',
                'Email support',
              ],
              notIncluded: ['Overtime alerts', 'API access'],
              cta: 'Start 14-Day Trial',
              highlight: true,
            },
            {
              name: 'Growth',
              price: '$79',
              period: '/month',
              description: 'For established contractors with large crews',
              features: [
                'Unlimited workers',
                'Unlimited jobs',
                'GPS verification',
                'CSV & PDF export',
                'Overtime alerts',
                'REST API access',
                'Priority support',
                'Custom integrations',
              ],
              notIncluded: [],
              cta: 'Start 14-Day Trial',
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 ${plan.highlight ? 'bg-indigo-600 ring-2 ring-indigo-600' : 'bg-white border border-gray-200'} shadow-sm`}
            >
              {plan.highlight && (
                <div className="text-xs font-bold text-indigo-200 uppercase tracking-wide mb-2">Most Popular</div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-indigo-200' : 'text-gray-500'}`}>{plan.description}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white' : 'text-gray-700'}`}>
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-indigo-300' : 'text-gray-400'}`}>
                    <span>✕</span> {f}
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
      </section>

      {/* Competitor Comparison */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How we compare</h2>
          <p className="text-gray-600 text-center mb-10">FieldClock is built specifically for field service contractors — not generic HR teams.</p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600 font-medium">Feature</th>
                  <th className="text-center p-4 font-bold text-indigo-600">FieldClock</th>
                  <th className="text-center p-4 text-gray-500">TSheets (QuickBooks)</th>
                  <th className="text-center p-4 text-gray-500">ClockShark</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Price per user', '$4/user avg', '$10/user', '$8/user'],
                  ['GPS verification', '✓ Built-in', '✓ Add-on', '✓ Add-on'],
                  ['No app required', '✓ Browser-based', '✗ App required', '✗ App required'],
                  ['Job cost tracking', '✓ Included', '✓ Paid add-on', '✓ Included'],
                  ['API access', '✓ Growth plan', '✓ Enterprise', '✗ Not available'],
                  ['Setup time', '< 5 minutes', '1-2 hours', '30-60 min'],
                ].map(([feature, fieldclock, tsheets, clockshark]) => (
                  <tr key={feature} className="border-b border-gray-100 last:border-0">
                    <td className="p-4 text-gray-700 font-medium">{feature}</td>
                    <td className="p-4 text-center text-indigo-700 font-medium bg-indigo-50">{fieldclock}</td>
                    <td className="p-4 text-center text-gray-600">{tsheets}</td>
                    <td className="p-4 text-center text-gray-600">{clockshark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do workers need to download an app?',
                a: 'No. Workers clock in using a unique link on any smartphone browser. No app download, no account creation required.',
              },
              {
                q: 'How does GPS verification work?',
                a: "When a worker taps 'Clock In', their browser requests location. We verify they're within your set radius (default 500 feet) of the job site before confirming the clock-in.",
              },
              {
                q: 'Can I export timesheets to my payroll software?',
                a: 'Yes. Starter and Growth plans can export CSV timesheets compatible with QuickBooks, ADP, and Gusto.',
              },
              {
                q: 'What happens if a worker has no cell signal?',
                a: "Clock-in attempts without GPS will be flagged as 'Unverified' but still recorded with a timestamp. You can review and approve them manually.",
              },
              {
                q: 'Can I try before committing?',
                a: 'Yes. The Free plan is free forever for up to 3 workers. Paid plans include a 14-day free trial with no credit card required.',
              },
            ].map((item) => (
              <div key={item.q} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
