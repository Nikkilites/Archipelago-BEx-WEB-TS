import { createContext, useContext} from "react"
import type { Notification } from "../bex/model/Notification"

type ToastContext = {
    copiedToast: string
    setToasts: (notifs: Notification[]) => void
    openToast: (notif: Notification, timeout?: number) => void
    onToastCopied: (notif: Notification) => void
}

export let ToastContext = createContext<null | ToastContext>(null)

export function useToast() {
  const toastContext = useContext(ToastContext)
  if (toastContext == null) throw new Error("Null context")

  return toastContext
}