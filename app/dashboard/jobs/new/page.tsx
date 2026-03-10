'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewJobPage() {
  const [form, setForm] = useState({
    name: '',
    clientName: '',
    address: '',
    startDate: '',
    endDate: '',
    gpsRadius: '500',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setMessage('Job created successfully! (Demo mode)')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/jobs" className="text-sm text-gray-500 hover:text-gray-700">← Back to Jobs</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Create New Job</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="HVAC Installation - Oak Street"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Johnson Family"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Site Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="123 Oak Street, Springfield, IL 62701"
              />
              <p className="text-xs text-gray-500 mt-1">Used for GPS verification</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPS Radius (feet)</label>
              <select
                value={form.gpsRadius}
                onChange={(e) => setForm({ ...form, gpsRadius: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="100">100 feet (tight)</option>
                <option value="250">250 feet</option>
                <option value="500">500 feet (default)</option>
                <option value="1000">1,000 feet</option>
                <option value="2000">2,000 feet (loose)</option>
              </select>
            </div>

            {message && <p className="text-green-600 text-sm">{message}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Job'}
              </button>
              <Link href="/dashboard/jobs" className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
