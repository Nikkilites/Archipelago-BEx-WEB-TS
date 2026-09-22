import { useState, type ReactNode } from "react";
import { Notification } from "../bex/model/Notification";
import { ToastContext } from "./ToastContext";
import { Toast } from "../components/Toast";

type ToastProviderProps = {
    children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Notification[]>([])
    const [copiedToast, setCopiedToast] = useState<string>("");

    const openToast = (notif: Notification, timeout: number | undefined = 6000) => {
        setToasts(curr => [...curr, notif])
        setTimeout(() => closeToast(notif.id), timeout)
    }

    const closeToast = (id: string) => {
        setToasts(curr => curr.filter(toast => toast.id != id))
    }
    
    function onToastCopied(notif: Notification) {
        navigator.clipboard.writeText(notif.name)
        setCopiedToast(notif.id)
    }
    
    return (
        <ToastContext value={{ 
                copiedToast: copiedToast,
                setToasts:setToasts,
                openToast:openToast,
                onToastCopied: onToastCopied,
            }}>
            {children}
            <div className="fixed legacy:top-30 viking:top-43 md:legacy:top-23 md:viking:top-28 right-3 flex flex-col gap-1">
                {toasts.map(notif => (
                    <Toast key={notif.id} notif={notif}></Toast>
                ))}
            </div>
        </ToastContext>
    )
}