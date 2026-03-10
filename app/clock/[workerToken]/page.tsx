'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WorkerData {
  worker: {
    id: string
    name: string
    role: string
    is_active: boolean
  }
  current_entry: {
    id: string
    clock_in: string
    job?: { id: string; name: string; address?: string }
  } | null
  today_hours: number
}

interface TimeEntry {
  id: string
  action: string
  time: string
  job?: string
  hours?: string
  gps?: string
}

export default function WorkerClockPage({ params }: { params: { workerToken: string } }) {
  const [workerData, setWorkerData] = useState<WorkerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClocking, setIsClocking] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState<TimeEntry[]>([])

  useEffect(() => {
    fetchWorkerData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.workerToken])

  const fetchWorkerData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/v1/workers/${params.workerToken}`)
      if (res.ok) {
        const data = await res.json()
        setWorkerData(data)
      } else {
        setError('Worker not found. Please check your link.')
      }
    } catch {
      setError('Unable to connect. Please try again.')
    }
    setIsLoading(false)
  }

  const handleClock = async () => {
    setIsClocking(true)
    setMessage('')
    setError('')

    const action = workerData?.current_entry ? 'clock_out' : 'clock_in'

    const getGPS = (): Promise<GeolocationCoordinates | null> => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null)
          return
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          () => resolve(null),
          { timeout: 5000, maximumAge: 0 }
        )
      })
    }

    const coords = await getGPS()

    try {
      const res = await fetch('/api/v1/time-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerToken: params.workerToken,
          action,
          latitude: coords?.latitude ?? null,
          longitude: coords?.longitude ?? null,
          jobId: workerData?.current_entry?.job?.id ?? null,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const gpsStatus = coords ? 'GPS Verified' : 'No GPS'
        if (action === 'clock_in') {
          setMessage(`Clocked in! ${gpsStatus}.`)
        } else {
          setMessage(`Clocked out! ${data.hours_worked ? `${Number(data.hours_worked).toFixed(2)} hours` : ''} recorded. ${gpsStatus}.`)
        }
        setHistory(prev => [
          {
            id: Date.now().toString(),
            action: action === 'clock_in' ? 'Clock In' : 'Clock Out',
            time: new Date().toLocaleTimeString(),
            gps: gpsStatus,
          },
          ...prev,
        ])
        await fetchWorkerData()
      } else {
        const errData = await res.json()
        setError(errData.error || 'Failed to record time entry.')
      }
    } catch {
      setError('Network error. Please try again.')
    }

    setIsClocking(false)
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏱️</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error && !workerData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Link Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Go to FieldClock
          </Link>
        </div>
      </div>
    )
  }

  const isClockedIn = !!workerData?.current_entry
  const clockInTime = workerData?.current_entry?.clock_in
    ? new Date(workerData.current_entry.clock_in)
    : null

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">⏱️ FieldClock</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${isClockedIn ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {isClockedIn ? 'Clocked In' : 'Clocked Out'}
        </span>
      </div>

      <div className="max-w-sm mx-auto px-4 py-8">
        {/* Worker Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700">
              {workerData?.worker.name?.[0] ?? '?'}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{workerData?.worker.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{workerData?.worker.role}</p>
            </div>
          </div>
        </div>

        {/* Current Job */}
        {workerData?.current_entry?.job && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Current Job</h3>
            <div className="flex items-start gap-2">
              <span className="text-lg mt-0.5">🔧</span>
              <div>
                <p className="font-medium text-gray-900">{workerData.current_entry.job.name}</p>
                {workerData.current_entry.job.address && (
                  <p className="text-sm text-gray-500">{workerData.current_entry.job.address}</p>
                )}
                {clockInTime && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Since {clockInTime.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clock Button */}
        <button
          onClick={handleClock}
          disabled={isClocking}
          className={`w-full py-8 rounded-2xl text-2xl font-bold transition-all ${
            isClocking
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : isClockedIn
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg active:scale-95'
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg active:scale-95'
          }`}
        >
          {isClocking ? '...' : isClockedIn ? '🛑 Clock Out' : '✅ Clock In'}
        </button>

        {message && (
          <div className="mt-4 p-3 rounded-xl text-sm font-medium bg-green-50 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-xl text-sm font-medium bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {/* Today's Hours */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Today&apos;s Hours</h3>
          <div className="text-3xl font-bold text-gray-900">
            {(workerData?.today_hours ?? 0).toFixed(2)} <span className="text-lg text-gray-500 font-normal">hrs</span>
          </div>
        </div>

        {/* Recent History */}
        {history.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Today&apos;s Activity</h3>
            <div className="space-y-2">
              {history.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{entry.action === 'Clock In' ? '🟢' : '🔴'}</span>
                    <span className="text-gray-700">{entry.action}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500">{entry.time}</span>
                    {entry.hours && <span className="ml-2 text-gray-700 font-medium">{entry.hours}h</span>}
                    {entry.gps && <span className={`ml-2 text-xs ${entry.gps === 'GPS Verified' ? 'text-green-600' : 'text-orange-600'}`}>{entry.gps}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
