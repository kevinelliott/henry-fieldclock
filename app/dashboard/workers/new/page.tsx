'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewWorkerPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'field',
    hourlyRate: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Demo: simulate API call
    setTimeout(() => {
      setMessage('Worker added successfully! (Demo mode)')
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
          <Link href="/dashboard/workers" className="text-sm text-gray-500 hover:text-gray-700">← Back to Workers</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Add New Worker</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mike Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="mike@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="555-0100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="field">Field Tech</option>
                  <option value="lead">Lead Tech</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={form.hourlyRate}
                  onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="28"
                  min="0"
                  step="0.50"
                />
              </div>
            </div>

            {message && <p className="text-green-600 text-sm">{message}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50"
              >
                {isLoading ? 'Adding...' : 'Add Worker'}
              </button>
              <Link href="/dashboard/workers" className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
