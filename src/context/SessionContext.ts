import { createContext, useContext} from "react"
import type { Region } from "../bex/model/Region"
import type { PlayerOptions } from "../bex/model/PlayerOptions"

type Context = {
    //Stuff about the session that loaded from logging in
    isActive: boolean
    playerName: string
    options: PlayerOptions
    regions: Region[]

}

export let SessionContext = createContext<null | Context>(null)

export function useSession() {
  const sessionContext = useContext(SessionContext)
  if (sessionContext == null) throw new Error("Null context")

  return sessionContext
}