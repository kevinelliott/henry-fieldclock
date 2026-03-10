import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FieldClock - GPS-Verified Time Tracking for Field Service Teams',
  description: 'GPS-verified job site time tracking for field service companies. HVAC, plumbing, electrical, landscaping.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
