'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Demo Field Services LLC',
    overtimeThreshold: '8',
    gpsRadius: '500',
    email: 'admin@demofield.com',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">⏱️ FieldClock</Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Company Settings</h1>

        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Company Information</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                {saved ? '✓ Saved' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Time Tracking Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Time Tracking Rules</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Overtime Threshold (hours)</label>
                <select
                  value={settings.overtimeThreshold}
                  onChange={(e) => setSettings({ ...settings, overtimeThreshold: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="8">8 hours (standard)</option>
                  <option value="10">10 hours</option>
                  <option value="12">12 hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default GPS Radius (feet)</label>
                <select
                  value={settings.gpsRadius}
                  onChange={(e) => setSettings({ ...settings, gpsRadius: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="100">100 feet</option>
                  <option value="250">250 feet</option>
                  <option value="500">500 feet (default)</option>
                  <option value="1000">1,000 feet</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Subscription</h2>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium">Starter Plan</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">$29/month · Renews April 10, 2026 · 5 of 15 workers used</p>
            <div className="flex gap-3">
              <Link href="/pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Upgrade Plan
              </Link>
              <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                Manage Billing
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-red-700 mb-2">Danger Zone</h2>
            <p className="text-gray-600 text-sm mb-4">Permanently delete your account and all associated data.</p>
            <button className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
