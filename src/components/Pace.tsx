'use client'

// React Imports
import { useEffect } from 'react'

// Next Imports
import { usePathname, useSearchParams } from 'next/navigation'

const Pace = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Dynamically import pace-js only on client side
    const loadPace = async () => {
      const Pace = (await import('pace-js')).default

      // Configure Pace
      Pace.options = {
        ajax: {
          trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
        },
        document: true,
        eventLag: false,
        restartOnPushState: true,
        restartOnRequestAfter: false
      }

      // Start pace
      Pace.start()
    }

    loadPace()
  }, [pathname, searchParams])

  return null
}

export default Pace
