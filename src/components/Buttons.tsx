import type { ReactNode } from "react"
import { connect } from "../archipelago/ArchipelagoService";

type ButtonProps = {
  children: ReactNode
  text: string
}

export function Button({ children }: ButtonProps) {
  return (
    <button className="bg-legacy-blue-300 border-legacy-blue-400 border hover:bg-legacy-blue-250 hover:border-legacy-blue-300 hover:cursor-pointer disabled:bg-zinc-300 disabled:cursor-not-allowed rounded-lg px-3 py-1 ">{children}</button>
  )
}

export function LoginButton() {
  return (

    <button 
    className="bg-legacy-blue-300 hover:bg-blue-700 text-white font-bold border-4 border-black py-2 px-4 rounded-lg text-2xl"
    type="button"
    onClick={() => connect()}
    >
    Login & Connect
    </button>
  )
}

