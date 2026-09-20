import { createContext, useContext} from "react"

import type { Region } from "../bex/model/Region"
import type { PlayerOptions } from "../bex/model/PlayerOptions"
import type { Location } from "../bex/model/Location"

import type { ArchipelagoService } from "../archipelago/ArchipelagoService"
import type { Hint } from "archipelago.js"
import type { PlayerLogin } from "../archipelago/PlayerLogin"


type Context = {
  //Stuff about the session that loaded from logging in
  apService: ArchipelagoService

  checkedLocIds: number[]

  runesAquired: string[]
  trashAquired: number

  textClient: string[]

  isActive: boolean
  playerName: string
  playerOptions: PlayerOptions
  regions: Region[]

  activePage: string

  hints: Hint[]

  connectAndProcess: (login: PlayerLogin) => Promise<boolean>
  disconnect: () => void
  sendMessage: (msg: string) => void
  sendLocation: (loc: Location) => void
  sendGoal: () => void
  setActivePage: (page: string) => void
}

export let SessionContext = createContext<null | Context>(null)

export function useSession() {
  const sessionContext = useContext(SessionContext)
  if (sessionContext == null) throw new Error("Null context")

  return sessionContext
}