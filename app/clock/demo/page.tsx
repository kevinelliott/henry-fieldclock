'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoClockPage() {
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [todayHours, setTodayHours] = useState(0)
  const [clockInTime, setClockInTime] = useState<Date | null>(null)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<Array<{ action: string; time: string; hours?: string }>>([])

  const handleClock = () => {
    setIsLoading(true)
    setMessage('')
    setTimeout(() => {
      const now = new Date()
      if (!isClockedIn) {
        setIsClockedIn(true)
        setClockInTime(now)
        setMessage('Clocked in! GPS verified. (Demo mode)')
        setHistory(prev => [
          { action: 'Clock In', time: now.toLocaleTimeString() },
          ...prev,
        ])
      } else {
        const hoursWorked = clockInTime ? (now.getTime() - clockInTime.getTime()) / 3600000 : 0
        const newTotal = todayHours + hoursWorked
        setTodayHours(newTotal)
        setIsClockedIn(false)
        setClockInTime(null)
        setMessage(`Clocked out! ${hoursWorked.toFixed(2)} hours recorded. (Demo mode)`)
        setHistory(prev => [
          { action: 'Clock Out', time: now.toLocaleTimeString(), hours: hoursWorked.toFixed(2) },
          ...prev,
        ])
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">⏱️ FieldClock</Link>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium">Demo Mode</span>
      </div>

      <div className="max-w-sm mx-auto px-4 py-8">
        {/* Worker Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl">
              👷
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Demo Worker</h2>
              <p className="text-sm text-gray-500">Field Technician</p>
            </div>
          </div>
        </div>

        {/* Job Assignment */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Current Job</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔧</span>
            <div>
              <p className="font-medium text-gray-900">HVAC Installation - Oak Street</p>
              <p className="text-sm text-gray-500">123 Oak Street, Springfield, IL</p>
            </div>
          </div>
          {isClockedIn && clockInTime && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-green-600 font-medium">
                Clocked in since {clockInTime.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Clock Button */}
        <button
          onClick={handleClock}
          disabled={isLoading}
          className={`w-full py-6 rounded-2xl text-xl font-bold transition-all ${
            isLoading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : isClockedIn
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
          }`}
        >
          {isLoading ? '...' : isClockedIn ? '🛑 Clock Out' : '✅ Clock In'}
        </button>

        {message && (
          <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${isClockedIn ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
            {message}
          </div>
        )}

        {/* Today's Hours */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Today&apos;s Hours</h3>
          <div className="text-3xl font-bold text-gray-900">
            {todayHours.toFixed(2)} <span className="text-lg text-gray-500 font-normal">hrs</span>
          </div>
        </div>

        {/* Recent History */}
        {history.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {history.slice(0, 5).map((entry, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{entry.action === 'Clock In' ? '🟢' : '🔴'}</span>
                    <span className="text-gray-700">{entry.action}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500">{entry.time}</span>
                    {entry.hours && <span className="ml-2 text-gray-700 font-medium">{entry.hours}h</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/auth/signup" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Set up real tracking for your crew →
          </Link>
        </div>
      </div>
    </div>
  )
}
