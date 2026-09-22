import type { ReactNode } from "react"

type TitleProps = {
  children: ReactNode
}

export function Title({ children }: TitleProps) {
  return ( 
    <h2 className="legacy:pl-6 viking:pl-2 viking:md:pl-0 legacy:md:pl-0 text-2xl nordic:text-4xl nordic:font-norse nordic:font-bold viking:text-3xl viking:font-extrabold viking:text-viking-orange-200">{children}</h2>
  )
}