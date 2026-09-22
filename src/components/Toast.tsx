import { twMerge } from "tailwind-merge"
import type { Notification } from "../bex/model/Notification"
import { useToast } from "../context/ToastContext"

type ToastProps = {
    notif: Notification
}

export function Toast({ notif }: ToastProps) {
    const { copiedToast, onToastCopied } = useToast()

    return ( 
        <div id="toast-success" className="inline-flex items-center max-w-xs min-w-xs md:max-w-sm md:min-w-sm p-2 pl-3 gap-2 border legacy:bg-legacy-blue-100 legacy:rounded-lg legacy:border-legacy-blue-200 legacy:text-zinc-800 viking:text-viking-red-400 viking:bg-viking-beige-200 viking:border-viking-beige-400" role="alert"> 
            <div className={twMerge(
                    "inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-2xl border legacy:border-zinc-800 viking:border-viking-red-400 ",
                    getDotColorStyles(notif.dotColor)
                )}>
                {notif.dotSymbol == "check" && 
                    <div>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/></svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                }
                {notif.dotSymbol != "check" && 
                    <label className="w-5 h-5 items-center text-center justify-center mb-1">{notif.dotSymbol}</label>
                }
            </div>
            <div className="text-sm font-normal">{notif.name}</div>
            {notif.useCopyButton && 
                <button type="button" onClick={() => onToastCopied(notif)} className="ms-auto flex items-center justify-center bg-transparent font-medium leading-5 rounded text-sm h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                    {copiedToast != notif.id &&
                    <span id="default-icon">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/></svg>
                    </span>
                    }
                    {copiedToast == notif.id &&
                    <span id="success-icon">
                        <svg className="w-4 h-4 text-fg-brand opacity-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/></svg>
                    </span>
                    }
                </button>
            }
        </div>
    )
}

function getDotColorStyles(dotColor: string) {
  switch (dotColor) {
    case "progression":
      return "bg-archi-prog "
    case "useful":
      return "bg-archi-useful "
    case "filler":
      return "bg-archi-trash "
    case "trap":
      return "bg-archi-trap "
    case "warning":
      return "viking:bg-viking-red-200 viking:text-viking-beige-200 legacy:text-legacy-red-400 legacy:bg-legacy-red-200 "
    default:
      return "viking:bg-viking-beige-300 legacy:bg-legacy-blue-200 "
  }
}