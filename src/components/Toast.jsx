import { useEffect, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
  }

  return { toast, showToast, setToast }
}

export function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onDismiss, 2200)
    return () => clearTimeout(timer)
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div className="toast">
      {message}
    </div>
  )
}
