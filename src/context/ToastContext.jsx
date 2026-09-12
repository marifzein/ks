import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

const ToastContext = createContext(null)

export const useToast = () => useContext(ToastContext)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
    clearTimeout(timers.current[id])
    delete timers.current[id]
  }, [])

  const push = useCallback(
    (message, type = 'success', opts = {}) => {
      const id = ++toastId
      setToasts((t) => [...t, { id, message, type }])
      timers.current[id] = setTimeout(() => dismiss(id), opts.duration || 4200)
    },
    [dismiss]
  )

  const api = {
    success: (m, o) => push(m, 'success', o),
    error: (m, o) => push(m, 'error', o),
    info: (m, o) => push(m, 'info', o),
    dismiss,
  }

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    error: <AlertTriangle className="h-5 w-5 text-primary" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[2000] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fadeUp items-start gap-3 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-lift"
          >
            <div className="mt-0.5 shrink-0">{icons[t.type]}</div>
            <p className="flex-1 text-sm font-medium leading-snug text-ink">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-ink/30 transition hover:text-ink" aria-label="Tutup">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}