import type { ReactNode } from "react"

type SubTitleProps = {
  children: ReactNode
}

export function SubTitle({ children }: SubTitleProps) {
    return (
        <div className="font-bold text-l mb-3 legacy:font-normal viking:text-viking-orange-300 opacity-80">{children}</div>
    )
}
